import {html, render} from "lit-html";

console.log("live-view-component")

const template = () => html`
<img src="../../images/live-view.jpg">
`

class LiveViewComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("live-view-component", LiveViewComponent);