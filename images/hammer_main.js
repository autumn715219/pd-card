

function hammer(val){
  let Area_hammerAD = val; //物件
  let Hammerfu = {};

//  Hammerfu.finto = function Hammerfu(){
  var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
          window.setTimeout(callback, 1000 / 60);
      };
  })();
  var el = document.querySelector( Area_hammerAD );
  var es = el.style;
  var START_X = 0; //初始x軸
  var START_Y = 0; //初始y軸
  var px = START_X; //移動x軸
  var py = START_Y; //移動y軸
  var ticking = false;
  var transform;
  var elw = el.offsetWidth; //物件寬
  var elh = el.offsetHeight; //物件高
  var ww = window.innerWidth; //視窗寬
  var wh = window.innerHeight; //視窗高
  var mc = new Hammer( el );
  mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 })); //水平平移
  mc.add(new Hammer.Swipe()).recognizeWith(mc.get('pan')); //快速滑動
  mc.on("panstart panmove", onPan);
  mc.on("hammer.input", function(ev) {
    elw = el.offsetWidth; //物件寬
    elh = el.offsetHeight; //物件高
    
    if(ev.isFinal) {
      //更新Y軸
      py = py + ev.deltaY;
      START_Y = py;
      //更新X軸
      px = px + ev.deltaX;
      START_X = px;
      if( START_Y > elh * 1){ 
        py = START_Y = -elh * 0; 
      } else if( START_Y < -(wh-elh*0.5) ){ 
        py = START_Y = -( elh*0.5 ); 
      }
      if( START_X > elw * 0.8){ 
        px = START_X = 0;
      } else if( START_X < -(ww-elw*0.2) ){ 
        px = START_X = -( ww-elw*1 ); 
      }
      el.classList.add('js-hammer-stop');
      resetElement();
    }
  });
  function resetElement() {
    transform = {
        translate: { 
          x: START_X, 
          y: START_Y
        },
        speed: 300,
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
    };
    requestElementUpdate();
  };
  function updateElementTransform() {
    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d('+  transform.translate.x +'px,'+  transform.translate.y +'px,0px)';
    es.webkitTransitionDuration = es.MsTransition = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = ' '+ transform.speed + 'ms';
    ticking = false;
  };
  function requestElementUpdate() {
    if(!ticking) {
         reqAnimationFrame(updateElementTransform);
         ticking = true;
    };
  };
  function onPan(ev) {
    transform = {
      translate:{
        x: START_X + ev.deltaX,
        y: START_Y + ev.deltaY
      },
      speed: 0,
    };
    el.classList.remove('js-hammer-stop');
    requestElementUpdate();
  };
  resetElement();

}


  
  
  
  