import {html, render} from "lit-html";

console.log("game-component")

const template = () => html`
<live-view-component>Live View</live-view-component>

<map-component></map-component>

<div class="diary">
    <div>
        <diary-component></diary-component>
    </div>
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