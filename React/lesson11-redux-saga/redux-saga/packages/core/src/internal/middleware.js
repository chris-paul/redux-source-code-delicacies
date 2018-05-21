import { is, check, object, createSetContextWarning } from './utils'
import { stdChannel } from './channel'
import { identity } from './utils'
import { runSaga } from './runSaga'
/**const sagaMiddleware = createSagaMiddleware(),
* 创建saga中间件,返回sagaMiddleware,这里是所有程序的入口
 * @DateTime 2018-05-20
 * @version  [version]
 * @param    {Object}    options.context [description]
 * @param    {...[type]} options         }            [description]
 * @return   {[type]}                    [description]
 */
export default function sagaMiddlewareFactory({ context = {}, ...options } = {}) {
  //这些东西暂时根本就不知道是干嘛的,虽然example里面有,然后在研究
  const { sagaMonitor, logger, onError, effectMiddlewares } = options

  if (process.env.NODE_ENV === 'development') {
    //如果logger不是undefined,那么它必须是一个函数
    if (is.notUndef(logger)) {
      check(logger, is.func, 'options.logger passed to the Saga middleware is not a function!')
    }
    //如果logger不是undefined,那么它必须是一个函数
    if (is.notUndef(onError)) {
      check(onError, is.func, 'options.onError passed to the Saga middleware is not a function!')
    }
     //如果emitter不是undefined,那么它必须是一个函数
    if (is.notUndef(options.emitter)) {
      check(options.emitter, is.func, 'options.emitter passed to the Saga middleware is not a function!')
    }
  }
  /*
  * react中间件的基本格式
  *  function middleware({dispatch, getState}) {
  *  return function (next) {
  *      return function (action) {
  *          return next(action);
  *      }
    }
}
   */
  function sagaMiddleware({ getState, dispatch }) {
    //channel支持外部通道,比较复杂,https://blog.csdn.net/L472547033/article/details/79079664,日后详细解释
    const channel = stdChannel()
    channel.put = (options.emitter || identity)(channel.put)
    /*applyMiddleware(sagaMiddleware)执行之后,这个run接口就会被暴露出来*/
    sagaMiddleware.run = runSaga.bind(null, {
      context,
      channel,
      dispatch,
      getState,
      sagaMonitor,
      logger,
      onError,
      effectMiddlewares,
    })
    /*遵循redux中间件的规则,返回的函数实际上是队dispatch的重写,请看lesson2applyMiddleware
    和compose源码*/
    return next => action => {
      if (sagaMonitor && sagaMonitor.actionDispatched) {
        sagaMonitor.actionDispatched(action)
      }
      const result = next(action) // hit reducers
      channel.put(action)
      return result
    }
  }
  //sagaMiddleware.run(rootSaga),确保运行run函数的时候,store已经被创建
  sagaMiddleware.run = () => {
    throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware')
  }

  sagaMiddleware.setContext = props => {
    if (process.env.NODE_ENV === 'development') {
      check(props, is.object, createSetContextWarning('sagaMiddleware', props))
    }

    object.assign(context, props)
  }

  return sagaMiddleware
}
