'use strict';

var React = require('react/addons');
//var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.scss');

var imageDatas = require('../data/imageDatas.json');
//获取图片参数的数组,将数组的图片名转化为图片的URL
function genImageURL(imageDatasArr){
  for(var i = 0, j = imageDatasArr.length; i < j; i++){
    var singleImageData = imageDatasArr[i];
    //url-loader
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
}
imageDatas = genImageURL(imageDatas);
//取得这两个数之间的随机数
function getRangeRandom(low, high){
  return Math.ceil(Math.random() * (high - low) + low);
}
var ImgFigure = React.createClass({
  render: function(){
    var styleObj = {};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    return (
      <figure className = "img-figure" style = {styleObj}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className = "img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
});
var GalleryByReactApp = React.createClass({
  //存储排布的可取值范围
   Constant: {
    //中心图片的可变化范围
    centerPos: {
      left: 0,
      right: 0
    },
    //水平方向的取值范围（左右方）
    hPosRange: {
      leftSect: [0, 0], //左侧
      rightSect: [0, 0], //右侧
      y: [0, 0]
    },
    //垂直方向的取值范围(上方)
    vPosRange: {
      topX: [0, 0],
      topY: [0, 0]
    }
  },

  /*
  *重新布局图片
  *@param centerIndex 指定居中排布哪一个图片
  */
  rearrange: function(centerIndex){
      var imgArrangeArr = this.state.imgArrangeArr,
          Constant = this.Constant,
          centerPos = Constant.centerPos,
          hPosRange = Constant.hPosRange,
          vPosRange = Constant.vPosRange,
          hPosRangeLeftSect = hPosRange.leftSect,
          hPosRangeRightSect = hPosRange.rightSect,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeTopX = vPosRange.topX,

          //上边图片的状态

          topImgNum = Math.ceil(Math.random() * 2),//上不一个或0个
          topImgSpliceIndex = 0,
          imgArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1);
          //居中
          imgArrangeCenterArr[0].pos = centerPos;

          //取出上部要布局的图片(0或1)
          var imgArrangeTopArr = [];
          topImgSpliceIndex = Math.ceil(Math.random() * (imgArrangeArr.length - topImgNum));
          imgArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

          imgArrangeTopArr.forEach(function(value, index){
              imgArrangeTopArr[index].pos = {
                top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                left: getRangeRandom(vPosRangeTopX[0], vPosRangeTopX[1])
              };
          });

          //左部要布局的图片
          for(var i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++){
            //左区域或者又区域的X范围
            var hPosRangeLORX = null;
            //前半部分布局左边
            if(i < k){
                hPosRangeLORX = hPosRangeLeftSect;
            }else{
                hPosRangeLORX = hPosRangeRightSect;
            }
            imgArrangeArr[i].pos = {
              top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
              left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
            };
          }
          //将取得数据塞回去
          if(imgArrangeTopArr && imgArrangeTopArr[0]){
            imgArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
          }
          imgArrangeArr.splice(centerIndex, 0, imgArrangeCenterArr[0]);

          //改变状态
          this.setState({
            imgArrangeArr: imgArrangeArr
          });
  },

  getInitialState: function(){
    return {
      imgArrangeArr: [
        {
          pos: {
            left: '0',
            top: '0'
          }
        }
      ]
    };
  },
  //组件加载之后
  componentDidMount: function(){
    //scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。

    //clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。

    //offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。
    var stageDom = React.findDOMNode(this.refs.stage),
        stageW = stageDom.scrollWidth,
        stageH = stageDom.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
    //imgFigure的大小
    var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };

    this.Constant.hPosRange.leftSect[0] = 0 - halfImgW;
    this.Constant.hPosRange.leftSect[1] = halfStageW - halfImgW * 3;

    this.Constant.hPosRange.rightSect[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSect[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = 0 - halfImgW;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = 0 - halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    //this.Constant.vPosRange.topX[0] = halfImgW - imgW;
    //this.Constant.vPosRange.topX[1] = halfImgW;
    this.Constant.vPosRange.topX[0] = halfStageW - imgW;
    this.Constant.vPosRange.topX[1] = halfStageW;
    this.rearrange(0);
  },
  render: function() {
    //包含一系列的图片和控制组件
    var controllerUnits = [],
        ImgFigures = [];
    imageDatas.forEach(function(value, index){
      //初始化组件的状态
      if(!this.state.imgArrangeArr[index]){
        this.state.imgArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          }
        };
      }
      ImgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgArrangeArr[index]}/>);
    }.bind(this));
    return (
      <section className = "stage" ref="stage">
        <section className = "img-sec">
        {ImgFigures}
        </section>
        <nav className = "controller-nav">
        {controllerUnits}
        </nav>
      </section>
    );
  }
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line

module.exports = GalleryByReactApp;
