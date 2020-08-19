// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

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

function Ball(x, y, velX, velY, color, size){
  // 小球类的构造函数
  this.x = x; // 起始位置的x坐标
  this.y = y; // 起始位置的y坐标
  this.velX = velX; // 水平方向的速度
  this.velY = velY; // 竖直方向的速度
  this.color = color;// 小球的颜色
  this.size = size; // 小球的半径，单位是像素
};

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

let balls = [];

while(balls.length < 50){
  const size = random(10, 20);
  let ball = new Ball(
      random(0+size, width -size),
      random(0+size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      size
  );
  balls.push(ball)
};

function loop(){
  // 定义要进行填充的颜色
  ctx.fillStyle = 'rgba(0, 0, 0, .3)';
  // 定义要填充的是一个矩形区域
  ctx.fillRect(0,0, width, height);

  for(let i=0;i<balls.length;i++){
    // 先绘制球，
    balls[i].draw();
    // 然后将球在速度上进行更新,如果现在的位置在下一个速度上会超出范围
    // 则需要更新速度，避免下一次移动超出范围
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
};

loop();