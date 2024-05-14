import {basketBallGame, BasketballGame, gameState} from "./model";
import {produce} from "immer";
import {html, render} from "lit-html";
import {endGame} from "../../../script";
class BasketballGameComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        gameState.subscribe(basketballGame => {
            this.render(basketballGame)
        })
    }

    render(basketballGame: BasketballGame) {
        render(template(basketballGame), this)
    }

    tick() {
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
                z-index: 2
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
                <div id="long1" class="obstacle long"></div>
                <div id="long2" class="obstacle long"></div>
                <div id="small" class="obstacle"></div>
            </div>
        </div>
    `
}


/* INIT */
let basketball: HTMLElement = document.getElementById("basketball");
let basket: HTMLElement = document.getElementById("basket");
let gameInterval: NodeJS.Timeout;
let gravitation: number = 0;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;


export function startBasketballGame() {
    basketBallGame.basketball.position.width = parseFloat(basketball.style.width);
    basketBallGame.basketball.position.height = parseFloat(basketball.style.height);
    basketBallGame.basketball.position.center.x = 10;
    basketBallGame.basketball.position.center.y = 0;
    basketBallGame.basket.position.center.x = 90;
    basketBallGame.basket.position.center.y = 25;

    basketBallGame.obstacles.push({
        elementId: "big",
        position: {
            center: {
                x: 85,
                y: 0
            },
            width: 5,
            height: 55
        }
    });
    basketBallGame.obstacles.push({
        elementId: "long1",
        position: {
            center: {
                x: 25,
                y: 15
            },
            width: 20,
            height: 10
        }
    });
    basketBallGame.obstacles.push({
        elementId: "long2",
        position: {
            center: {
                x: 60,
                y: 30
            },
            width: 20,
            height: 10
        }
    });
    basketBallGame.obstacles.push({
        elementId: "small",
        position: {
            center: {
                x: 15,
                y: 0
            },
            width: 5,
            height: 10
        }
    });

    basketball.style.left = basketBallGame.basketball.position.center.x +"%"; // starting position
    basketball.style.bottom = basketBallGame.basketball.position.center.y + "%"; // starting position
    basket.style.left = basketBallGame.basket.position.center.x + "%"; // starting position
    basket.style.bottom = basketBallGame.basket.position.center.y + "%"; // starting position

    for(let currObstacle of basketBallGame.obstacles) {
        document.getElementById(currObstacle.elementId).style.left = currObstacle.position.center.x + "%";
        document.getElementById(currObstacle.elementId).style.bottom = currObstacle.position.center.y + "%";
    }

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

    if(basketBallGame.basketball.position.center.y > basketBallGame.basketball.fallLimit) {
        move(0, -gravitation);
        gravitation += 0.18;
    } else {
        gravitation = 0;
    }

    if(leftArrow) {
        move(-1,0);
    }
    if(rightArrow) {
        move(1,0)
    }
    if(upArrow) {
        move(0,2.5);
    }


}

/* MOVE SPRITE */
function move(dx, dy){

    basketBallGame.moveBall(dx,dy);

    basketball.style.left = basketBallGame.basketball.position.center.x + "%";
    basketball.style.bottom = basketBallGame.basketball.position.center.y + "%";

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

