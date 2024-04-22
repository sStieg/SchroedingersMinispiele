import {BasketballGame, store} from "./model";
import {produce} from "immer";
import {html, render} from "lit-html";
import {endGame} from "../../../script";
class BasketballGameComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        store.subscribe(basketballGame => {
            this.render(basketballGame)
        })
    }

    render(basketballGame: BasketballGame) {
        render(template(basketballGame), this)
    }

    tick() {
        const nextState = produce(store.getValue(), game => {
            if(this.leftArrow) {
                this.moveSprite(-1.5,0);
            }
            if(this.rightArrow) {
                this.moveSprite(1.5,0)
            }
            if(this.upArrow) {
                this.moveSprite(0,-1.5);
            }
            if(this.downArrow) {
                this.moveSprite(0,1.5);
            }
        })
        store.next(nextState)
    }

    leftArrow = false;
    rightArrow = false;
    upArrow = false;
    downArrow = false;
    basketball: HTMLElement = document.getElementById("basketball");

    onClick (e: Event) {
        console.log("clicked")
    }

    moveSprite(dx, dy){
        // current position
        let x = parseFloat(this.basketball.style.left);
        let y = parseFloat(this.basketball.style.top);

        // calc new position
        x += dx;
        y += dy;

        // assign new position
        this.basketball.style.left = x + "vw";
        this.basketball.style.top = y + "vw";

    }
}
customElements.define("basketball-component", BasketballGameComponent);

function template (basketballGame: BasketballGame){
    return html`
        <style>
            #basketball {
                width: 40px;
                height: 40px;
                position: absolute;
            }
            
            #basket {
                width: 80px;
                height: 80px;
                position: absolute;
            }
            
            #board {
                width: 50vw;
                height: 50vh;
                position: relative;
                background-color: #000000;
            }
            
            #big {
                width: 5%;
                height: 55%;
            }
            
            #small {
                width: 5%;
                height: 10%;
            }
            
            .long {
                width: 20%;
                height: 10%;
            }
            
            .obstacle {
                background-color: #fff;
                position: absolute;
            }
        </style>
        
        <div id="basketballGame" class="game">
            <div id="board">
                <img id="basket" src="../../../../images/basket.png">
                <img id="basketball" src="../../../../images/basketball.png"/>
                
                <div id="big" class="obstacle"></div>
                <div class="obstacle long"></div>
                <div class="obstacle long"></div>
                <div id="small" class="obstacle"></div>
            </div>
        </div>
    `
}


/* INIT */
let basketball: HTMLElement = document.getElementById("basketball");
let basket: HTMLElement = document.getElementById("basket");
let bigObstacle: HTMLElement = document.getElementById("big");
let smallObstacle: HTMLElement = document.getElementById("small");
let longObstacle1: HTMLElement = <HTMLElement> document.getElementsByClassName("long")[0];
let longObstacle2: HTMLElement = <HTMLElement> document.getElementsByClassName("long")[1];
let fallBorder = 0;
let gameInterval: NodeJS.Timeout;
let moveBasketCounter = 0;
let isBasketOnTop = false;
let gravitation: number = 0;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;


export function startBasketballGame() {
    basketball.style.left = "10%"; // starting position
    basketball.style.bottom = "0%"; // starting position
    basket.style.left = "90%"; // starting position
    basket.style.bottom = "25%"; // starting position
    bigObstacle.style.left = "85%";
    bigObstacle.style.bottom = "0%";
    smallObstacle.style.left = "15%";
    smallObstacle.style.bottom = "0%";
    longObstacle1.style.left = "25%";
    longObstacle1.style.bottom = "15%";
    longObstacle2.style.left = "60%";
    longObstacle2.style.bottom = "30%";

    gameInterval = setInterval(gameLoop, 20); // async recursion
    document.onkeydown = keyListenerDown;
    document.onkeyup = keyListenerUp;
}

/* EVENT LISTENER */


/* CHECK PRESSED KEY */
function keyListenerDown(e){
    console.log(e);
    //console.log(e.keyCode);
    if (!e){
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37){ // leftArrow
        leftArrow = true;
    }
    if (e.keyCode == 38){ //upArrow
        upArrow = true;
    }
    if (e.keyCode == 39){ // rightArrow
        rightArrow = true;
    }
}
function keyListenerUp(e){
    //console.log(e);
    //console.log(e.keyCode);
    if (!e){
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37){ // leftArrow
        leftArrow = false;
    }
    if (e.keyCode == 38){ //upArrow
        upArrow = false;
    }
    if (e.keyCode == 39){ // rightArrow
        rightArrow = false;
    }
}


/* GAME LOOP */
function gameLoop() {
    checkBasket();

    if(parseFloat(basketball.style.bottom) > fallBorder) {
        moveSprite(0, -gravitation);
        gravitation += 0.18;
    } else {
        gravitation = 0;
    }

    if(leftArrow) {
        moveSprite(-1,0);
    }
    if(rightArrow) {
        moveSprite(1,0)
    }
    if(upArrow) {
        moveSprite(0,2.5);
    }


}

/* MOVE SPRITE */
function moveSprite(dx, dy){
    // current position
    let x = parseFloat(basketball.style.left);
    let y = parseFloat(basketball.style.bottom);

    // calc new position
    x += dx;
    y += dy;

    if(x < 0) {
        x = 0;
    } else if (x > 95) {
        x = 95;
    }

    if(y < fallBorder) {
        y = fallBorder;
    }

    fallBorder = 0;

    x = checkObstacle(bigObstacle, 5, 55, x, y);
    x = checkObstacle(longObstacle1, 20, 10, x, y);
    x = checkObstacle(longObstacle2, 20, 10, x, y);
    x = checkObstacle(smallObstacle, 5, 10, x, y);

    // assign new position
    basketball.style.left = x + "%";
    basketball.style.bottom = y + "%";

}

function checkObstacle(obstacle: HTMLElement, width: number, height: number, x: number, y: number) {
    if(x + 4 > parseFloat(obstacle.style.left) && x < parseFloat(obstacle.style.left) + width) {
        if(parseFloat(basketball.style.bottom) >= parseFloat(obstacle.style.bottom) + height ) {
            fallBorder = parseFloat(obstacle.style.bottom) + height;
        } else if (!(parseFloat(basketball.style.bottom)+5 < parseFloat(obstacle.style.bottom))) {
            return parseFloat(basketball.style.left);
        }

    }
    return x;
}

function moveBasket() {
    if(!isBasketOnTop) {
        basket.style.bottom = parseFloat(basket.style.bottom)+2 +"%";
        moveBasketCounter++;
        if(parseFloat(basket.style.bottom) == 90) {
            isBasketOnTop = true;
        }
    } else {
        basket.style.bottom = parseFloat(basket.style.bottom)-2 +"%";
        moveBasketCounter--;
        if(parseFloat(basket.style.bottom) == 10) {
            isBasketOnTop = false;
        }
    }
}

function checkBasket() {
    if((parseFloat(basketball.style.left) >= parseFloat(basket.style.left)) && (parseFloat(basketball.style.left) <= parseFloat(basket.style.left)+5)) {
        if(parseFloat(basketball.style.bottom)+5 <= parseFloat(basket.style.bottom)) {
            console.log("YOU WON")
            clearInterval(gameInterval);
            endGame();
        }

    }
}

