import {Basketball, basketBallGame, BasketballGame, gameState} from "./model";
import {produce} from "immer";
import {html, render} from "lit-html";
import {endGame} from "../../../script";
import "../won-game-component";

class BasketballGameComponent extends HTMLElement{
    leftArrow: boolean = false;
    rightArrow: boolean = false;
    upArrow: boolean = false;
    gameInterval: NodeJS.Timeout = null;
    gravitation: number = 0;
    isWon: boolean = false;

    connectedCallback(){
        console.log("connected")
        gameState.subscribe(() => {
            this.render()
        })
        this.startBasketballGame();
    }

    render() {
        render(this.template(), this)
    }

    checkBasket() {
        if(basketBallGame.basketball.position.leftTop.x >= basketBallGame.basket.position.leftTop.x && basketBallGame.basketball.position.leftTop.x <= basketBallGame.basket.position.leftTop.x+5) {
            if(basketBallGame.basketball.position.leftTop.y+5 <= basketBallGame.basket.position.leftTop.y) {
                console.log("YOU WON")
                clearInterval(this.gameInterval);
                basketBallGame.isWon = true;
                this.render();
            }
        }
    }

    gameLoop() {
        if(basketBallGame.running){
            this.checkBasket();

            if(basketBallGame.basketball.position.leftTop.y > basketBallGame.basketball.fallLimit) {
                basketBallGame.moveBall(0, -this.gravitation);
                this.gravitation += 0.18;
            } else {
                this.gravitation = 0;
            }

            if(this.leftArrow) {
                basketBallGame.moveBall(-1,0);
            }
            if(this.rightArrow) {
                basketBallGame.moveBall(1,0);
            }
            if(this.upArrow) {
                basketBallGame.moveBall(0,2.5);
            }

            this.render();
        }   
    }

    startBasketballGame() {
        basketBallGame.basketball.position.width = 40;
        basketBallGame.basketball.position.height = 40;
        basketBallGame.basketball.position.leftTop.x = 10;
        basketBallGame.basketball.position.leftTop.y = 0;
        basketBallGame.basket.position.leftTop.x = 90;
        basketBallGame.basket.position.leftTop.y = 25;

        basketBallGame.obstacles.push({
            elementId: "big",
            position: {
                leftTop: {
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
                leftTop: {
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
                leftTop: {
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
                leftTop: {
                    x: 15,
                    y: 0
                },
                width: 5,
                height: 10
            }
        });

        this.gameInterval = setInterval(() => {
            this.gameLoop()
        }, 20); // async recursion
        document.onkeydown = (e) => {
            this.keyListenerDown(e);
        }
        document.onkeyup = (e) => {
            this.keyListenerUp(e);
        }
    }
    keyListenerDown(e){
        console.log(e);
        //console.log(e.keyCode);
        /*if (!e){
            e = window.event; //Internet Explorer
        }*/
        if (e.keyCode == 37){ // leftArrow
            this.leftArrow = true;
        }
        if (e.keyCode == 38){ //upArrow
            this.upArrow = true;
        }
        if (e.keyCode == 39){ // rightArrow
            this.rightArrow = true;
        }
    }
    keyListenerUp(e){
        //console.log(e);
        //console.log(e.keyCode);
        if (!e){
            e = window.event; //Internet Explorer
        }
        if (e.keyCode == 37){ // leftArrow
            this.leftArrow = false;
        }
        if (e.keyCode == 38){ //upArrow
            this.upArrow = false;
        }
        if (e.keyCode == 39){ // rightArrow
            this.rightArrow = false;
        }
    }

    template (){
        const basketballStyle =
            "left:" + basketBallGame.basketball.position.leftTop.x + "%;" +
            "bottom:" + basketBallGame.basketball.position.leftTop.y + "%";

        const basketStyle =
            "left:" + basketBallGame.basket.position.leftTop.x + "%;" +
            "bottom:" + basketBallGame.basket.position.leftTop.y + "%";

        let bigObstacleStyle = "";
        let longObstacleStyle1 = "";
        let longObstacleStyle2 = "";
        let smallObstacleStyle = "";
        if(basketBallGame.obstacles.length >= 4) {
            bigObstacleStyle =
                "left:" + basketBallGame.obstacles[0].position.leftTop.x + "%;" +
                "bottom:" + basketBallGame.obstacles[0].position.leftTop.y + "%";

            longObstacleStyle1 =
                "left:" + basketBallGame.obstacles[1].position.leftTop.x + "%;" +
                "bottom:" + basketBallGame.obstacles[1].position.leftTop.y + "%";

            longObstacleStyle2 =
                "left:" + basketBallGame.obstacles[2].position.leftTop.x + "%;" +
                "bottom:" + basketBallGame.obstacles[2].position.leftTop.y + "%";

            smallObstacleStyle =
                "left:" + basketBallGame.obstacles[3].position.leftTop.x + "%;" +
                "bottom:" + basketBallGame.obstacles[3].position.leftTop.y + "%";
        }

        let congratulation = html``;
        if(basketBallGame.isWon) {
            congratulation = html`
            <won-game-component></won-game-component>`;
        }


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
                width: 100%;
                height: 100%;
                position: relative;
                background-image: url('../../../../images/basketball.jpg');
                background-repeat: none;
                background-size: cover;
                background-position: center;
            }
            
            #big {
                width: 5%;
                height: 55%;
                border-radius: 5px 5px 0px 0px;
            }
            
            #small {
                width: 5%;
                height: 10%;
                border-radius: 5px 5px 0px 0px;
            }
            
            .long {
                width: 20%;
                height: 10%;
                border-radius: 5px;
            }
            
            .obstacle {
                background-color: #fff;
                position: absolute;
            }
        </style>
        
        <div id="basketballGame" class="game">
            <div id="board">
                <img id="basket" src="../../../../images/basket.png" style=${basketStyle}>
                <img id="basketball" src="../../../../images/basketball.png" style=${basketballStyle}/>
                
                <div id="big" class="obstacle" style=${bigObstacleStyle}></div>
                <div id="long1" class="obstacle long" style=${longObstacleStyle1}></div>
                <div id="long2" class="obstacle long" style=${longObstacleStyle2}></div>
                <div id="small" class="obstacle" style=${smallObstacleStyle}></div>

                ${congratulation}
            </div>
        </div>
    `
    }
}
customElements.define("basketball-component", BasketballGameComponent);

//const game = new BasketballGameComponent();

export function startBasketBallGame() {
    basketBallGame.running = true;
}

/* INIT */
/*let basketball: HTMLElement = document.getElementById("basketball");
let basket: HTMLElement = document.getElementById("basket");
let gameInterval: NodeJS.Timeout;
let gravitation: number = 0;

let leftArrow = false;
let rightArrow = false;
let upArrow = false;


export function startBasketballGame() {
    basketBallGame.basketball.position.width = parseFloat(basketball.style.width);
    basketBallGame.basketball.position.height = parseFloat(basketball.style.height);
    basketBallGame.basketball.position.leftTop.x = 10;
    basketBallGame.basketball.position.leftTop.y = 0;
    basketBallGame.basket.position.leftTop.x = 90;
    basketBallGame.basket.position.leftTop.y = 25;

    basketBallGame.obstacles.push({
        elementId: "big",
        position: {
            leftTop: {
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
            leftTop: {
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
            leftTop: {
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
            leftTop: {
                x: 15,
                y: 0
            },
            width: 5,
            height: 10
        }
    });

    basketball.style.left = basketBallGame.basketball.position.leftTop.x +"%"; // starting position
    basketball.style.bottom = basketBallGame.basketball.position.leftTop.y + "%"; // starting position
    basket.style.left = basketBallGame.basket.position.leftTop.x + "%"; // starting position
    basket.style.bottom = basketBallGame.basket.position.leftTop.y + "%"; // starting position

    for(let currObstacle of basketBallGame.obstacles) {
        document.getElementById(currObstacle.elementId).style.left = currObstacle.position.leftTop.x + "%";
        document.getElementById(currObstacle.elementId).style.bottom = currObstacle.position.leftTop.y + "%";
    }

    gameInterval = setInterval(this.gameLoop, 20); // async recursion
    document.onkeydown = keyListenerDown;
    document.onkeyup = keyListenerUp;
}

/* EVENT LISTENER */


/* CHECK PRESSED KEY */
/*function keyListenerDown(e){
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
/*function gameLoop() {
    checkBasket();

    if(basketBallGame.basketball.position.leftTop.y > basketBallGame.basketball.fallLimit) {
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
/*function move(dx, dy){

    basketBallGame.moveBall(dx,dy);

    basketball.style.left = basketBallGame.basketball.position.leftTop.x + "%";
    basketball.style.bottom = basketBallGame.basketball.position.leftTop.y + "%";

}

function checkBasket() {
    if((parseFloat(basketball.style.left) >= parseFloat(basket.style.left)) && (parseFloat(basketball.style.left) <= parseFloat(basket.style.left)+5)) {
        if(parseFloat(basketball.style.bottom)+5 <= parseFloat(basket.style.bottom)) {
            console.log("YOU WON")
            clearInterval(gameInterval);
            endGame();
        }

    }
}*/

