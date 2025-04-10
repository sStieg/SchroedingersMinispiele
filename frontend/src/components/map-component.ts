import { html, render } from "lit-html";
import "./room-component";

console.log("map-component");

// Example Challenges with "Selected" Status
const challenges = {
  "Nursery": [
    { name: "Schrödinger's Cat", selected: true },
    { name: "Basket Hunt", selected: true },
    { name: "Crash Landing", selected: false },
    { name: "Vintage Vision", selected: false },
    { name: "Teddy's Secret", selected: false },
    { name: "The Mistery Chest", selected: false },
    { name: "Equation-Escape", selected: false },
    { name: "Break Through", selected: false }
  ],
  "Library": [
    { name: "Hidden Note", selected: false },
    { name: "Precision Drawing", selected: false },
    { name: "Guiding Statue", selected: false },
    { name: "Book of Freedom", selected: false }
  ],
  "Laboratory": [
    { name: "Contamination Alarm", selected: false },
    { name: "Ventilation Security", selected: false },
    { name: "Antidote Mix", selected: false },
    { name: "Healing Elixir", selected: true },
    { name: "Door Lock Code", selected: false }
  ],
  "Dungeon": [
    { name: "The Hidden Scroll", selected: false },
    { name: "Tool Search", selected: false },
    { name: "Glowing Flame", selected: false },
    { name: "Blacksmith Craft", selected: true },
    { name: "Chain Breaker", selected: false }
  ]
};

// Opens the Popup
const openPopup = (roomName: string) => {
  const roomChallenges = challenges[roomName] || [];

  const challengeTable = html`
    <table style="width: 100%; text-align: left; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="padding: 8px; border-bottom: 2px solid #F8BA64; color: #F8BA64;">Challenge Name</th>
          <th style="padding: 8px; border-bottom: 2px solid #F8BA64; color: #F8BA64;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${roomChallenges.map(
          (challenge) => html`
            <tr>
              <td style="padding: 8px;">${challenge.name}</td>
              <td style="padding: 8px; color: ${challenge.selected ? "green" : "red"};">
                ${challenge.selected ? "Selected" : "Not Selected"}
              </td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;

  const popupTemplate = html`
  <div id="popup-container" 
       style="position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; z-index: 1000;">

    <div style="position: relative; background: white; padding: 20px; border-radius: 12px; border: 2px solid #F8BA64; 
                max-width: 600px; width: 90%; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);">

      <button @click=${() => closePopup()} 
              style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; cursor: pointer; font-size: 1.5rem; line-height: 1; font-weight: bold;">
        &times;
      </button>

      <h2 style="color: black; text-align: center;">${roomName} Challenges</h2>
      ${challengeTable}
    </div>

    <div id="popup-overlay" 
         style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0,0,0,0.5); z-index: -1;" 
         @click=${() => closePopup()}>
    </div>
  </div>
  `;


  render(popupTemplate, document.body);
};

// Closes the Popup
const closePopup = () => {
  render(html``, document.body); // Removes the popup
};

// Main Template
const template = () => html`
  <div>
    <room-component id="room1">
      <h2>Nursery</h2>
      <button class="small-button" @click=${() => openPopup("Nursery")}>Show Challenges</button>
    </room-component>

    <room-component id="room2">
      <h2>Library</h2>
      <button class="small-button" @click=${() => openPopup("Library")}>Show Challenges</button>
    </room-component>

    <room-component id="room3">
      <h2>Laboratory</h2>
      <button class="small-button" @click=${() => openPopup("Laboratory")}>Show Challenges</button>
    </room-component>

    <room-component id="room4">
      <h2>Dungeon</h2>
      <button class="small-button" @click=${() => openPopup("Dungeon")}>Show Challenges</button>
    </room-component>
  </div>
`;

// Define and Register Map Component
class MapComponent extends HTMLElement {
  connectedCallback() {
    console.log("connected");
    this.render();
  }

  render() {
    render(template(), this);
  }
}

customElements.define("map-component", MapComponent);