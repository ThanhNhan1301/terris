// <---CONSTANT--->

const BRICK_SIZE = 29;
const COLS = 11;
const ROWS = 19;
const COLORS_MAPPING = [
  "#400D51",
  "#D800A6",
  "#CC3636",
  "#FFDE00",
  "#D6CDA4",
  "#E38B29",
  "#FFD39A",
  "white",
];
const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];
const WHITE_BRICK = 7;
const GRID_LINE_COLOR = "#F1EFDC";

// <---CONTENT--->

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Board {
  start() {
    ctx.canvas.width = BRICK_SIZE * COLS;
    ctx.canvas.height = BRICK_SIZE * ROWS;
  }

  drawCell({ row, col, color = COLORS_MAPPING[WHITE_BRICK] }) {
    ctx.fillStyle = color;
    ctx.fillRect(col * BRICK_SIZE, row * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    ctx.strokeStyle = GRID_LINE_COLOR;
    ctx.strokeRect(col * BRICK_SIZE, row * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
  }

  drawBoard() {
    for (let row = 0; row < Array(ROWS).length; row++) {
      for (let col = 0; col < Array(COLS).length; col++) {
        this.drawCell({ row, col });
      }
    }
  }
}

class Brick {
  constructor({
    row,
    col,
    color = COLORS_MAPPING[WHITE_BRICK],
    layout = BRICK_LAYOUT[0],
    vector = 0,
  }) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.layout = layout;
    this.vector = vector;
  }

  drawCell({ row, col, color = COLORS_MAPPING[WHITE_BRICK] }) {
    ctx.fillStyle = color;
    ctx.fillRect(col * BRICK_SIZE, row * BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
  }

  drawBrick() {
    for (let i = 0; i < this.layout[this.vector].length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[this.vector][i][j] !== WHITE_BRICK) {
          if (!this.positionLeft) {
            this.positionLeft = j;
          } else {
            if (j - this.positionLeft <= 0) {
              this.positionLeft = j;
            }
          }

          if (!this.positionRight) {
            this.positionRight = j + 1;
          } else {
            if (j - this.positionRight >= 0) {
              this.positionRight = j + 1;
            }
          }

          this.drawCell({
            row: i + this.row,
            col: j + this.col,
            color: this.color,
          });
        }
      }
    }
  }

  clear() {
    for (let i = 0; i < this.layout[this.vector].length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        ctx.fillStyle = COLORS_MAPPING[WHITE_BRICK];
        ctx.fillRect(
          (this.col + i) * BRICK_SIZE,
          (this.row + j) * BRICK_SIZE,
          BRICK_SIZE,
          BRICK_SIZE
        );
        ctx.strokeStyle = GRID_LINE_COLOR;
        ctx.strokeRect(
          (this.col + i) * BRICK_SIZE,
          (this.row + j) * BRICK_SIZE,
          BRICK_SIZE,
          BRICK_SIZE
        );
      }
    }
  }

  checkCollision(nextRow, nextCol, nextLayout) {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_BRICK && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS
          )
            return true;
        }
      }
    }

    return false;
  }

  moveLeft() {
    if (
      !this.checkCollision(this.row, this.col - 1, this.layout[this.vector])
    ) {
      this.clear();
      this.col = this.col - 1;
      this.drawBrick();
    }
  }

  moveRight() {
    if (
      !this.checkCollision(this.row, this.col + 1, this.layout[this.vector])
    ) {
      this.clear();
      this.col = this.col + 1;
      this.drawBrick();
    }
  }

  moveDown() {
    this.clear();
    this.row = this.row + 1;
    this.drawBrick();
  }

  rotate() {
    const nextVector = this.vector + 1 > 3 ? 0 : this.vector + 1;
    if (!this.checkCollision(this.row, this.col, this.layout[nextVector])) {
      this.clear();
      this.vector = nextVector;
      this.drawBrick();
    }
  }
}

// <--- TEST --->
const board = new Board(ctx);
const brick = new Brick({
  row: 2,
  col: 2,
  color: COLORS_MAPPING[4],
  layout: BRICK_LAYOUT[4],
  vector: 0,
});

board.start();
board.drawBoard();
brick.drawBrick();

// <--- CONTROLS --->

const e = document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      brick.moveLeft();
      break;
    case "ArrowRight":
      brick.moveRight();
      break;
    case "ArrowDown":
      brick.moveDown();
      break;
    case "ArrowUp":
      brick.rotate();
      break;
    default:
      break;
  }
});
