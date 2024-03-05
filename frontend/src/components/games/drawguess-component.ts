import {html, render} from "lit-html";
import {endGame, solution} from "../../script";

console.log("drawguess-component")

let counter = 0;
function isRightGuess(){
    if(counter < 4){
        let guess = (<HTMLInputElement> document.getElementById("guess")).value;
        console.log(guess);

        guess = guess.toLowerCase();
        if(guess == getSolution().toLowerCase()){
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
            @import url('https://fonts.googleapis.com/css2?family=Nunito&family=Rubik+Burned&display=swap');

            #drawguess {
                font-family: 'Nunito', sans-serif;
            }

            #drawguess {
                padding: 0;
                margin: 0;
                color: white;
            }

            #drawguess h1 {
                margin: 0;
                padding-top: 5%;
                font-size: 50px;
                font-family: "Rubik Burned";
            }

            #drawguess #head {
                padding-top: 10%;
            }

            #drawguess {
                text-align: center;
                justify-content: center;
                background-color: rgba(2, 2, 11, 0.56);
                width: 100%;
                height: 100%;
            }

            #drawguess.life {
                width: 4%;
            }

            #drawguess #guess {
                height: 5%;
                margin-top: 20%;
                margin-bottom: 2%;
                width: 30%;
                background-color: #1c1c1c;
                border: 3px #a8a8a8 solid;
                color: white;
                border-radius: 10px;
                font-size: 35px;
            }

            #drawguess #submit {
                height: 5%;
                width: 5%;
                border-radius: 100px;
                background-color: white;
            }

            #drawguess #submit:hover {
                cursor: pointer;
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

        <div>
            <input type="text" name="guess" id="guess">
            <input type="submit" id="submit" @click=${() => isRightGuess()}>
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