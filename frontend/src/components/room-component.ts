import {html, render} from "lit-html";

console.log("room-component")

const template = () => html`
Room
`

class RoomComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("room-component", RoomComponent);