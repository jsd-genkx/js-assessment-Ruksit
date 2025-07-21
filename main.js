"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;

    // Set the home position at (0, 0) before the game starts
    this.positionRow = 0;
    this.positionCol = 0;
    this.gameOver = false;
  }

  //  Create the game field
  static createField(holes, rows, cols) {
    const field = [];
    const len = rows * cols;
    const dimension = new Array(len).fill(fieldCharacter);

    // Randomly spawn holes
    for (let i = 0; i < holes; i++) {
      const holeIndex = Math.floor(Math.random() * len);
      dimension[holeIndex] = hole;
    }

    // Randomly spawn hat
    const hatIndex = Math.floor(Math.random() * len);
    dimension[hatIndex] = hat;

    // Convert 1d array to  2d array
    for (let i = 0; i < rows; i++) {
      const rowData = [];
      for (let j = 0; j < cols; j++) {
        rowData.push(dimension.pop());
      }
      field.push(rowData);
    }
    return field;
  }

  // Print field //
  print() {
    clear();
    for (let rows of this.field) {
      console.log(rows);
    }
  }

  // Replace with your own code //
  //console.log(this.field); // Please REMOVE this line before you start your code!

  // Your Code //

  // Move direction button
  move(direction) {
    switch (direction.toLowerCase()) {
      case "a":
        this.moveLeft();
        break;
      case "d":
        this.moveRight();
        break;
      case "w":
        this.moveUp();
        break;
      case "s":
        this.moveDown();
        break;
      default:
        console.log("Invalid direction! Use 'a', 'd', 'w', or 's'");
        break;
    }
  }

  moveLeft() {
    this.positionCol--;
  }

  moveRight() {
    this.positionCol++;
  }

  moveUp() {
    this.positionRow--;
  }

  moveDown() {
    this.positionRow++;
  }

  checkGameState() {
    // Outside the field check
    const maxRow = this.field.length;
    const maxCol = this.field[0].length;

    if (
      this.positionRow < 0 ||
      this.positionRow >= maxRow ||
      this.positionCol < 0 ||
      this.positionCol >= maxCol
    ) {
      this.gameOver = true;
      console.log(`Attempts to move "outside" the field.`);
      return;
    }

    // Found the hole check
    const CurrentBlock = this.field[this.positionRow][this.positionCol];
    if (CurrentBlock === hole) {
      this.gameOver = true;
      console.log("Loses by landing on (and falling in) a hole.");
    }
    // Found the hat check
    if (CurrentBlock === hat) {
      this.gameOver = true;
      console.log("Wins by finding their hat.");
    }
  }

  updatePath() {
    if (!this.gameOver) {
      this.field[this.positionRow][this.positionCol] = pathCharacter;
    }
  }

  createActor() {
    const row = Math.floor(Math.random() * this.field.length);
    const column = Math.floor(Math.random() * this.field[0].length);
    this.positionRow = row;
    this.positionCol = column;
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

  //Start Game
  runner() {
    this.createActor();
    while (!this.gameOver) {
      this.print();
      const way = prompt("Which way ? : ");
      this.move(way); // move("u")
      this.checkGameState();
      this.updatePath();
    }
  }
}

// Create new game field
const newGame = new Field(Field.createField(2, 3, 3)); // holes, rows, cols

newGame.runner();

//
// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
// const newGame = new Field([
//   ["░", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
// ]);
// newGame.print();
