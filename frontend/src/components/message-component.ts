import {html, render} from "lit-html";

console.log("message-component")

const template = () => html`
<div class="name">You</div>
<div class="text"><p>Lorem ipsum dolor sit amet!</p></div>
`

class MessageComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("message-component", MessageComponent);