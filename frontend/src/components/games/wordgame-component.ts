import {html, render} from "lit-html";
import {endGame} from "../../script";

console.log("wordgame-component")

const GAME_SIZE = 8;
const BOARD = [
    ["H","I","N","T","E","R","X","I","J"],
    ["D","G","N","M","S","D","I","L","B"],
    ["Z","D","H","U","U","S","P","T","R"],
    ["L","Ö","K","S","M","G","D","O","Q"],
    ["F","S","Ü","L","C","O","V","H","S"],
    ["W","R","V","N","O","B","U","C","H"],
    ["R","P","E","R","X","I","F","U","L"],
    ["I","Z","A","F","Y","T","K","G","U"],
    ["T","O","E","R","S","K","F","Z","L"]
]
function tableDataTemplate(letter: String, row: number, column: number) {
    const id = `${row+1}x${column+1}`;
    return html`
        <td @click=${() => setEingabe(id)} class="letter" id=${id}>${letter}</td>
    `
}

function tableRowTemplate(row: string[], rowNumber: number) {
    let column = 0
    const tds = row.map(letter => tableDataTemplate(letter, rowNumber, column++));
    return html`<tr>
        ${tds}
    </tr>`
}

function tableTemplate() {
    let rowNumber = 0
    return BOARD.map(row => tableRowTemplate(row, rowNumber++))
}

const template = () => html`
<style type="text/css">
  @import url('https://fonts.googleapis.com/css2?family=Rethink+Sans&family=Whisper&display=swap');
  #wordgame{
    font-family: 'Rethink Sans', sans-serif;
    text-align: center;
    color: #000000;
  }
  #wordgame .letter:hover{
    cursor: pointer;
  }

  #wordgame h2{
    font-weight: 400;
  }

  #wordgame #raster td{
    padding: 20px;
    margin: 10px;
    border: solid black 1px;
    text-align: center;
    font-weight: bolder;
    border-radius: 5px;
    color: black;
    background-color: white;
  }

  #wordgame #raster{
    background-color: grey;
    border-radius: 5px;

  }

  #wordgame table{
    margin: 0 auto;
  }

  #wordgame #result td{
    visibility: hidden;
    font-size: 30px;
    font-weight:bolder;
    color: black;
    background-color: #e8ffde;
  }

  #wordgame #result{
    margin: 30px auto;
    border: #78fa41 solid 2px;
    padding: 10px 30px;
    background-color: #e8ffde;
    border-radius: 10px;
  }

</style>
<div id="wordgame" class="game">
    <h1>Spiel 2</h1>
    <h2>Finde die Wörter. <br> Wo könnte der nächste Schlüssel versteckt sein?</h2>

    <table id="raster">
        <tbody>
            ${tableTemplate()}
        </tbody>
    </table>

    <table id="result">
        <tbody>
        <tr>
            <td id="11">H</td>
            <td id="12">I</td>
            <td id="13">N</td>
            <td id="14">T</td>
            <td id="15">E</td>
            <td id="16">R</td>
        </tr>
        <tr>
            <td id="21">B</td>
            <td id="22">U</td>
            <td id="23">C</td>
            <td id="24">H</td>
        </tr>
        </tbody>
    </table>  
    
</div>
`

class WordgameComponent extends HTMLElement{
    connectedCallback(){
        console.log("connected")
        this.render()
    }

    render() {
        render(template(), this)
    }
}
customElements.define("wordgame-component", WordgameComponent);

let letters = [];

const array = [
    [11, 12, 13, 14, 15, 16, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 21, 22, 23, 24],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function setEingabe(id){
    let row = getRowOrColumn(id, true) -1;
    let column = getRowOrColumn(id, false) -1;

    if(isRight(row, column) != 0){
        let letter = document.getElementById(id);
        letter.style.backgroundColor = "#e8ffde";
        letter.style.border = "solid #78fa41 1px";

        letters.push(id);

        let result = document.getElementById(""+isRight(row, column));
        result.style.visibility = "visible";

        console.log(isEnd())
    }else{
        for(let i = 0; i < letters.length; i++){
            document.getElementById(letters[i]).style.backgroundColor = "white";
            document.getElementById(letters[i]).style.border = "solid black 1px";
        }
        letters = [];
        console.log(":( nochmal von vorne, falscher Buchstabe")
    }
}

function isEnd(){
    if(letters.includes("1x1") && letters.includes("1x2") && letters.includes("1x3") && letters.includes("1x3")
        && letters.includes("1x4") && letters.includes("1x5") && letters.includes("1x6") && letters.includes("6x6")
        && letters.includes("6x7") && letters.includes("6x8") && letters.includes("6x9")){

        console.log("Juhu, Du hast gewonnen");
        endGame();
        resetGame();

        return true;
    }
    return false;
}

function isRight(row: number, column: number){
    if(array[row][column] != 0){
        return array[row][column];
    }else{
        resetGame()
        return "";
    }
}

function resetGame(){
    console.log("reset...")

    for(let i = 0; i < letters.length; i++){
        document.getElementById(letters[i]).style.backgroundColor = "white";
        document.getElementById(letters[i]).style.border = "solid black 1px";
    }
    letters = [];

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if(array[i][j] != 0){
                document.getElementById(""+array[i][j]).style.visibility = "hidden";
            }
        }
    }
}

function getRowOrColumn(str, isRow) {
    var charCode

    if(isRow){
        charCode = str.charAt(0);
    }else{
        charCode = str.charAt(2);
    }

    var charNumber = parseInt(charCode);
    return charNumber;
}