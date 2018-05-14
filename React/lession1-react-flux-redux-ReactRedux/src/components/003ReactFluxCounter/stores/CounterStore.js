import AppDispatcher from '../AppDispatcher.js';
import * as ActionTypes from '../ActionTypes.js';
import {EventEmitter} from 'events';
/**
 * store是数据中心,这个组件的所有的数据都在这里,包括逐句的初始化,数据的处理等
 * store变化的时候需要发出通知 通知其它的组件去改变,当然因为是单向数据流,所以触发一个action就
 * OK
 * @type {String}
 */
const CHANGE_EVENT = 'changed';
/*
  初始化的默认值
 */
const counterValues = {
  'First': 0,
  'Second': 10,
  'Third': 30
};

/**
 * 定义store的一些方法，用来引起View的改变(以事件的形式)
 * @param  {[type]} )                     []
 * @param  {[type]} emitChange:           [可以广播一个特定的事件]
 * @param  {[type]} addChangeListener:    [添加事件]
 * @param  {[type]} removeChangeListener: [删除事件]
 * @return {[type]}                       [description]
 */
const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: function() {
    return counterValues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});
/**
 * 将store注册到Dispatch,只有注册到分发器action才能改变store的数据
 * @param  {[type]} (action [description]
 * @return {[type]}         [description]
 */
CounterStore.dispatchToken = AppDispatcher.register((action) => {
  if (action.type === ActionTypes.INCREMENT) {
    counterValues[action.counterCaption] ++;
    CounterStore.emitChange();
  } else if (action.type === ActionTypes.DECREMENT) {
    counterValues[action.counterCaption] --;
    CounterStore.emitChange();
  }
});

export default CounterStore;