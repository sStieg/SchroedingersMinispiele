import {html, render, TemplateResult} from "lit-html";
import {gameSubject} from "../script";

console.log("game-component")

const template = (currGame: TemplateResult, cssDisplay: string) => html`
    <live-view-component></live-view-component>

    <map-component></map-component>

    <div class="diary">
        <div>
            <diary-component></diary-component>
        </div>
    </div>
    <div id="minigames" style="display: ${cssDisplay}">
        ${currGame}
    </div>
`

class GameComponent extends HTMLElement{
    static observedAttributes
    currGame: TemplateResult = html``;
    cssDisplay: string = "none";

    connectedCallback(){
        console.log("connected")
        this.render()

        gameSubject.subscribe(game => {
            this.currGame = game;

            console.log(game)
            if(game.strings.at(0) === "") {
                this.cssDisplay = "none";
            } else {
                this.cssDisplay = "block"
            }

            this.render()
        })
    }

    render() {
        render(template(this.currGame, this.cssDisplay), this)
    }
}
customElements.define("game-component", GameComponent);