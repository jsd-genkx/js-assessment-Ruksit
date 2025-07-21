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

    // Replace with your own code //
    // Set the home position at (0, 0) before the game starts
    this.positionRow = 0;
    this.positionCol = 0;
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

  // Print field //
  print() {
    clear();

    // Replace with your own code //
    console.log(this.field); // Please REMOVE this line before you start your code!
  }
}
// Your Code //

move(direction);
{
  switch (direction) {
    case "l":
      this.moveLeft();
      break;
    case "r":
      this.moveRight();
      break;
    case "u":
      this.moveUp();
      break;
    case "d":
      this.moveDown();
      break;
    default:
      console.log("Invalid direction! Use 'l', 'r', 'u', or 'd'");
      break;
  }
}

moveLeft();
{
  this.positionCol--;
}

moveRight();
{
  this.positionCol++;
}

moveUp();
{
  this.positionRow--;
}

moveDown();
{
  this.positionRow++;
}
// Game Mode ON
// Remark: Code example below should be deleted and use your own code.
const newGame = new Field([
  ["░", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);
newGame.print();
