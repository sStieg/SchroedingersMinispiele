import {Basketball, basketBallGame, BasketballGame, gameState} from "./model";
import {produce} from "immer";
import {html, render} from "lit-html";
import {endGame} from "../../../script";

class BasketballGameComponent extends HTMLElement{
    leftArrow: boolean = false;
    rightArrow: boolean = false;
    upArrow: boolean = false;
    gameInterval: NodeJS.Timeout = null;
    gravitation: number = 0;

    connectedCallback(){
        console.log("connected")
        gameState.subscribe(basketballGame => {
            this.render(basketballGame)
        })
        this.startBasketballGame();
    }

    render(basketballGame: BasketballGame) {
        render(template(basketballGame), this)
    }

    checkBasket() {
        if(basketBallGame.basketball.position.center.x >= basketBallGame.basket.position.center.x && basketBallGame.basketball.position.center.x <= basketBallGame.basket.position.center.x+5) {
            if(basketBallGame.basketball.position.center.y+5 <= basketBallGame.basket.position.center.y) {
                console.log("YOU WON")
                clearInterval(this.gameInterval);
                endGame();
            }
        }
    }

    gameLoop() {
        if(basketBallGame.running){
            this.checkBasket();

            if(basketBallGame.basketball.position.center.y > basketBallGame.basketball.fallLimit) {
                basketBallGame.moveBall(0, -this.gravitation);
                this.gravitation += 0.18;
            } else {
                this.gravitation = 0;
            }

            if(this.leftArrow) {
                basketBallGame.moveBall(-1,0);
            }
            if(this.rightArrow) {
                basketBallGame.moveBall(1,0)
            }
            if(this.upArrow) {
                basketBallGame.moveBall(0,2.5);
            }

            this.render(basketBallGame)
        }   
    }

    startBasketballGame() {
        basketBallGame.basketball.position.width = 40;
        basketBallGame.basketball.position.height = 40;
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

        this.gameInterval = setInterval(() => {
            this.gameLoop()
        }, 20); // async recursion
        document.onkeydown = this.keyListenerDown;
        document.onkeyup = this.keyListenerUp;
    }
    keyListenerDown(e){
        console.log(e);
        //console.log(e.keyCode);
        if (!e){
            e = window.event; //Internet Explorer
        }
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
}
customElements.define("basketball-component", BasketballGameComponent);

function template (basketballGame: BasketballGame){
    const basketballStyle =
        "left:" + basketballGame.basketball.position.center.x + "%;" +
        "bottom:" + basketballGame.basketball.position.center.y + "%";

    const basketStyle =
        "left:" + basketballGame.basket.position.center.x + "%;" +
        "bottom:" + basketballGame.basket.position.center.y + "%";

    let bigObstacleStyle = "";
    let longObstacleStyle1 = "";
    let longObstacleStyle2 = "";
    let smallObstacleStyle = "";
    if(basketBallGame.obstacles.length >= 4) {
        bigObstacleStyle =
        "left:" + basketballGame.obstacles[0].position.center.x + "%;" +
        "bottom:" + basketballGame.obstacles[0].position.center.y + "%";

        longObstacleStyle1 =
            "left:" + basketballGame.obstacles[1].position.center.x + "%;" +
            "bottom:" + basketballGame.obstacles[1].position.center.y + "%";

        longObstacleStyle2 =
            "left:" + basketballGame.obstacles[2].position.center.x + "%;" +
            "bottom:" + basketballGame.obstacles[2].position.center.y + "%";

        smallObstacleStyle =
            "left:" + basketballGame.obstacles[3].position.center.x + "%;" +
            "bottom:" + basketballGame.obstacles[3].position.center.y + "%";
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
        
        <div id="basketballGame" class="game" ?hidden=${!basketBallGame.running}>
            <div id="board">
                <img id="basket" src="../../../../images/basket.png" style=${basketStyle}>
                <img id="basketball" src="../../../../images/basketball.png" style=${basketballStyle}/>
                
                <div id="big" class="obstacle" style=${bigObstacleStyle}></div>
                <div id="long1" class="obstacle long" style=${longObstacleStyle1}></div>
                <div id="long2" class="obstacle long" style=${longObstacleStyle2}></div>
                <div id="small" class="obstacle" style=${smallObstacleStyle}></div>
            </div>
        </div>
    `
}

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
/*function move(dx, dy){

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
}*/

