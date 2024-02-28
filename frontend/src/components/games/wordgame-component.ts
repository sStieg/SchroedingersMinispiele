import {html, render} from "lit-html";

console.log("diary-component")

const template = () => html`
<style type="text/css">
  @import url('https://fonts.googleapis.com/css2?family=Rethink+Sans&family=Whisper&display=swap');
  *{
    font-family: 'Rethink Sans', sans-serif;
    text-align: center;
    background-color: rgb(17, 17, 17);
    color: white;
  }
  .letter:hover{
    cursor: pointer;
  }

  h2{
    font-weight: 400;
  }

  #raster td{
    padding: 20px;
    margin: 10px;
    border: solid black 1px;
    text-align: center;
    font-weight: bolder;
    border-radius: 5px;
    color: black;
    background-color: white;
  }

  #raster{
    background-color: grey;
    border-radius: 5px;

  }

  table{
    margin: 0 auto;
  }

  #result td{
    visibility: hidden;
    font-size: 30px;
    font-weight:bolder;
    color: black;
    background-color: #e8ffde;
  }

  #result{
    margin: 30px auto;
    border: #78fa41 solid 2px;
    padding: 10px 30px;
    background-color: #e8ffde;
    border-radius: 10px;
  }

</style>

<h1>Spiel 2</h1>
<h2>Finde die Wörter. <br> Wo könnte der nächste Schlüssel versteckt sein?</h2>

<table id="raster">
  <tbody>
    <tr>
      <td class="letter" id="1x1" onclick="setEingabe(this.id)">H</td>
      <td class="letter" id="1x2" onclick="setEingabe(this.id)">I</td>
      <td class="letter" id="1x3" onclick="setEingabe(this.id)">N</td>
      <td class="letter" id="1x4" onclick="setEingabe(this.id)">T</td>
      <td class="letter" id="1x5" onclick="setEingabe(this.id)">E</td>
      <td class="letter" id="1x6" onclick="setEingabe(this.id)">R</td>
      <td class="letter" id="1x7" onclick="setEingabe(this.id)">X</td>
      <td class="letter" id="1x8" onclick="setEingabe(this.id)">I</td>
      <td class="letter" id="1x9" onclick="setEingabe(this.id)">J</td>
    </tr>
    <tr>
      <td class="letter" id="2x1" onclick="setEingabe(this.id)">D</td>
      <td class="letter" id="2x2" onclick="setEingabe(this.id)">G</td>
      <td class="letter" id="2x3" onclick="setEingabe(this.id)">N</td>
      <td class="letter" id="2x4" onclick="setEingabe(this.id)">M</td>
      <td class="letter" id="2x5" onclick="setEingabe(this.id)">S</td>
      <td class="letter" id="2x6" onclick="setEingabe(this.id)">D</td>
      <td class="letter" id="2x7" onclick="setEingabe(this.id)">I</td>
      <td class="letter" id="2x8" onclick="setEingabe(this.id)">L</td>
      <td class="letter" id="2x9" onclick="setEingabe(this.id)">B</td>
    </tr>
    <tr>
      <td class="letter" id="3x1" onclick="setEingabe(this.id)">Z</td>
      <td class="letter" id="3x2" onclick="setEingabe(this.id)">D</td>
      <td class="letter" id="3x3" onclick="setEingabe(this.id)">H</td>
      <td class="letter" id="3x4" onclick="setEingabe(this.id)">U</td>
      <td class="letter" id="3x5" onclick="setEingabe(this.id)">U</td>
      <td class="letter" id="3x6" onclick="setEingabe(this.id)">S</td>
      <td class="letter" id="3x7" onclick="setEingabe(this.id)">P</td>
      <td class="letter" id="3x8" onclick="setEingabe(this.id)">T</td>
      <td class="letter" id="3x9" onclick="setEingabe(this.id)">R</td>
    </tr>
    <tr>
      <td class="letter" id="4x1" onclick="setEingabe(this.id)">L</td>
      <td class="letter" id="4x2" onclick="setEingabe(this.id)">Ö</td>
      <td class="letter" id="4x3" onclick="setEingabe(this.id)">K</td>
      <td class="letter" id="4x4" onclick="setEingabe(this.id)">S</td>
      <td class="letter" id="4x5" onclick="setEingabe(this.id)">M</td>
      <td class="letter" id="4x6" onclick="setEingabe(this.id)">G</td>
      <td class="letter" id="4x7" onclick="setEingabe(this.id)">D</td>
      <td class="letter" id="4x8" onclick="setEingabe(this.id)">O</td>
      <td class="letter" id="4x9" onclick="setEingabe(this.id)">Q</td>
    </tr>
    <tr>
      <td class="letter" id="5x1" onclick="setEingabe(this.id)">F</td>
      <td class="letter" id="5x2" onclick="setEingabe(this.id)">S</td>
      <td class="letter" id="5x3" onclick="setEingabe(this.id)">Ü</td>
      <td class="letter" id="5x4" onclick="setEingabe(this.id)">L</td>
      <td class="letter" id="5x5" onclick="setEingabe(this.id)">C</td>
      <td class="letter" id="5x6" onclick="setEingabe(this.id)">O</td>
      <td class="letter" id="5x7" onclick="setEingabe(this.id)">V</td>
      <td class="letter" id="5x8" onclick="setEingabe(this.id)">H</td>
      <td class="letter" id="5x9" onclick="setEingabe(this.id)">S</td>
    </tr>
    <tr>
      <td class="letter" id="6x1" onclick="setEingabe(this.id)">W</td>
      <td class="letter" id="6x2" onclick="setEingabe(this.id)">R</td>
      <td class="letter" id="6x3" onclick="setEingabe(this.id)">V</td>
      <td class="letter" id="6x4" onclick="setEingabe(this.id)">N</td>
      <td class="letter" id="6x5" onclick="setEingabe(this.id)">O</td>
      <td class="letter" id="6x6" onclick="setEingabe(this.id)">B</td>
      <td class="letter" id="6x7" onclick="setEingabe(this.id)">U</td>
      <td class="letter" id="6x8" onclick="setEingabe(this.id)">C</td>
      <td class="letter" id="6x9" onclick="setEingabe(this.id)">H</td>
    </tr>
    <tr>
      <td class="letter" id="7x1" onclick="setEingabe(this.id)">R</td>
      <td class="letter" id="7x2" onclick="setEingabe(this.id)">P</td>
      <td class="letter" id="7x3" onclick="setEingabe(this.id)">E</td>
      <td class="letter" id="7x4" onclick="setEingabe(this.id)">R</td>
      <td class="letter" id="7x5" onclick="setEingabe(this.id)">X</td>
      <td class="letter" id="7x6" onclick="setEingabe(this.id)">I</td>
      <td class="letter" id="7x7" onclick="setEingabe(this.id)">F</td>
      <td class="letter" id="7x8" onclick="setEingabe(this.id)">U</td>
      <td class="letter" id="7x9" onclick="setEingabe(this.id)">L</td>
    </tr>
    <tr>
      <td class="letter" id="8x1" onclick="setEingabe(this.id)">I</td>
      <td class="letter" id="8x2" onclick="setEingabe(this.id)">Z</td>
      <td class="letter" id="8x3" onclick="setEingabe(this.id)">A</td>
      <td class="letter" id="8x4" onclick="setEingabe(this.id)">F</td>
      <td class="letter" id="8x5" onclick="setEingabe(this.id)">Y</td>
      <td class="letter" id="8x6" onclick="setEingabe(this.id)">T</td>
      <td class="letter" id="8x7" onclick="setEingabe(this.id)">K</td>
      <td class="letter" id="8x8" onclick="setEingabe(this.id)">G</td>
      <td class="letter" id="8x9" onclick="setEingabe(this.id)">U</td>
    </tr>
    <tr>
      <td class="letter" id="9x1" onclick="setEingabe(this.id)">T</td>
      <td class="letter" id="9x2" onclick="setEingabe(this.id)">O</td>
      <td class="letter" id="9x3" onclick="setEingabe(this.id)">E</td>
      <td class="letter" id="9x4" onclick="setEingabe(this.id)">R</td>
      <td class="letter" id="9x5" onclick="setEingabe(this.id)">S</td>
      <td class="letter" id="9x6" onclick="setEingabe(this.id)">K</td>
      <td class="letter" id="9x7" onclick="setEingabe(this.id)">F</td>
      <td class="letter" id="9x8" onclick="setEingabe(this.id)">Z</td>
      <td class="letter" id="9x9" onclick="setEingabe(this.id)">L</td>
    </tr>
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


  <script type="text/javascript" defer>
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

            let result = document.getElementById(isRight(row, column));
            result.style.visibility = "visible";

            console.log(isEnd())
          }else{
            for(i = 0; i < letters.length; i++){
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
          
          console.log("Juhu, Du hast gewonnen")
          resetGame()
          
          return true;
        }
        return false;
      }

      function isRight(row, column){
        if(array[row][column] != 0){
          return array[row][column];
        }else{
          resetGame(array)
          return 0;
        }
      }

      function resetGame(){
        console.log("reset...")

        for(i = 0; i < letters.length; i++){
          document.getElementById(letters[i]).style.backgroundColor = "white";
          document.getElementById(letters[i]).style.border = "solid black 1px";
        } 
        letters = [];

        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length; j++) {
            if(array[i][j] != 0){
              document.getElementById(array[i][j]).style.visibility = "hidden";
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
  </script>
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