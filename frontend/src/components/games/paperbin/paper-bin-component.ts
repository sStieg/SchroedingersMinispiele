import { html, render } from "lit-html";
import { PaperBinGameState, PaperPlane, Bin, gameState, paperbinGame} from "./model";
import {produce} from 'immer'
import {endGame} from "../../../script";


class PaperBinComponent extends HTMLElement{
    gameInterval: NodeJS.Timeout;
    planeInterval: NodeJS.Timeout;
    planes: PaperPlane[];
    leftArrow = false;
    rightArrow = false;

    planeId = 0;
    planeCounter = -1;
    isWon: boolean = false;

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

    checkKorb(plane: PaperPlane) { //plane übergeben 
        if(plane != null && paperbinGame.paperPlanes[plane.id] != null){
            if((paperbinGame.paperPlanes[plane.id].position.center.x >= paperbinGame.bin.position.center.x-2) && (paperbinGame.paperPlanes[plane.id].position.center.x <= paperbinGame.bin.position.center.x+2) &&
            (paperbinGame.paperPlanes[plane.id].position.center.y <= paperbinGame.bin.position.center.y+2)){
                //clearInterval(gameInterval);
                this.deletePlane(plane.id)
                this.planeCounter++;
                console.log(this.planeCounter)
    
                if(this.planeCounter === 0){
                    console.log("YOU WON")
                    this.isWon = true;
                    endGame();
                }
            }
        }
    }

    startPaperBinGame() {
        //bin initialisieren
        paperbinGame.bin.position.center.x = 5;
        paperbinGame.bin.position.center.y = 99;
        paperbinGame.bin.id = 'sprite';
        console.log("initialized bin")

        //plane array initialisieren
        this.planes = paperbinGame.paperPlanes;
        console.log(this.planes)

        this.gameInterval = setInterval(() => {
            this.gameLoop()
        }, 10); // async recursion

        this.planeInterval = setInterval(() => {
            this.spawnPlane()
        }, 2000); 

        document.onkeydown = (e) => {
            this.keyListenerDown(e);
        }
        document.onkeyup = (e) => {
            this.keyListenerUp(e);
        }
    }

    gameLoop() {
        if(paperbinGame.running){
            for (let i = 0; i < this.planes.length; i++) {
                this.checkKorb(paperbinGame.paperPlanes[i]);
            }
        
            if(this.leftArrow) {
                this.moveBin(-0.5, 0);
            }
            if(this.rightArrow) {
                this.moveBin(0.5, 0);
            }
            
            this.planes.forEach(pl => this.movePlane(pl));
        } 

        this.render();
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
    
        if(pl.position.center.y > 135 || pl.position.center.x <= 10 || pl.position.center.x >= 95){
            this.deletePlane(pl.id)
        }else{
            pl.move(pl.velocityX, pl.velocityY);
        } 
    }

    deletePlane(id: number){
        for (let i = 0; i < this.planes.length; i++) {
            if(this.planes[i].id === id){
                this.planes.splice(i,1)
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

        plane.position.center.x = x;
        plane.position.center.y = y;
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
        "left:" + paperbinGame.bin.position.center.x + "%;" +
        "top:" + paperbinGame.bin.position.center.y + "%";
        
    let planesHTML = [];
    
    for (let i = 0; i < paperbinGame.paperPlanes.length; i++) {
        planesHTML[i] = html`
        <div style="position: absolute; left: ${paperbinGame.paperPlanes[i].position.center.x}%; top:${paperbinGame.paperPlanes[i].position.center.y}%;">
            <img id="plane" style="width: 5vw; height: auto; position: absolute; transform: rotate(40deg)" src="../../../images/papierflieger.png"/>
        </div>`; 
    }
    
    return html`
    <style>
        #surface{
            width: 50vw;
            height: 50vh;
            position: relative;
        }

        #sprite{
            position: absolute;
            z-index: 100;
        }

        #winning #button {
            width: 10%;
            height: 30px;
            color: #fff;
            background-color: #5a8d23;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
    <div id="paperBinGame" class="game">
        <div id="surface">
            <div id="sprite" style=${binStyle}>
                <img id="korb" style="width: 15vw; height: auto" src = "../../../images/papierkorb.png"/>
            </div>
            ${planesHTML}

            <div id="winning" ?hidden=${paperbinGame.isWon}>
                <h1>Gewonnen!</h1>
                <div id="button">Fertig</div>
            </div>
        </div>
    </div>
    `
}

export function startPaperBinGame() {
    paperbinGame.running = true;
}

document.getElementById("button").addEventListener("click", () => {
    endGame();
})


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