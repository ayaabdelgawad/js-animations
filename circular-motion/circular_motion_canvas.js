var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");


//create a Mouse variable
var mouse = {
  x: canvas.width/2,
  y: canvas.height/2
  //define x & y when get mouse movement (in event listener)
}

//event listener for whenever mouse moves
window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
})

var decrease = false;
//event listener for when mouse pressed
window.addEventListener('mousedown', () => {decrease = true;})
//event listener for when mouse released
window.addEventListener('mouseup', () => {decrease = false;})

var colorArr = ['#090126', '#0F0240', '#200973', '#0540F2', '#05F2C7'];
//create Particle object
function Particle(xCord, yCord, radius){
  this.x = xCord;
  this.y = yCord;
  this.r = radius;
  this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
  this.radians = Math.random() * Math.PI * 2;
  this.velocity = 0.03;
  this.origDistFromCenter = Math.floor(Math.random() * 60) + 80;
  this.distFromCenter = this.origDistFromCenter;
  this.lastMousePos = {
    x: xCord,
    y: yCord
  }

  //draw the point
  this.draw = function(lastPos){
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.r;
    c.moveTo(lastPos.x, lastPos.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  //update particle info before draw again
  this.update = function(){
    //store particles prev position before updating it to move it
    const lastPos = {
      x: this.x,
      y: this.y
    }
    //increase radians
    this.radians += this.velocity;
    //drag effect
    this.lastMousePos.x += (mouse.x - this.lastMousePos.x) * 0.1;
    this.lastMousePos.y += (mouse.y - this.lastMousePos.y) * 0.1;
    //decrease distFromCenter if mouse is pressed (and enlarge when not)
    if(decrease && this.distFromCenter > 15){
      this.distFromCenter--;
    }else if (!decrease && this.distFromCenter < this.origDistFromCenter) {
      this.distFromCenter++;
    }
    //update new particle position
    this.x = this.lastMousePos.x + Math.cos(this.radians) * this.distFromCenter;
    this.y = this.lastMousePos.y + Math.sin(this.radians) * this.distFromCenter;
    this.draw(lastPos);
  }
}

//create array of particles
let particleArr;
//initialization function
function init() {
  particleArr = [];
  for (var i = 0; i < 100; i++) {
    particleArr.push(new Particle(canvas.width/2, canvas.height/2,
      Math.random() * 4 + 1));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255, 255, 255, 0.05)';
  c.fillRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
  }
}

init();
animate();
