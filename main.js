if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function () {
    return  window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };
  })();
}

var ball;
var body;
var w;
var h;
var box;
var box_left;
var box_top;
var limit_w;
var limit_h;

function init() {
	body			= document.getElementById("body");
  ball 			= document.getElementById("ball");
	box 			= document.getElementById("box");
  w 				= window.innerWidth;
  h 				= window.innerHeight;
	box_left 	= box.offsetLeft;
	box_top 	= box.offsetTop;
	limit_w		= w - box_left;
	limit_h		= h - box_top;
	
	ball.style.left = (w / 2) - 100 + "px";
  ball.style.top 	= (h / 2) - 100 + "px";
  ball.velocity 	= {x: 0, y: 0};
  ball.position 	= {x: 0, y: 0};
	

  if (window.DeviceOrientationEvent) {

    window.addEventListener("deviceorientation", function (event) {
        ball.velocity.y = Math.round(event.beta);
        ball.velocity.x = Math.round(event.gamma);
      }
    )
  }

  update();
}

function update() {
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;
	
	if (ball.position.x < limit_w && ball.position.x > box_left && ball.position.y < limit_h && ball.position.y > box_top) {
		body.style.backgroundColor = 'red';
	} else {
		body.style.backgroundColor = '#EFDC05';
	}

  if (ball.position.x > (w - 100) && ball.velocity.x > 0) {
    ball.position.x = w - 100;
  }

  if (ball.position.x < 0 && ball.velocity.x < 0) {
    ball.position.x = 0;
  }

  if (ball.position.y > (h - 100) && ball.velocity.y > 0) {
    ball.position.y = h - 100;
  }

  if (ball.position.y < 0 && ball.velocity.y < 0) {
    ball.position.y = 0;
  }

  ball.style.top = ball.position.y + "px";
  ball.style.left = ball.position.x + "px";

  requestAnimationFrame(update);//KEEP ANIMATING
}