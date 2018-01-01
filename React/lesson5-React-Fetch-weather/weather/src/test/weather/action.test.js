import thunk from 'redux-thunk';
import {stub} from 'sinon';
import configureStore from 'redux-mock-store';

import * as actions from '../../src/weather/actions.js';
import * as actionTypes from '../../src/weather/actionTypes.js';

const middlewares = [thunk];
//模拟的createStore
const createMockStore = configureStore(middlewares);


describe('weather/actions', () => {
  describe('fetchWeather', () => {
    let stubbedFetch;
    const store = createMockStore();
    /**
     * 篡改fetch函数的行为
     * @param  {[type]} ( [一个对象指出函数的位置]
     * @return {[type]}   [返回一个被篡改的函数]
     */
    beforeEach(() => {
      stubbedFetch = stub(global, 'fetch');
    });

    afterEach(() => {
      stubbedFetch.restore();
    });

    it('should dispatch fetchWeatherSuccess action type on fetch success', () => {
      //产生一个创建就已经完结的promise对象,告诉测试用例这是一个异步的过程,只有在这个promised
      //对象完结的时候,这个测试用例才算完成
      const mockResponse= Promise.resolve({
        status: 200,
        json: () => Promise.resolve({
          weatherinfo: {}
        })
      });
      stubbedFetch.returns(mockResponse);

      return store.dispatch(actions.fetchWeather(1)).then(() => {
        //读取派发到reducer的所有的actions
        const dispatchedActions = store.getActions();
        expect(dispatchedActions.length).toBe(2);
        expect(dispatchedActions[0].type).toBe(actionTypes.FETCH_STARTED);
        expect(dispatchedActions[1].type).toBe(actionTypes.FETCH_SUCCESS);
      });
    });

  });
});