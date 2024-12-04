import { html, render } from "lit-html";

console.log("chat-component");

const template = () => html`
    <div>
        <div id="messages">
            <h2>Today</h2>
            <message-component class="message-self" sender="Du" message="Hallo, wie geht's dir?"></message-component>
            <message-component class="message-other" sender="Seppi" message="Mir geht's gut, danke!"></message-component>
            <message-component class="message-self" sender="Du" message="Schön, das zu hören!"></message-component>
            <message-component class="message-other" sender="Seppi" message="Und dir?"></message-component>
            <message-component class="message-self" sender="Du" message="Nicht so gut weil ich brauch Hilfe!"></message-component>
            <message-component class="message-self" sender="Du" message="Hallo? Ich brauch dringend Hilfe in diesem Raum, bitte helft mir!"></message-component>
            <message-component class="message-other" sender="Seppi" message="Damit wir dir Helfen können musst du auf den Hilfe Button klicken oder eine Challange starten!"></message-component>
        </div>

        <div id="write-message">
            <textarea id="text" name="text"></textarea>
            <button><img src="../../images/send.png"></button>
        </div>
    </div>
`;

class ChatComponent extends HTMLElement {
    connectedCallback() {
        console.log("connected");
        this.render();
    }

    render() {
        render(template(), this);
    }
}

customElements.define("chat-component", ChatComponent);