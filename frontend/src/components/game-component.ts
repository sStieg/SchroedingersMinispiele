import {html, render} from "lit-html";

console.log("game-component")

const template = () => html`

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