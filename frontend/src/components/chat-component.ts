import {html, render} from "lit-html";

console.log("chat-component")

const template = () => html`
<div>
    <div id="messages">
        <h2>Today</h2>
        <message-component class="message-self"></message-component>
        <message-component class="message-other"></message-component>
        <message-component class="message-self"></message-component>
        <message-component class="message-other"></message-component>
        <message-component class="message-self"></message-component>
        <message-component class="message-other"></message-component>
        <message-component class="message-self"></message-component>
        <message-component class="message-other"></message-component>
    </div>

    <write-message-component></write-component>
</div>
`

class ChatComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("chat-component", ChatComponent);