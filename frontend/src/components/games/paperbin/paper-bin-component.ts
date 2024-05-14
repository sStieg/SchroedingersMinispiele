import { html, render } from "lit-html";
import { PaperBinGameState, PaperPlane, Bin, store } from "./model";
import {produce} from 'immer'
import {endGame} from "../../../script";

/* INIT */
let gameInterval: NodeJS.Timeout;
let planes: PaperPlane[];
let gameState: PaperBinGameState = {
    paperPlanes: [],
    bin: new Bin
}

let leftArrow = false;
let rightArrow = false;

let planeId = 0;
let planeCounter = 0;


class PaperBinComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        /*store.subscribe(paperbingame => {
            this.render(paperbingame)
        })*/
        this.render(gameState)
    }
    render(paperbingame: PaperBinGameState) {
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

function template(paperbingame: PaperBinGameState) {
    console.log("template", paperbingame)
    return html`
    <style>
        
        #surface{
            width: 50vw;
            height: 50vh;
            position: relative;
        }
    </style>
    <div id="paperBinGame" class="game">
        <div id="surface">
            <div id="sprite" style="position: absolute; bottom: 20vw; left: 20vw; z-index: 100;">
                <img id="korb" style="width: 15vw; height: auto" src = "../../../images/papierkorb.png"/>
            </div>  
            
        </div>
    </div>
    `
}


/* INIT GAME */
let surface = document.getElementById("surface");

export function startPaperBinGame() {
    //plane array initialisieren
    planes = gameState.paperPlanes;

    //bin initialisieren
    gameState.bin.position.center.x = 5;
    gameState.bin.position.center.y = 99;
    gameState.bin.id = 'sprite';

    let binHTML = document.getElementById(gameState.bin.id)
    binHTML.style.left = gameState.bin.position.center.x + "%";
    binHTML.style.top = gameState.bin.position.center.y + "%";

    //game interval starten
    gameInterval = setInterval(gameLoop, 10); // async recursion
    document.onkeydown = keyListenerDown;
    document.onkeyup = keyListenerUp;

    spawnPlane();
    setInterval(spawnPlane,3000);
}

function spawnPlane(){
    const plane = createPlane(randomPositionX(), 0, 0.05, randomSpeed());
    planes.push(plane);
}

function createPlane(x: number, y: number, dx: number, dy: number): PaperPlane{
    const plane = new PaperPlane()
    plane.position.center.x = x;
    plane.position.center.y = y;
    planeId++;
    plane.id = planeId;
    plane.velocityX = dx;
    plane.velocityY = dy;

    surface.innerHTML += createPlaneBox(plane)

    const plHTML = document.getElementById(""+plane.id)
    plHTML.style.left = plane.position.center.x + "%";
    plHTML.style.top = plane.position.center.y + "%";
        
    if(x>50){
        plane.velocityX = -plane.velocityX;
        plHTML.style.transform = "scaleX(-1)";
    } 
    
    return plane;
}

function createPlaneBox(plane: PaperPlane){
    return `<div id="${plane.id}" style="position: absolute;">
                <img id="plane" style="width: 5vw; height: auto; position: absolute; transform: rotate(40deg)" src="../../../images/papierflieger.png"/>
            </div>`
}

function randomPositionX(){
    return Math.floor(Math.random() * 100)
} 

function randomSpeed(){
    return Math.random() * (0.5 - 0.001) + 0.001; //random number zwischen 0.001 und 0.5
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


/* GAME LOOP */
function gameLoop() {
    for (let i = 0; i < planes.length; i++) {
        checkKorb(gameState.paperPlanes[i]);
    }

    if(leftArrow) {
        moveBin(-0.5, 0);
    }
    if(rightArrow) {
        moveBin(0.5, 0);
    }
    
    planes.forEach(pl => movePlane(pl));
}

function moveBin(dx: number, dy:number){
    gameState.bin.move(dx, dy);
   
    document.getElementById(gameState.bin.id).style.left = gameState.bin.position.center.x + "%";
    document.getElementById(gameState.bin.id).style.top = gameState.bin.position.center.y + "%"; 
}

function movePlane(pl: PaperPlane){
    pl.move(pl.velocityX, pl.velocityY);
    
    const plHTML = document.getElementById(""+pl.id)

    if(pl.position.center.y > 135 || pl.position.center.x <= 10 || pl.position.center.x >= 95){
        deletePlane(pl.id, plHTML)
    }else{
        plHTML.style.left = pl.position.center.x + "%";
        plHTML.style.top = pl.position.center.y + "%";  
    } 
}

function deletePlane(id: number, planeHTML: HTMLElement){
    for (let i = 0; i < planes.length; i++) {
        if(planes[i].id === id){
            planes.splice(i,1)
        }   
    }

    planeHTML.remove();
}

function resetGame(){
    clearInterval(gameInterval);
    planeCounter = 0;
    planes = [];
}


function checkKorb(plane: PaperPlane) { //plane übergeben 
    const planeHTML = document.getElementById(""+plane.id);
    const binHTML = document.getElementById(gameState.bin.id);

    if((parseFloat(planeHTML.style.left) >= parseFloat(binHTML.style.left)) && (parseFloat(planeHTML.style.left) <= parseFloat(binHTML.style.left)+10) &&
        (parseFloat(planeHTML.style.top) >= parseFloat(binHTML.style.top))){
            //clearInterval(gameInterval);
            deletePlane(plane.id,planeHTML)
            planeCounter++;
            console.log(planeCounter)

            if(planeCounter === 4){
                console.log("YOU WON")
                endGame();
            }
    }
}