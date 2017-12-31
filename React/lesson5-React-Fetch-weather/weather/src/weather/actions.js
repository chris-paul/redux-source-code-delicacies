import {FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE} from './actionTypes.js';

let nextSeqId = 0;

export const fetchWeatherStarted = () => ({
  type: FETCH_STARTED
});

export const fetchWeatherSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result
})

export const fetchWeatherFailure = (error) => ({
  type: FETCH_FAILURE,
  error
})

export const fetchWeather = (cityCode) => {
  return (dispatch) => {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;

    const seqId = ++ nextSeqId;
    /**
     * 防止发送重复请求导致数据的错乱
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    }

    dispatchIfValid(fetchWeatherStarted())

    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }
      console.log(response); 
      /**
       * 读取 Response对象并且将它设置为已读（因为Responses对象被设置为了 stream 的方式，
       * 所以它们只能被读取一次） ,并返回一个被解析为JSON格式的promise对象,并根据fulfilled
       * 和rejected去执行响应的回掉函数,then函数并不是发起一次请求
       * @param  {[type]} ).then((responseJson) [description]
       * @return {[type]}                       [description]
       */
      response.json().then((responseJson) => {
        dispatchIfValid(fetchWeatherSuccess(responseJson.weatherinfo));
      }).catch((error) => {
        dispatchIfValid(fetchWeatherFailure(error));
      });
    }).catch((error) => {
      dispatchIfValid(fetchWeatherFailure(error));
    })
  };
}