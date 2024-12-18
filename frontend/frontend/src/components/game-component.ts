import {html, render, TemplateResult} from "lit-html";
import {gameSubject} from "../script";

console.log("game-component")

const template = (currGame: TemplateResult) => html`
    <live-view-component></live-view-component>

    <map-component></map-component>

    <div class="diary">
        <div>
            <diary-component></diary-component>
        </div>
    </div>
    <div id="minigames">
        ${currGame}
    </div>
`

class GameComponent extends HTMLElement{
    static observedAttributes
    currGame: TemplateResult = html``;

    connectedCallback(){
        console.log("connected")
        this.render()

        gameSubject.subscribe(game => {
            this.currGame = game;
            this.render()
        })
    }

    render() {
        render(template(this.currGame), this)
    }
}
customElements.define("game-component", GameComponent);