import {html, render} from "lit-html";
import "./room-component"

console.log("map-component")

const template = () => html`
<div>
    <room-component class="room" id="room1">Room 1</room-component>
    <room-component class="room" id="room2">Room 2</room-component>
    <room-component class="room" id="room3">Room 3</room-component>
    <room-component class="room" id="room4">Room 4</room-component>
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