import {html, render} from "lit-html";
import {endGame} from "../../script";


class WonGameComponent extends HTMLElement {
    connectedCallback() {
        console.log("Won Game Component connected")
        this.render();
    }

    render() {
        render(this.template(), this)
    }

    template(){
        console.log("im template")

        return html`
        <style>
            #winning {
                position: absolute;
                width: 100%;
                height: 100%;
                font-family: calibri;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.78);
                z-index: 3;
            }

            #winning #button {
                width: 10%;
                height: 30px;
                color: #fff;
                background-color: #60b558;
                border: solid 1.5px #60b558;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 100px;
                padding: 3px 20px;
                cursor: pointer;
                transition: 0.5s;
            }

            #winning #button:hover {
                background-color: #60b55870;
            }

        </style>

        <div id="winning">
            <h1>Gratulation, Sie haben die Challange geschafft!</h1>
            <div id="button" @click=${() => {endGame()}}>Fertig</div>
        </div>
        `
    }
}
customElements.define("won-game-component", WonGameComponent)
