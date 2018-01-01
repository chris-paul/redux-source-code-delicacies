import * as actions from '../../src/weather/actions.js';
import * as actionTypes from '../../src/weather/actionTypes.js';
import * as Status from '../../src/weather/status.js';
import reducer from '../../src/weather/reducer.js';
/**
 * 模拟state和action,查看返回的status是不是loading状态
 * @param  {[type]} 'weather/reducer' [description]
 * @param  {[type]} ()                [description]
 * @return {[type]}                   [description]
 */
describe('weather/reducer', () => {
  it('should return loading status', () => {
    const action = actions.fetchWeatherStarted();

    const newState = reducer({}, action);

    expect(newState.status).toBe(Status.LOADING);
  });
});