import { html, render } from "lit-html";
import diaryData from './desktop.json';

console.log("diary-component");

const template = (entry) => html`
<style>
  .diary-content {
    max-height: 70vh; /* Adjust to desired height */
    overflow-y: auto;
    padding: 1rem;
    box-sizing: border-box;
  }
  .diary-content::-webkit-scrollbar {
    width: 8px;
  }
  .diary-content::-webkit-scrollbar-thumb {
    background: #ccc; 
    border-radius: 4px;
  }
  .diary-content::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
</style>

<div class="diary-container">
  <div class="diary-content">
    
    <h2>Chapter ${entry.chapter}: ${entry.date}</h2>
    <p>${entry.entry}</p>
  </div>
  <div class="diary-buttons">
    <button id="prevBtn">Previous</button>
    <button id="nextBtn">Next</button>
  </div>
</div>
`;

class DiaryComponent extends HTMLElement {
  private page: number = 0;
  private diary = diaryData;

  connectedCallback() {
    console.log("connected");
    this.render();
    this.addNavigationListeners();
  }

  render() {
    render(template(this.diary[this.page]), this);
  }

  addNavigationListeners() {
    this.addEventListener("click", (event) => {
      if (event.target && (event.target as HTMLElement).id === "nextBtn") {
        this.nextPage();
      } else if (event.target && (event.target as HTMLElement).id === "prevBtn") {
        this.previousPage();
      }
    });
  }

  nextPage() {
    if (this.page < this.diary.length - 1) {
      this.page++;
      this.render();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.render();
    }
  }
}

customElements.define("diary-component", DiaryComponent);
