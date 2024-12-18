import { html, render } from "lit-html";
import diaryData from './desktop.json';

console.log("diary-component");

const template = (entry) => html`
<style>
  
</style>

<div class="diary-container">
  <div class="diary-content">
    <h2>Chapter ${entry.chapter}: ${entry.date}</h2>
    <p>${entry.entry}</p>
  </div>

  <div class="diary-buttons">
    <button class="small-button" id="prevBtn">Previous</button>
    <button class="small-button" id="nextBtn">Next</button>
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
