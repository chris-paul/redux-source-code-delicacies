import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
export const ActionTypes = {
  INIT: '@@redux/INIT'
}

/**
 *redux强调唯一数据源,状态之都,单项数据流
 * 
 * createStore 主要是注册默认的state,并返回store对象,store是整个redux的数据处理中心
 * 
 * @param {Function} reducer是一个函数，该函数会返回一个全新的state，而state则保存了所有的数据.
 *
 * @param {any} [preloadedState] 初始state
 *
 * @param {Function} [enhancer] enhancer是一个store的增强器,拿到一个增强版的createStore,例如
 * let createStoreWithMiddleware = createStore(reducer,preState,applyMiddleware(thunk))
 * 当然也可以let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
 * 
 * @returns {Store} 返回store对象
 */
export default function createStore(reducer, preloadedState, enhancer) {
  //如果preloadedState没有传，但是enhancer参数传了，重置一下变量
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
  //如果enhancer传了，但是不是函数，则报错提示，否则执行enhancer函数，
  //并继续执行enhancer函数返回的加强版的createStore函数，
  //参数reducer以及preloadeState和原createStore函数保持一致
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }
  //reducer必须是纯函数
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer      //当前的reducer
  let currentState = preloadedState //当前的state
  let currentListeners = []         //当前注册的函数
  let nextListeners = currentListeners
  let isDispatching = false         //是否正在dispatch一个action
  /*
  *  确保nextListeners和currentListeners不是同一个引用,如果是同一个引用牵一发而动全身
   */
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      //对象的浅复制
      nextListeners = currentListeners.slice()
    }
  }

  /*
  * 返回当前的state
   */
  function getState() {
    return currentState
  }

  /*
  * 消息的订阅,他的返回值是一个函数可以取消刚刚订阅的消息的函数
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }
    //只能取消一次,防止多次取消
    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  /*
  * 通过dispatch改变state,并且发布消息
   */
  function dispatch(action) {
    //action必须是纯对象
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }
    //action.type不能为空
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }
    //如果当前正在触发另外一个action，直接报错
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      //执行当前的reducer函数
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    //把上次得到的新的监听函数列表赋值成为当前的监听函数列表
    const listeners = currentListeners = nextListeners
    //发布消息,所有的订阅函数都会执行,不要以为指定所有的函数会触发所有的组件的渲染
    //并不会,因为只有当前组件没有被销毁,其他的都被销毁了
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }

    return action
  }

  /*
  * 替换reducer函数：这个函数允许运行时动态替换最开始调用createStore函数时传入的reducer，
  * 并且替换掉reducer之后，重新dispatch一个action，得到全新的currentState对象
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    //把新的reducer赋值给当前的currentReducer变量，得到一个全新的currentReducer
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }

  /*
  * 对于这个函数，是不直接暴露给开发者的，它提供了给其他观察者模式／响应式库的交互操作
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.')
        }
        /**
       * 一个极简的observable订阅方法。
       * @param {Object} observer 任何可以作为observer使用的对象
       * observer对象应该包含一个`next`方法。
       * @returns {subscription} 返回一个带有`unsbscribe`方法的对象。该
       * 方法将用于停止接收来自store的状态变更信息。
       */
        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },
       // 根据observable提案，[Symbol.observable]()返回observable对象自身
      [$$observable]() {
        return this
      }
    }
  }

  /*
  * 初始化数据
   */
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
