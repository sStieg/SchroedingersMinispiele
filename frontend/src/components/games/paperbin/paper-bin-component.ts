import { html, render } from "lit-html";
import { PaperBinGameState, PaperPlane, Bin, gameState, paperbinGame, Rectangle} from "./model";
import {produce} from 'immer'
import {endGame} from "../../../script";
import "../won-game-component";


class PaperBinComponent extends HTMLElement{
    gameInterval: NodeJS.Timeout;
    planeInterval: NodeJS.Timeout;
    //planes: PaperPlane[];
    leftArrow = false;
    rightArrow = false;

    planeId = 0;
    numPlanesInBin = 0;

    connectedCallback(){
        console.log("connected")
        gameState.subscribe(() => {
            this.render()
        })
        this.startPaperBinGame();
    }
    render() {
        render(template(), this);
    }

    collisonHandler(plane: PaperPlane) { //plane übergeben 
        if(plane != null && paperbinGame.paperPlanes[plane.id] != null){
            if(doRectanglesCollide(plane.position, paperbinGame.bin.position)){
                this.deletePlane(plane.id)
                this.numPlanesInBin++;
                console.log(this.numPlanesInBin)
    
                if(this.numPlanesInBin > 0){
                    console.log("YOU WON")
                    paperbinGame.isWon = true;
                    clearInterval(this.gameInterval);
                    clearInterval(this.planeInterval);
                    paperbinGame.running = false;
                    this.numPlanesInBin = 0;
                }
            }
        }
    }

    startPaperBinGame() {
        //bin initialisieren
        paperbinGame.bin.position.leftTop.x = 5;
        paperbinGame.bin.position.leftTop.y = 60;
        
        paperbinGame.bin.id = 'sprite';
        console.log("initialized bin")

        //plane array initialisieren
        //this.planes = paperbinGame.paperPlanes;
        //console.log(this.planes)

        this.gameInterval = setInterval(() => {
            this.gameLoop()
        }, 10); // async recursion

        this.planeInterval = setInterval(() => {
            this.spawnPlane()
        }, 2000); 

        onkeydown = (e) => {
            this.keyListenerDown(e);
        }
        onkeyup = (e) => {
            this.keyListenerUp(e);
        }
    }

    gameLoop() {
        if(paperbinGame.running){
            

            if(this.leftArrow) {
                this.moveBin(-0.5, 0);
            }
            if(this.rightArrow) {
                this.moveBin(0.5, 0);
            }

            paperbinGame.paperPlanes.forEach(pl => this.movePlane(pl));
            console.log(paperbinGame.paperPlanes)
            for (let i = 0; i < paperbinGame.paperPlanes.length; i++) {
                this.collisonHandler(paperbinGame.paperPlanes[i]);
            }

            this.render();
        } 
    }

    
    keyListenerDown(e){        
        //console.log(e.keyCode);
        if (!e){
            e = window.event; //Internet Explorer
        }
        if (e.keyCode == 37){ // leftArrow
            this.leftArrow = true;
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
        if (e.keyCode == 39){ // rightArrow
            this.rightArrow = false;
        }
    }

    moveBin(dx: number, dy:number){
        paperbinGame.bin.move(dx, dy);
    }
    
    movePlane(pl: PaperPlane){
        pl.move(pl.velocityX, pl.velocityY);
    
        if(pl.position.leftTop.y > 95 || pl.position.leftTop.x <= 10 || pl.position.leftTop.x >= 95){
            this.deletePlane(pl.id)
        } 
    }

    deletePlane(id: number){
        for (let i = 0; i < paperbinGame.paperPlanes.length; i++) {
            if(paperbinGame.paperPlanes[i].id === id){
                paperbinGame.paperPlanes.splice(i,1)
            }   
        }
    }

    spawnPlane(){
        if(paperbinGame.running){
            const plane = this.createPlane(this.randomPositionX(), 0, 0.05, this.randomSpeed());
            paperbinGame.paperPlanes.push(plane);
        }  
    }
    
    createPlane(x: number, y: number, dx: number, dy: number): PaperPlane{
        let plane = new PaperPlane()

        plane.position.leftTop.x = x;
        plane.position.leftTop.y = y;
        plane.id = this.planeId;
        this.planeId++;
        plane.velocityX = dx;
        plane.velocityY = dy;
            
        if(x>50){
            plane.velocityX =- plane.velocityX;
        }

        return plane;
    }

    randomPositionX(){
        return Math.floor(Math.random() * 100)
    } 
    
    randomSpeed(){
        return Math.random() * (0.5 - 0.001) + 0.001; //random number zwischen 0.001 und 0.5
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

function template() {
    //TODO: const planeBoxes = paperbinGame.planes.map(plane => createPlaneBox(plane))
    const binStyle = 
        "width:" + paperbinGame.bin.position.width + "%;" +
        "height:" + paperbinGame.bin.position.height + "%;" +
        "left:" + paperbinGame.bin.position.leftTop.x + "%;" +
        "top:" + paperbinGame.bin.position.leftTop.y + "%";
        
    let planesHTML = [];
    
    for (let i = 0; i < paperbinGame.paperPlanes.length; i++) {
        planesHTML[i] = html`
        <div style="width: 7%; height: 5%; position: absolute; left: ${paperbinGame.paperPlanes[i].position.leftTop.x}%; top:${paperbinGame.paperPlanes[i].position.leftTop.y}%;">
            <img id="plane" style="width: 100%; height: 100%; position: absolute; transform: rotate(40deg)" src="../../../images/papierflieger.png"/>
        </div>`; 
    }

    let congratulation = html``;
        if(paperbinGame.isWon) {
            congratulation = html`
            <won-game-component></won-game-component>`;
        }
    
    return html`
    <style>
        #paperBinGame{
            width: 100%;
            height: 100%;
        }

        #surface{
            width: 100%;
            height: 100%;
            position: relative;
        }

        #sprite{
            position: absolute;
            z-index: 100;
        }
    </style>
    <div id="paperBinGame" class="game">
        <div id="surface">
            <div id="sprite" style=${binStyle}>
                <img id="korb" style="width: 100%; height: 100%" src = "../../../images/papierkorb.png"/>
            </div>
            ${planesHTML}

            ${congratulation}
        </div>
    </div>
    `
}

export function startPaperBinGame() {
    paperbinGame.running = true;
}

function doRectanglesCollide(recA: Rectangle, recB: Rectangle){
    if (recA.leftTop.x < recB.leftTop.x+recB.width && recA.leftTop.x > recB.leftTop.x &&
        recA.leftTop.y < recB.leftTop.y+recB.height && recA.leftTop.y > recB.leftTop.y ) {
        return true;
    }
    return false;
}


/* INIT GAME */
/*
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
/*
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
/*
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
}*/