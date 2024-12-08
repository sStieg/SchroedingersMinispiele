import {html, render} from "lit-html";
import "./room-component"

console.log("map-component")

const template = () => html`
<div>
    <room-component class="room" id="room1"><h2>Kinderzimmer</h2></room-component>
    <room-component class="room" id="room2"><h2>Bibliothek</h2></room-component>
    <room-component class="room" id="room3"><h2>Labor</h2></room-component>
    <room-component class="room" id="room4"><h2>Kerker</h2></room-component>
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