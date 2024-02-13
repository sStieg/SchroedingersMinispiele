import {html} from "lit-html";

console.log("hello world")

const template = () => html`
    <h1>Hello World</h1>
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