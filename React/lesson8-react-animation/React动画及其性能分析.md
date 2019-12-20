### 动画的实现

#### 使用CSS3实现动画

+ CSS3动画渲染性能比较好,但是比较死板(必须鼠标移动到某一个div上用0.2s向左移动100px,但是0.1s的时候鼠标移开
div又会以同样的速度和时间回到原位置，其实div不动才符合用户取消的预期)，同时也不利于调试。React提供
的ReactCSSTransformGroup的功能就是使用CSS3实现动画的。

```javascript
.smaple{
    position: absolute;
    left: 0px;M
    width: 100px;
    height: 100px;
    transform-property: left;
    transform-duration: 0.2s;
    transform-timing-function: ease
}
.sample:hover{
    left: 420px;
}
```


+ js动画性能比较差,但是灵活,(动画1s渲染60帧用户的体验最好,所以每16ms一帧,动画每隔16ms渲染一次最好)，react-Motion就是
典型的JS的动画库

```javascript
var animationEle = document.getElementById("sample");
var letf = 0 ;
var timer;
var ANIMATION_INTERVAL = 16;
timer = setInterval(function(){
    left += 10;
    animationEle.style.left = left + "px";
    if( left >= 400){
        clearInterval(timer);
    }
},ANIMATION_INTERVAL);

//如果每隔16ms渲染一次，但是渲染一次就需要32ms，最后1s的动画却用了2s完成，所以setInterval
//和setTimeout并不能保证在指定的时间间隔执行动画。所以创建一个raf使得动画在1S内执行完成

//动画的上次被执行时间
var lastTimeStamp = new Date().getTime();
function raf(fn) {
  var currTimeStamp = new Date().getTime();
  //如果当前执行时间距离上次执行之间超过16ms，立即执行动画，否则每间隔16ms执行
  var delay  = Math.max(0, 16 - (currTimeStamp - lastTimeStamp));
  var handle = setTimeout(function(){
    fn(currTimeStamp);
  }, delay);
  lastTimeStamp = currTimeStamp;
  return handle;
}

var left = 0;
var animatedElement = document.getElementById("sample");
//动画的开始时间
var startTimestamp = new Date().getTime();
function render(timestamp) {
  //每16ms移动一个像素
  left += (timestamp - startTimestamp) / 16;
  animatedElement.style.left = left + 'px';
  if (left < 400) {
    raf(render);
  }
}
raf(render);
```
+ 针对上述问题，浏览器提供的raf的实现requestAnimationFrame

    + 它会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

    + 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

    ```javascript
    var animationEle = document.getElementById("sample");
    var letf = 0 ;
    function animation(){
        requestAnimationFrame(function(){
            animationEle.style.left = ++left;
            if(left<50) animation();
        })  
    }
    animation();
    ```
