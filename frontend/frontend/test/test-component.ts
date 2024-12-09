import {html, render} from "lit-html";
import { startGame } from "./script";

class TestComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(this.template(), this)
    }

    template(){
        return html`
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, Helvetica, sans-serif;
                    box-sizing: border-box;
                    border-radius: 10px;
                }

                body {
                    width: 100vw;
                    height: 100vh;
                    padding: 10vh 20vw;
                    background-image: url("./images/vr-headset.jpg");
                    background-size: 70%;
                    background-repeat: no-repeat;
                    background-position-x: center;
                    background-position-y: center;
                }

                #big-box {
                    width: 45vw;
                    height: 40vh;
                    overflow-x: hidden;
                    position: relative;
                    top: 30vh;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                    margin-left: auto;
                    margin-right: auto;

                }

                #big-box::-webkit-scrollbar {
                    display: none;
                }

                .room {
                    width: 100%;
                    margin: 10px auto;
                    display: grid;
                    grid-template-columns: 50% 30%;
                    border: 2px #ffffff solid;
                    padding: 2%;
                    background-color: #444444;
                    background-image: linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , var(--pic);
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center;
                    color: #fff;
                }

                .post-button {
                    padding: 5%;
                    margin: 10px 0;
                    background-color: #ffffff;
                    border: 1px solid #3a3a3a;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: 100ms;
                    color: #000000;
                }

                .post-button:hover {
                    background-color: #d3d3d3;
                    cursor: pointer;
                }

                .unavailable {
                    opacity: 0.5;
                }

                .unavailable:hover {
                    background-color: #ffffff;
                }

                .roomName {
                    grid-row: 1/10;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>
            <div id="big-box">
                <div class="room" style="background-image: url('./images/kinderzimmer.jpeg')">
                    <h1 class="roomName">Kinderzimmer</h1>
                    <div class="post-button" @click=${() => {startGame('1x1;Katze',this)}}>Game: Basketball</div>
                    <div class="post-button" @click=${() => {startGame('1x2;Papier',this)}}>Game: Paper bin</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                </div>

                <div class="room" style="background-image: url('./images/bibliothek.jpeg')">
                    <h1 class="roomName">Bibliothek</h1>
                    <div class="post-button" @click=${() => {startGame('2x1;Katze', this)}}>Game: Drawguess</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                </div>

                <div class="room" style="background-image: url('./images/labor.jpeg')">
                    <h1 class="roomName">Labor</h1>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                </div>

                <div class="room" style="background-image: url('./images/kerker.jpeg')">
                    <h1 class="roomName">Kerker</h1>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                    <div class="post-button unavailable" @click=${() => {}}>(Kein Spiel verfügbar)</div>
                </div>
            </div>
        `
    }
}
customElements.define("test-component", TestComponent);