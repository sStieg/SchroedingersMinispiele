import {html, render} from "lit-html";

console.log("game-component")

const template = () => html`
<div id="minigames">
    <wordgame-component></wordgame-component>
    <pingpong-component></pingpong-component>
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