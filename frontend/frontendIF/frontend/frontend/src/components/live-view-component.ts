import { html, render } from "lit-html";

console.log("live-view-component");

const template = () => html`
  <div>
    <h1>Live View</h1>
    <img src="http://localhost:8081/image" alt="Live view" />
  </div>
`;

class LiveViewComponent extends HTMLElement {
  connectedCallback() {
    console.log("connected");
    this.render();
  }

  render() {
    render(template(), this);
  }
}
customElements.define("live-view-component", LiveViewComponent);
