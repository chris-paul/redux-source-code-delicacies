import * as ActionTypes from './ActionTypes.js';
import AppDispatcher from './AppDispatcher.js';
/*
action是纯粹的数据,相当于一个自定义的事件
 */

/**
 * 函数+
 * @param  {[type]} counterCaption [description]
 * @return {[type]}                [description]
 */
export const increment = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  });
};
/**
 * 函数-
 * @param  {[type]} counterCaption [description]
 * @return {[type]}                [description]
 */
export const decrement = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  });
};