import { html, render } from "lit-html";
import {lobbyIdSubject} from "../script";

console.log("live-view-component");

const template = (lobbyId) => html`
  <div>
    <h1>Live View</h1>
    <img src="http://localhost:8081/lobby/${lobbyId}/screenshot" alt="Live view" />
  </div>
`;

class LiveViewComponent extends HTMLElement {

  connectedCallback() {
    console.log("connected");
    this.render("");

    lobbyIdSubject.subscribe(lobbyId => {
      console.log("this is the loby id,", lobbyId)
      this.render(lobbyId);
    })

  }

  render(lobbyId) {
    render(template(lobbyId), this);
  }
}
customElements.define("live-view-component", LiveViewComponent);
