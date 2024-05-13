import { html, render } from "lit-html";
import { PaperBinGame, store } from "./model";
import {produce} from 'immer'
import {endGame} from "../../../script";

class PaperBinComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        store.subscribe(paperbingame => {
            this.render(paperbingame)
        })
    }
    render(paperbingame: PaperBinGame) {
        render(template(paperbingame), this);
    }

    /*
    tick(){
        const nextState = produce(store.getValue(), game => {
            game.paperPlanes[0].x += 10
        })
        store.next(nextState)
    }*/
}
customElements.define("paper-bin-component", PaperBinComponent);

function template(paperbingame: PaperBinGame) {
    return html`
    <style>
        
        @keyframes paperplane {
            0% {
                transform: rotate(30deg);
            }
            40% {
                transform: rotate(45deg);
            }
            50% {
                transform: rotate(45deg);
            }
            60% {
                transform: rotate(20deg);
            }
            65% {
                transform: rotate(20deg);
            }
            80%{
                transform: rotate(45deg);
            }
            99% {
                transform: rotate(30deg)
            }
        }

        #surface{
            width: 50vw;
            height: 50vh;
            position: relative;
        }
    </style>
    <div id="paperBinGame" class="game">
        <div id="surface">
            <div id="sprite" style="position: absolute; bottom: 20vw; left: 20vw;">
                <img id="korb" style="width: 15vw; height: auto" src = "../../../images/papierkorb.png"/>
            </div>  
            
            <div id="planeBox" style="position: absolute;">
                <img id="plane" style="width: 5vw; height: auto; position: absolute; animation-timing-function: ease-in-out; animation: paperplane 4s infinite" src="../../../images/papierflieger.png"/>
            </div>
        </div>
    </div>
    `
}

/* INIT */
let korb = document.getElementById("sprite");
let surface = document.getElementById("surface");
let planeBox = document.getElementById("planeBox");
let plane = document.getElementById("plane");
let gameInterval: NodeJS.Timeout;

let leftArrow = false;
let rightArrow = false;

let planeIdCounter = 0;

/* EVENT LISTENER */


export function startPaperBinGame() {
    korb.style.left = "5%"; // starting position
    korb.style.top = "99%";

    planeBox.style.left = "10%"; // starting position
    planeBox.style.top = "0%";


    gameInterval = setInterval(gameLoop, 10); // async recursion
    document.onkeydown = keyListenerDown;
    document.onkeyup = keyListenerUp;
}
        
/* CHECK PRESSED KEY */
function keyListenerDown(e){        
    //console.log(e.keyCode);
    if (!e){
        e = window.event; //Internet Explorer
    }
    if (e.keyCode == 37){ // leftArrow
        leftArrow = true;
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
    if (e.keyCode == 39){ // rightArrow
        rightArrow = false;
    }
}


function randomPositionX(){
    return Math.floor(Math.random() * (1200 - 5 + 1 )+ 5);
}

/* SPAWNING PLANES */
/*
function spawnPlane(){
    planeBox.innerHTML = '<img id="plane" style="width: 8vw; height: auto;position: relative; animation-timing-function: ease-in-out; animation: paperplane 4s infinite; top: 0px; left:' + randomPositionX() + 'px" src="../../../images/papierflieger.png">';
    
    planeIdCounter++;

    setTimeout(spawnPlane, 4000); // async recursion
}
spawnPlane();*/

function gameLoop() {
    checkKorb();

    if(leftArrow) {
        moveKorb(-0.5,0);
    }
    if(rightArrow) {
        moveKorb(0.5,0)
    }
    movePlane(0.1,0.3);
}



/* GAME LOOP */


/*MOVE PLANE*/
function movePlane(dx, dy){
    // current position
    let x = parseFloat(planeBox.style.left);
    let y = parseFloat(planeBox.style.top);
            
    // calc new position
    x += dx;
    y += dy;

    if(y > 120) {
        y = 120;
        x = x-0.1;
    }
    
    // assign new position
    planeBox.style.left = x + "%";
    planeBox.style.top = y + "%";  
}

/* MOVE KORB */
function moveKorb(dx, dy){
    // current position
    let x = parseFloat(korb.style.left);
    let y = parseFloat(korb.style.top);
            
    // calc new position
    x += dx;
    y += dy;

    if(x < 0) {
        x = 0;
    } else if (x > 95) {
        x = 95;
    }
            
    // assign new position
    korb.style.left = x + "%";
    korb.style.top = y + "%";  
}
	

function checkKorb() {
    if((parseFloat(planeBox.style.left) >= parseFloat(korb.style.left)) && (parseFloat(planeBox.style.left) <= parseFloat(korb.style.left)+15) &&
        (parseFloat(planeBox.style.top) >= parseFloat(korb.style.top))){
        console.log("YOU WON")
        clearInterval(gameInterval);
        endGame();
    }
}