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
            }
        </style>
        
        <div id="basketballGame" class="game">
            <div id="board">
                <img id="basket" src="../../../../images/basket.png">
                <img id="basketball" src="../../../../images/basketball.png"/>
            </div>
        </div>
    `
}


/* INIT */
let basketball: HTMLElement = document.getElementById("basketball");
let basket: HTMLElement = document.getElementById("basket");
let gameInterval;
let moveBasketCounter = 0;
let isBasketOnTop = false;
let gravitation: number = 0;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;
let downArrow = false;



export function startBasketballGame() {
    basketball.style.left = "10%"; // starting position
    basketball.style.top = "95%"; // starting position
    basket.style.left = "95%"; // starting position
    basket.style.top = "10%"; // starting position

    gameInterval = setInterval(gameLoop, 20); // async recursion
}

/* EVENT LISTENER */
document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

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
    if (e.keyCode == 40){ // downArrow
        downArrow = true;
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
    if (e.keyCode == 40){ // downArrow
        downArrow = false;
    }
}


/* GAME LOOP */
function gameLoop() {
    checkBasket();

    if(parseFloat(basketball.style.top) < 95) {
        moveSprite(0, gravitation);
        gravitation += 0.18;
    } else {
        gravitation = 0;
    }

    if(leftArrow && parseFloat(basketball.style.left) > 0) {
        moveSprite(-1,0);
    }
    if(rightArrow && parseFloat(basketball.style.left) < 98) {
        moveSprite(1,0)
    }
    if(upArrow && parseFloat(basketball.style.top) > 0) {
        moveSprite(0,-2.5);
    }
    if(downArrow && parseFloat(basketball.style.top) < 95) {
        moveSprite(0,2.5);
    }

    moveBasket();

}
gameLoop();


/* MOVE SPRITE */
function moveSprite(dx, dy){
    // current position
    let x = parseFloat(basketball.style.left);
    let y = parseFloat(basketball.style.top);

    // calc new position
    x += dx;
    y += dy;

    // assign new position
    basketball.style.left = x + "%";
    basketball.style.top = y + "%";

}

function moveBasket() {
    if(!isBasketOnTop) {
        basket.style.top = parseFloat(basket.style.top)+2 +"%";
        moveBasketCounter++;
        if(parseFloat(basket.style.top) == 90) {
            isBasketOnTop = true;
        }
    } else {
        basket.style.top = parseFloat(basket.style.top)-2 +"%";
        moveBasketCounter--;
        if(parseFloat(basket.style.top) == 10) {
            isBasketOnTop = false;
        }
    }
}

function checkBasket() {
    if((parseFloat(basketball.style.left) >= parseFloat(basket.style.left)) && (parseFloat(basketball.style.left) <= parseFloat(basket.style.left)+5)) {

        if((parseFloat(basketball.style.top)+5 >= parseFloat(basket.style.top)) && (parseFloat(basketball.style.top)-5 <= parseFloat(basket.style.top))) {
            console.log("YOU WON")
            clearInterval(gameInterval);
            endGame();
        }

    }
}

