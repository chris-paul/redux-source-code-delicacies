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
  //generator自带iterator属性
  const iterator = saga(...args)

  if (process.env.NODE_ENV === 'development') {
    check(iterator, is.iterator, NON_GENERATOR_ERR)
  }

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

  const effectId = nextSagaId()

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop

    sagaMonitor.effectTriggered({ effectId, root: true, parentEffectId: 0, effect: { root: true, saga, args } })
  }

  if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && is.notUndef(effectMiddlewares)) {
    const MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions'
    check(effectMiddlewares, is.array, MIDDLEWARE_TYPE_ERROR)
    effectMiddlewares.forEach(effectMiddleware => check(effectMiddleware, is.func, MIDDLEWARE_TYPE_ERROR))
  }

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

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task)
  }

  return task
}
