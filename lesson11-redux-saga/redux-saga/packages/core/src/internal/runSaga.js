import { compose } from 'redux'
import { is, check, uid as nextSagaId, wrapSagaDispatch, noop } from './utils'
import proc, { getMetaInfo } from './proc'
import { stdChannel } from './channel'

const RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)'
const NON_GENERATOR_ERR = `${RUN_SAGA_SIGNATURE}: saga argument must be a Generator function!`
/**
 * 开始运行saga中间件
 * @param    {[type]}    options [dispatch,getState...]
 * @param    {[type]}    saga    [rootSaga]
 * @param    {...[type]} args    [传递给rootsaga的参数,可以在.run的时候传入]
 * @return   {[type]}            [description]
 */
export function runSaga(options, saga, ...args) {
  //确保saga是generator函数
  if (process.env.NODE_ENV === 'development') {
    check(saga, is.func, NON_GENERATOR_ERR)
  }
  /*创建generator对象,但是这个通过run函数传入的参数不知道是要干嘛,
  通过...将args合并成数组
  */
  const iterator = saga(...args)

  if (process.env.NODE_ENV === 'development') {
    check(iterator, is.iterator, NON_GENERATOR_ERR)
  }
  //stdChannel()生成事件订阅通道,用于存放回调函数
  const {
    channel = stdChannel(),
    dispatch,
    getState,
    context,
    sagaMonitor,
    logger,
    effectMiddlewares,
    onError,
  } = options
  //sagaId 从1递增 
  const effectId = nextSagaId()

  if (sagaMonitor) {
    // monitors有一个固定的接口,我们只要去实现它就好了,
    //Effect 可以看作是 redux-saga 的任务单元
    //effectTriggered  effect触发也就是监听的时候调用
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop
    //effect成功的时候调用
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop
    //effect失败的时候调用
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop
    //effect取消的时候调用
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop
    //effect dispatch渲染view的时候调用
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop
    //最顶层的effect触发,就是去监控那些sagas,sagas是rootsaga
    sagaMonitor.effectTriggered({ effectId, root: true, parentEffectId: 0, effect: { root: true, saga, args } })
  }

  if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && is.notUndef(effectMiddlewares)) {
    const MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions'
    check(effectMiddlewares, is.array, MIDDLEWARE_TYPE_ERROR)
    effectMiddlewares.forEach(effectMiddleware => check(effectMiddleware, is.func, MIDDLEWARE_TYPE_ERROR))
  }
  //middleware,把这些中间件合并起来,effectMiddlewares不知道干什么用处的
  const middleware = effectMiddlewares && compose(...effectMiddlewares)
  //这是任务运行的核心所在
  const task = proc(
    iterator,
    channel,
    wrapSagaDispatch(dispatch),
    getState,
    context,
    { sagaMonitor, logger, onError, middleware },
    effectId,
    getMetaInfo(saga),
  )
  //root effect执行成功
  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task)
  }

  return task
}
