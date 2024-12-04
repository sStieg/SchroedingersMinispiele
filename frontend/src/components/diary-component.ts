import {html, render} from "lit-html";

console.log("diary-component")

const template = () => html`
<div>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
    sed diam nonumy eirmod tempor invidunt ut labore et dolore 
    magna aliquyam erat, sed diam voluptua. At vero eos et accusam 
    et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
    no sea takimata et ea rebum. Stet clita kasd gubergren, 
    no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem 
    ipsum dolor sit amet...</p>
</div>
`

class DiaryComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("diary-component", DiaryComponent);