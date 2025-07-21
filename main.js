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
    this.gameOver = false;
    // this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

  //สร้างสนามในการเล่นแบบสุ่ม
  static createField(holes, rows, cols) {
    const field = [];
    const len = rows * cols;
    const dimension = new Array(len).fill(fieldCharacter);

    //สุ่ม วางหลุม
    for (let i = 0; i < holes; i++) {
      let holeIndex;
      do {
        holeIndex = Math.floor(Math.random() * len);
      } while (dimension[holeIndex] === hole);
      dimension[holeIndex] = hole;
    }

    //สุ่ม วางหมวก
    let hatIndex;
    do {
      hatIndex = Math.floor(Math.random() * len);
    } while (dimension[hatIndex] === hole);
    dimension[hatIndex] = hat;

    // จัดเรียงเป็น 2D array
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(dimension.pop());
      }
      field.push(row);
    }
    return field;
  }

  // Print field //
  print() {
    clear();
    for (let row of this.field) {
      console.log(row.join(""));
    }
  }

  //อัพเดทเส้นทาง Path
  updatePath() {
    this.field[this.positionRow][this.positionCol] = fieldCharacter;
  }
  // Replace with your own code //
  //console.log(this.field); // Please REMOVE this line before you start your code!

  // Your Code //
  createActor() {
    const row = Math.floor(Math.random() * this.field.length);
    const column = Math.floor(Math.random() * this.field[0].length);
    this.positionRow = row;
    this.positionCol = column;
    this.field[this.positionRow][this.positionCol] = pathCharacter;
  }

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
    //เช็คสถานะการเดินตกขอบ
    const maxRow = this.field.length;
    const maxCol = this.field[0].length;

    if (
      this.positionRow < 0 ||
      this.positionRow >= maxRow ||
      this.positionCol < 0 ||
      this.positionCol >= maxCol
    ) {
      this.gameOver = true;
      console.log("You out of the way !");
      return;
    }

    // เช็คว่าเดินไปเจอหลุม
    const CurrentBlock = this.field[this.positionRow][this.positionCol];
    if (CurrentBlock === hole) {
      this.gameOver = true;
      console.log("You fell into the hole");
    }

    if (CurrentBlock === hat) {
      this.gameOver = true;
      console.log("Congrats, You found the hat");
    }
  }

  //Start Game
  runner() {
    this.createActor();
    while (!this.gameOver) {
      this.print();
      const way = prompt("Which way? (w/a/s/d): ");
      this.move(way);
      this.checkGameState();
      this.updatePath();
    }
//   }

}

const newGame = new Field(Field.createField(2, 3, 3));

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
