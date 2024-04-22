import {html, render} from "lit-html";

console.log("game-component")

const template = () => html`
<div id="minigames">
    <basketball-component></basketball-component>
    <paper-bin-component></paper-bin-component>
    <drawguess-component></drawguess-component>
</div>
`

class GameComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("game-component", GameComponent);