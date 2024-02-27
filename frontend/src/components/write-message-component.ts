import {html, render} from "lit-html";

console.log("write-message-component")

const template = () => html`
<textarea id="text" name="text"></textarea> 	
<button><img src="../../images/send.png"></button>
`

class WriteMessageComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("write-message-component", WriteMessageComponent);