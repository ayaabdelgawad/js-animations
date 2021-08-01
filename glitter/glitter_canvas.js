//***Set up the canvas***
//get the html canvas
var canvas = document.getElementById("myCanvas");
//initialize canvas to take up entire space of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//get the context so can draw on canvas
var c = canvas.getContext("2d");
//******


//***Add in event listeners***
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

//event listener to initialize animation again whenever window resized
window.addEventListener('resize', () =>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})
//******


//***Variables and functions for Object
//create color array
var colorArr = ["rgba(176, 147, 237, ", "rgba(235, 189, 237, ", "rgba(201, 231, 255, ", "rgba(135, 227, 190, "];
//run away speed
var runAway = 1;
//create Glitter object
function Glitter(xCord, yCord, dx, dy, radius, color){
  this.x = xCord;
  this.y = yCord;
  this.dx = dx;
  this.orig_dx = dx;
  this.dy = dy;
  this.orig_dy = dy;
  this.r = radius;
  this.color = color;

  //draw the object
  this.draw = function(){
    c.beginPath();
    var gradient = c.createRadialGradient(this.x, this.y, this.r * .1, this.x , this.y, this.r);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    //gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.4, this.color + " 0.5)");
    gradient.addColorStop(1, this.color + " 0)");
    c.fillStyle = gradient;
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    c.fill();
    c.closePath();
  }

  //update particle info before drawing it
  this.update = function(){

    //bounce off of walls
    if(this.x + this.r >= canvas.width || this.x <= this.r){
      this.dx *= -1;
    }
    if(this.y + this.r >= canvas.height || this.y <= this.r){
      this.dy *= -1;
    }

    //move away from mouse
    if(Math.abs(mouse.x - this.x) < 75 && Math.abs(mouse.y - this.y) < 75){
      if(mouse.x - this.x < 75 && mouse.x < this.x){
        this.x += runAway;
      } else {
        this.x -= runAway;
      }
      if(this.y - mouse.y < 75 && this.y < mouse.y){
        this.y -= runAway;
      } else {
        this.y += runAway;
      }
    } else {
      this.x += this.dx;
      this.y += this.dy;
    }
    // //how x position changes
    // if(this.x - mouse.x < 50){
    //   this.dx = -runAway;
    // }else if(mouse.x - this.x < 50){
    //   this.dx = runAway;
    // }else {
    //   this.dx = (this.dx * this.orig_dx < 0 ? -this.orig_dx : this.orig_dx);
    // }
    // //how y position changes
    // if(this.y - mouse.y < 50){
    //   this.y -= runAway;
    // }else if(mouse.y - this.y < 50){
    //   this.y += runAway;
    // }else{
    //   this.dy += this.dy;
    // }


    this.draw();
  }
}
//******

//***Initialization and animation functions***
//create array of objects
var glitterArr;

//initialization function
function init() {
  glitterArr = [];
  for (var i = 0; i < 500; i++) {
    glitterArr.push(new Glitter(randomIntInRange(16, canvas.width - 16),
    randomIntInRange(16, canvas.height - 16), Math.random() - 0.5,
    Math.random() - 0.5, randomIntInRange(5, 16), pickRandomColor()));
  }
}

function animate() {
  requestAnimationFrame(animate);
  //uncomment two lines below for semi-transparent background effect
  //(and) comment out the c.clearRect() command)
  // c.fillStyle = 'rgba(255, 255, 255, 0.05)';
  // c.fillRect(0, 0, innerWidth, innerHeight);
  c.clearRect(0, 0, canvas.width, canvas.height);

  //draw all the objects made in initialization
  for (var i = 0; i < glitterArr.length; i++) {
    glitterArr[i].update();
  }
}
//******


//***Randomization functions***
//pick a random color from the color array
pickRandomColor = function(){
  return colorArr[Math.floor(Math.random() * colorArr.length)];
}

//select random integer from a specified range (min inclusive, max exclusive)
randomIntInRange = function(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//******


init();
animate();
