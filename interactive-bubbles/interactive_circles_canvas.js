var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

//create a Mouse variable
var mouse = {
  x: undefined,
  y: undefined
  //define x & y when get mouse movement (in event listener)
}

//event listener for whenever mouse moves
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

//event listener for when browser window resized
window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

//constant vars used in animating circles
var colorArr = ['#002F53', '#2D999F', '#EEE9E0', '#D8D8C2', '#F25D50'];
//create Circle object
function Circle(xCord, yCord, radius, dx, dy){
  this.x = xCord;
  this.y = yCord;
  this.r = radius;
  this.minR = Math.random() * 10 + 2;
  this.maxR = this.minR * 5;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArr[Math.floor(Math.random() * colorArr.length)];

  //make the draw function
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
  }

  //update pos/size of circle before draw again
  this.update = function(){
    //if at edge, have it bounce off
    if(this.x > innerWidth - this.r || this.x < this.r){
      this.dx *= -1;
    }
    if(this.y > innerHeight - this.r || this.y < this.r){
      this.dy *= -1;
    }
    //move circle
    this.x += this.dx;
    this.y += this.dy;
    //enlarge circle if near mouse
    if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50
     && this.r < this.maxR){
      this.r += 1;
    } else if(this.r > this.minR){
      this.r -= 1;
    }
    this.draw();
  }
}

//create array of circles
var circleArr = [];
//fill with # random cirlces (# = 1 circle/1,000 pixels)
const numCircles = Math.floor(innerWidth * innerHeight * 0.001);
for(var i = 0; i < numCircles; i++){
  var rad = Math.random() * 30;
  var x = Math.random() * (innerWidth - 2*rad) + rad;
  var y = Math.random() * (innerHeight - 2*rad) + rad;
  var dx = Math.random() - 0.5;
  var dy = Math.random() - 0.5;
  circleArr.push(new Circle(x, y, rad, dx, dy));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}

animate();
