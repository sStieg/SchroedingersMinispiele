import {html, render} from "lit-html";

console.log("Schrödingers Minispiele")

const template = () => html`
    <h1>Schrödingers Minispiele</h1>
`

class AppComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("app-component", AppComponent);