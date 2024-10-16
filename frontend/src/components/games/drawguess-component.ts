import {html, render} from "lit-html";
import {endGame, solution} from "../../script";

console.log("drawguess-component")

let counter = 0;
function isRightGuess(){
    if(counter < 4){
        let guess = (<HTMLInputElement> document.getElementById("guess")).value;
        console.log(guess);

        guess = guess.toLowerCase();
        //if(guess == getSolution().toLowerCase()){
        if(guess == "katze"){
            console.log("glückwunsch")
            document.getElementById("win").style.visibility = "visible";
            endGame();
        }
        else{
            counter++;
            let image: HTMLImageElement = <HTMLImageElement> document.getElementById(""+counter);
            image.src = "./../../../images/heart-dead.png";
            if(counter == 4){
                console.log("tot")
                document.getElementById("game-over").style.visibility = "visible";
            }
            console.log("bist blind?")
        }
    }else{
        console.log("tot")
    }
}

function getSolution(){
    console.log(solution);
    return solution;
}

const template = () => html`
    <div id="drawguess" class="game">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

            #drawguess {
                font-family: 'Roboto', sans-serif;
                align-items: center;
                justify-content: center;
                background-image: url('../../../../images/board.jpg');
                background-repeat: none;
                background-size: cover;
            }

            #drawguess {
                padding: 0;
                margin: 0;
                color: white;
            }

            #drawguess h1 {
                margin: 0;
                font-size: 50px;
            }

            #head {
                padding-top: 25%;
            }

            #drawguess {
                text-align: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            #drawguess .life {
                width: 5%;
            }

            #drawguess #guess {
                height: 5%;
                margin-top: 5%;
                margin-bottom: 2%;
                width: 30%;
                background-color: white;
                border: 1px #a8a8a8 solid;
                color: black;
                border-radius: 10px;
                font-size: 35px;
            }

            #drawguess #submit {
                height: 100%;
                width: 10%;
                color: #fff;
                background-color: #60b558;
                border: solid 1.5px #60b558;
                justify-content: center;
                align-items: center;
                border-radius: 100px;
                padding: 10px 20px;
                margin-bottom: 20px;
                cursor: pointer;
                transition: 0.5s;
            }

            #drawguess #submit:hover {
                cursor: pointer;
                background-color: #60b55870;
            }

            #drawguess #win {
                margin-top: -2%;
                font-size: 40px;
                visibility: hidden;
            }

            #drawguess #game-over {
                font-size: 40px;
                visibility: hidden;
            }
        </style>

            <h1 id="head">Draw and GUESS</h1>
            <h2>What is drawn here?</h2>

            <div class="input">
                <input type="text" name="guess" id="guess">
                <input value="Senden" type="submit" id="submit" @click=${() => isRightGuess()}>
            </div>


            <div id="lifes">
                <img src="./../../../images/heart.png" class="life" id="1">
                <img src="./../../../images/heart.png" class="life" id="2">
                <img src="./../../../images/heart.png" class="life" id="3">
                <img src="./../../../images/heart.png" class="life" id="4">
            </div>

            <div id="win">
                <h1>Glückwunsch!</h1>
            </div>

            <div id="game-over">
                <h1>Game Over!</h1>
            </div>
        
    </div>
`

class DrawguessComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("drawguess-component", DrawguessComponent);