import { html, render } from "lit-html";

console.log("message-component");

class MessageComponent extends HTMLElement {
    message: string;
    sender: string;

    static get observedAttributes() {
        return ["message", "sender"];
    }

    constructor() {
        super();
        this.message = "";
        this.sender = "";
    }

    connectedCallback() {
        console.log("connected");
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this.render();
        }
    }

    render() {
        const template = html`
            <div class="name">${this.sender}</div>
            <div class="text"><p>${this.message}</p></div>
        `;
        render(template, this);
    }
}

customElements.define("message-component", MessageComponent);