import {html, render} from "lit-html";
import {endGame, gameSubject, solution} from "../../../script";

console.log("drawguess-component");

class DrawguessComponent extends HTMLElement{
    counter = 0;
    isWon = false;
    guess = ""
    fullHeart = html`
        <img src="../../../../images/heart.png" class="life" id="1">
    `
    deadHeart = html`
        <img src="../../../../images/heart-dead.png" class="life" id="1">
    `

    constructor() {
        super();
        this.attachShadow({ mode: "open" })
    }


    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(this.template(), this.shadowRoot)
    }

    isRightGuess(){
        if(this.counter < 4){
            this.guess = this.guess.toLowerCase();
            if(this.guess == "katze"){
                console.log("glückwunsch")
                this.isWon = true
                this.render()
            }
            else{
                this.counter++;
                this.render()

                if(this.counter == 4){
                    console.log("tot")
                    gameSubject.next(html``)
                }
            }
        } else {
            console.log("tot")
            gameSubject.next(html``)
        }
    }

    getSolution(){
        console.log(solution);
        return solution;
    }

    template() {
        let hearts = []

        for(let i = 0; i < 4; i++) {
            if(i < this.counter) {
                hearts.push(this.deadHeart)
            } else {
                hearts.push(this.fullHeart)
            }
        }

        let winningScreen = html``;
        if(this.isWon) {
            winningScreen = html`<won-game-component></won-game-component>`
        }

        return html`
            <div id="drawguess">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

                    #drawguess {
                        font-family: 'Roboto', sans-serif;
                        align-items: center;
                        justify-content: center;
                        background-image: url('../../../../images/board.jpg');
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                        width: 100%;
                        height: 100%;
                        position: relative;
                        left: 0;
                        top: 0;
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
                    <input type="text" name="guess" id="guess" @change=${(event) => this.guess = event.target.value}>
                    <input value="Senden" type="submit" id="submit" @click=${() => this.isRightGuess()}>
                </div>


                <div id="lifes">
                    ${hearts}
                </div>

                ${winningScreen}

            </div>
        `
    }
}
customElements.define("drawguess-component", DrawguessComponent);