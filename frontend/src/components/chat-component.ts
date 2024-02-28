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

    <div id="write-message">
        <textarea id="text" name="text"></textarea> 	
        <button><img src="../../images/send.png"></button>
    </div>
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