import {html, render} from "lit-html";
import "./room-component"

console.log("map-component")

const template = () => html`
<div>
    <room-component class="room" id="room1">Kinderzimmer</room-component>
    <room-component class="room" id="room2">Bibliothek</room-component>
    <room-component class="room" id="room3">Labor</room-component>
    <room-component class="room" id="room4">Kerker</room-component>
</div>
`

class MapComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("map-component", MapComponent);