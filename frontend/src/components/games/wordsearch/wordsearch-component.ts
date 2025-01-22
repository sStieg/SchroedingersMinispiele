import { html, render } from "lit-html";

console.log("wordsearch-component");

class WordsearchComponent extends HTMLElement {
  grid = [];
  correctPositions = [];
  selectedPositions = new Set();
  isWon = false;
  selectedWord = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  startWordSearch() {
    this.selectedWord = this.randomWord();
    this.initGrid();
    this.render();
  }

  connectedCallback() {
    console.log("connected");

    this.startWordSearch();
  }

  randomWord() {
    const words = ["LEONDING", "CODE", "VRBRILLE", "TECHNIK", "INFORMATIK", "SCHROEDINGERS", "MEDIENTECHNIK"];
    return words[Math.floor(Math.random() * words.length)];
  }

  initGrid() {
    const gridSize = 15;
    this.grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

    const isHorizontal = Math.random() > 0.5;
    let placed = false;

    while (!placed) {
      const rowStart = Math.floor(Math.random() * gridSize);
      const colStart = Math.floor(Math.random() * gridSize);

      if (isHorizontal && colStart + this.selectedWord.length <= gridSize) {
        if (this.canPlaceWord(this.selectedWord, rowStart, colStart, 0, 1)) {
          for (let i = 0; i < this.selectedWord.length; i++) {
            this.grid[rowStart][colStart + i] = this.selectedWord[i];
            this.correctPositions.push(`${rowStart},${colStart + i}`);
          }
          placed = true;
        }
      } else if (!isHorizontal && rowStart + this.selectedWord.length <= gridSize) {
        if (this.canPlaceWord(this.selectedWord, rowStart, colStart, 1, 0)) {
          for (let i = 0; i < this.selectedWord.length; i++) {
            this.grid[rowStart + i][colStart] = this.selectedWord[i];
            this.correctPositions.push(`${rowStart + i},${colStart}`);
          }
          placed = true;
        }
      }
    }

    this.fillGrid(gridSize);
  }

  canPlaceWord(word, row, col, rowInc, colInc) {
    for (let i = 0; i < word.length; i++) {
      const currentRow = row + i * rowInc;
      const currentCol = col + i * colInc;
      if (this.grid[currentRow][currentCol] !== null) return false;
    }
    return true;
  }

  fillGrid(gridSize) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (this.grid[row][col] === null) {
          this.grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }

  handleCellClick(row, col) {
    console.log("FJKLDJSLKFJSDKLFJKLDSJJFDKLSJFKLDJSLKF")
    const position = `${row},${col}`;

    if (this.correctPositions.includes(position)) {
      if (!this.selectedPositions.has(position)) {
        this.selectedPositions.add(position);
        this.checkWin();
      }
    } else {
      const cell = this.shadowRoot.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
      cell.classList.add("incorrect");
    }
    this.render();
  }

  checkWin() {
    if (this.selectedPositions.size === this.correctPositions.length) {
      this.isWon = true;
    }
  }

  renderGrid() {
    // Im Render-Code
    let grid = this.grid.map((row, rowIndex) => {
      return row.map((letter, colIndex) => {
        return html`
          <div
              class="cell"
              data-row="${rowIndex}"
              data-col="${colIndex}"
              onclick="this.handleCellClick(${rowIndex}, ${colIndex})"
          >
            ${letter}
          </div>
        `;
      });
    });

    return html`
      <div id="grid">
        ${grid}
      </div>
    `;
  }

  render() {
    render(this.template(), this.shadowRoot);
  }

  template() {
    return html`
      <div id="wordsearch">
        <style>
          #wordsearch {
            font-family: 'Roboto', sans-serif;
            text-align: center;
            color: white;
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #555555;
            
          }

          #grid {
            display: grid;
            grid-template-columns: repeat(15, 1fr);
            gap: 0;
            margin: 20px auto;
            max-width: 600px;
          }

          .cell {
            width: 40px;
            height: 40px;
            background-color: white;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;
            cursor: pointer;
          }

          .cell.correct {
            background-color: #78fa41;
            color: white;
          }

          .cell.incorrect {
            background-color: #fa4141;
            color: white;
          }
        </style>

        <h1>Word Search</h1>
        <p>Find the word: <strong>${this.selectedWord}</strong></p>
        ${this.renderGrid()}

        ${this.isWon
            ? html`
              <won-game-component></won-game-component>`
            : ""}
      </div>
    `;

  }
}

customElements.define("wordsearch-component", WordsearchComponent);
