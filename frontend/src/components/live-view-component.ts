import { html, render, TemplateResult } from "lit-html";
import { ScreenshotService } from "../../shared/screenshot.service";

console.log("live-view-component");

const template = (): TemplateResult => html`
  <div>
    <img id="liveScreenshot" src="" alt="Live Screenshot" />
  </div>
`;

export class LiveViewComponent extends HTMLElement {
  private screenshotService: ScreenshotService;

  constructor() {
    super();
    this.screenshotService = new ScreenshotService("https://vm91.htl-leonding.ac.at/screenshot");
  }

  connectedCallback(): void {
    this.render();
    this.initializeSignalR();
  }

  private render(): void {
    render(template(), this);
  }

  private async initializeSignalR(): Promise<void> {
    await this.screenshotService.connect();
    this.screenshotService.onNewScreenshot((base64Image: string) => {
      const imgElement = this.querySelector("#liveScreenshot") as HTMLImageElement | null;
      if (imgElement) {
        imgElement.src = `data:image/png;base64,${base64Image}`;
      }
    });
  }
}

customElements.define("live-view-component", LiveViewComponent);