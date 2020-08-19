// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const para = document.querySelector("p");
const BALLNUM = 25

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

function randomColor() {
  // 返回一个随机的rgb颜色
  return 'rgb('+
      random(0,255) +  ', '+
      random(0,255) +  ',' +
      random(0,255) + ')';
};

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
};

function Ball(x, y, velX, velY, exists, color, size){
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}
//
Ball.prototype = Object.create(Shape.prototype) // 为了让Ball能够继承Shape里面的方法
Ball.prototype.constructor = Ball;    // 让Ball的构造函数指向Ball自身

// 给小球原型添加draw方法绘制小球
Ball.prototype.draw = function () {
  ctx.beginPath(); // 声明我们需要开始在纸上绘制一个图形了
  ctx.fillStyle = this.color; // 定义这个图形的颜色
  // arc绘制一段圆弧，x和y是圆弧的中心坐标，size圆弧的半径
  // 最后分别是开始和结束，按照弧度来表示
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  // fill方法声明我们结束了以beginPath开始的绘画，并且使用之前设置的颜色进行填充
  ctx.fill();
};

Ball.prototype.update = function() {
  if((this.x + this.size)>=width){
    this.velX = -(this.velX);
  }
  if((this.x-this.size)<=0){
    this.velX = -(this.velX);
  }
  if((this.y+this.size)>=height){
    this.velY = -(this.velY);
  }
  if((this.y-this.size)<=0){
    this.velY = -(this.velY);
  }
  // 使用速度更新位置
  this.x += this.velX;
  this.y += this.velY;
};

Ball.prototype.collisionDetect = function(){
  for(let j=0;j<balls.length;j++){
    if(this !== balls[j]){
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.size + balls[j].size){
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

function EvilCircle(x, y, exists){
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.collisionDetect = function(){
  for(let i=0;i<balls.length;i++){
    if(balls[i].exists){
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if(distance<this.size + balls[i].size){
        balls[i].exists = false;
        ballleft--;
        para.textContent = "剩余球数：" + ballleft;
      }
    }
  }
}

EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth=3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0,2*Math.PI );
  ctx.stroke();
};

EvilCircle.prototype.checkBounds = function(){
  // evilcircle是固定的，在超过边界的时候只需要稍微移动一下就行了
  if((this.x + this.size)>=width){
    this.x -= this.size;
  }
  if((this.x-this.size)<=0){
    this.x += this.size
  }
  if((this.y+this.size)>=height){
    this.y -= this.size;
  }
  if((this.y-this.size)<=0){
    this.y += this.size;
  }
};

EvilCircle.prototype.setControls = function(){
  //这个方法将会一个 onkeydown 的事件监听器给 window 对象
  // 这样当特定的键盘按键按下的时候，我们就可以移动恶魔圈。
  window.onkeydown = e=>{
    switch (e.key) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  };
};

let balls = [];
var ballleft=BALLNUM;

while(balls.length < BALLNUM){
  const size = random(10, 20);
  let ball = new Ball(
      random(0+size, width -size),
      random(0+size, height - size),
      random(-7, 7),
      random(-7, 7),
      true,
      randomColor(),
      size
  );
  balls.push(ball)
};

para.textContent = "剩余球数：" + BALLNUM


let evilCircle = new EvilCircle(
    random(10, width-10),
    random(10,height-10),
    true
    )

// 设置按键事件监听
evilCircle.setControls();

function loop(){

  // 定义要进行填充的颜色
  ctx.fillStyle = 'rgba(0, 0, 0, .3)';
  // 定义要填充的是一个矩形区域
  ctx.fillRect(0,0, width, height);

  for(let i=0;i<balls.length;i++){
    if(balls[i].exists) {
      // 先绘制球
      // 只有存在才会对球进行绘制，否则不会在画布上绘制，那么下一个画布上也就不会显示该球了

      balls[i].draw();
      // 然后将球在位置上进行更新
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  requestAnimationFrame(loop);
};

loop();