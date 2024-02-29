import {html, render} from "lit-html";

console.log("chat-component")

const template = () => html`
<style>
body{
    background-color: dimgray;
}
#pong{
    border: 2px solid #FFF;
    position: absolute;
    margin :auto;
    top:0;
    right:0;
    left:0;
    bottom:0;
}
</style>

<canvas id="pong" width="600" height="400"></canvas>

<script>
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const user = { //user object
x: 0,
y: (canvas.height-50)/2 ,
width: 10,
height: 100,
color: "WHITE",
score: 0
}

const com = { //computer object
x: canvas.width -10,
y: canvas.height/2 - 50,
width: 10,
height: 100,
color: "WHITE",
score: 0
}

const net = { //net object
x: canvas.width/2 - 1,
y: 0,
width: 2,
height: 10,
color: "WHITE"
}

const ball = { //ball object
x: canvas.width/2,
y: canvas.height/2,
radius: 10,
speed: 5,
velocityX: 5,
velocityY: 5,
color: "WHITE"
}


//draw functions
function drawRect(x, y, w, h, color){
ctx.fillStyle = color;
ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
ctx.fillStyle = color;
ctx.beginPath();
ctx.arc(x,y,r,0, Math.PI*2, false);
ctx.closePath();
ctx.fill()
}

function drawText(text, x, y, color){
ctx.fillStyle = color;
ctx.font = "75px fantasy";
ctx.fillText(text, x, y)
}

function drawNet(){
for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y+i, net.width, net.height, net.color);
}
}

let rectX = 0;
function render(){
drawRect(0, 0, canvas.width, canvas.height, "black"); //canvas
drawText(user.score, canvas.width/4, canvas.height/5, "WHITE"); //user score
drawText(com.score, 3*canvas.width/4, canvas.height/5, "WHITE"); //com score
drawRect(user.x, user.y, user.width, user.height, user.color); //user panel
drawRect(com.x, com.y, com.width, com.height, com.color); //com panel
drawNet(); //net
drawCircle(ball.x, ball.y, ball.radius, ball.color); //ball
}

//control the user paddle
canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt){
let rect = canvas.getBoundingClientRect();
user.y = evt.clientY - rect.top - user.height/2;
}

function resetBall(){
ball.x = canvas.width/2;
ball.y = canvas.height/2;

ball.speed = 5;
ball.velocityX = -ball.velocityX;
}


function collision(b, p){
p.top = p.y;
p.bottom = p.y + p.height;
p.left = p.x;
p.right = p.x + p.width;

b.top = b.y - b.radius;
b.bottom = b.y + b.radius;
b.left = b.x - b.radius;
b.right = b.x + b.radius;

//returns if collision or not
return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

//logic behind the game
function update(){  
ball.x += ball.velocityX;
ball.y += ball.velocityY;

//control computer paddle
let computerLevel = 0.07;
com.y += ((ball.y - (com.y + com.height/2))) * computerLevel;

if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
    ball.velocityY = -ball.velocityY;
}

let player = (ball.x < canvas.width/2) ? user : com;

if(collision(ball, player)){
    let collidePoint = ball.y - (player.y + player.height/2)
    
    collidePoint = collidePoint/(player.height/2);

    let angleRad = collidePoint * (Math.PI/4);

    let direction = (ball.x < canvas.width/2) ? 1 : -1;
    
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    ball.speed += 0.4;
}
else if(ball.x - ball.radius < 0){
    com.score++;
    if(isEnd(com.score)){
        resetGame();
        console.log("Game over")
    }
    resetBall();
}else if(ball.x + ball.radius > canvas.width){
    user.score++;
    if(isEnd(user.score)){
        console.log("You won")
    }
    resetBall();
}  
}

function resetGame(){
resetBall();
user.score = 0;
com.score = 0;
}

function isEnd(score){
if(score === 3){
    return true
}
return false;
}

function game(){ 
update();
render();
}

const framesPerSecond = 50;
let loop = setInterval(game,1000/framesPerSecond); //call game() 50x every 1s
</script>
`

class ChatComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("chat-component", ChatComponent);