import { html, render } from "lit-html";
import {PaperPlane, paperbinGame, paperBinGameState} from "./model";
import "../won-game-component";
import {Rectangle} from "../interfaces/Rectangle";


class PaperBinComponent extends HTMLElement{
    gameInterval: NodeJS.Timeout;
    planeInterval: NodeJS.Timeout;
    //planes: PaperPlane[];
    leftArrow = false;
    rightArrow = false;

    planeId = 0;
    numPlanesInBin = 0;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        console.log("connected")

        //this.startPaperBinGame();
        paperBinGameState.subscribe(() => {
            this.render()
            this.startPaperBinGame()
        })
    }
    render() {
        render(template(), this.shadowRoot);
    }

    collisonHandler(plane: PaperPlane): boolean {
        if (plane != null && paperbinGame.paperPlanes[parseInt(plane.elementId)] != null) {
            // Check for collision with the bin
            if (doRectanglesCollide(plane.position, paperbinGame.bin.position)) {
                console.log("Plane collided with bin");

                this.numPlanesInBin++;
                console.log(this.numPlanesInBin);

                if (this.numPlanesInBin > 1) {
                    console.log("YOU WON");
                    paperbinGame.isWon = true;
                    clearInterval(this.gameInterval);
                    clearInterval(this.planeInterval);
                    this.numPlanesInBin = 0;
                }
                return true;
            }
        }
        return false;  // No collision
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
        if (this.leftArrow) {
            this.moveBin(-0.5, 0);
        }
        if (this.rightArrow) {
            this.moveBin(0.5, 0);
        }

        // Array to collect planes that have collided and need deletion
        let planesToDelete = [];

        // Move and check collisions for all planes
        paperbinGame.paperPlanes.forEach(pl => {
            this.movePlane(pl);  // Move the plane
            if (this.collisonHandler(pl)) {  // Check for collision
                planesToDelete.push(pl.elementId);  // Mark plane for deletion if collision occurs
            }
        });

        // Delete the collided planes after iteration
        planesToDelete.forEach(id => this.deletePlane(id));

        this.render();  // Re-render the game state

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
            this.deletePlane(parseInt(pl.elementId))
        }
    }

    deletePlane(id: number) {
        paperbinGame.paperPlanes = paperbinGame.paperPlanes.filter(plane => parseInt(plane.elementId) !== id);
    }

    spawnPlane(){
        const plane = this.createPlane(this.randomPositionX(), 0, 0.05, this.randomSpeed());
        paperbinGame.paperPlanes.push(plane);
    }

    createPlane(x: number, y: number, dx: number, dy: number): PaperPlane{
        let plane = new PaperPlane()

        plane.position.leftTop.x = x;
        plane.position.leftTop.y = y;
        plane.elementId = this.planeId + "";
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
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            #pboard{
                width: 100%;
                height: 100%;
                position: relative;
                background-image: url('../../../../images/office.webp');
                background-repeat: no-repeat;
                background-size: cover;
            }

            #sprite{
                position: absolute;
                z-index: 5;
            }
        </style>
        <div id="paperBinGame">
            <div id="pboard">
                <div id="sprite" style=${binStyle}>
                    <img id="korb" style="width: 100%; height: 100%" src = "../../../images/papierkorb.png"/>
                </div>
                ${planesHTML}

                ${congratulation}
            </div>
        </div>
    `
}

function doRectanglesCollide(recA: Rectangle, recB: Rectangle) {
    const recA_right = recA.leftTop.x + recA.width;
    const recA_bottom = recA.leftTop.y + recA.height;
    const recB_right = recB.leftTop.x + recB.width;
    const recB_bottom = recB.leftTop.y + recB.height;

    // Check for horizontal and vertical overlap
    const horizontalOverlap = recA.leftTop.x < recB_right && recA_right > recB.leftTop.x;
    const verticalOverlap = recA.leftTop.y < recB_bottom && recA_bottom > recB.leftTop.y;

    return horizontalOverlap && verticalOverlap;
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