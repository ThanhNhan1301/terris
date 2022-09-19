// <---CONSTANT--->

const BRICK_SIZE = 20;
const COLS = 15;
const ROWS = 27;
const COLORS_MAPPING = [
  "#400D51",
  "#D800A6",
  "#CC3636",
  "#FFDE00",
  "#87A2FB",
  "#E38B29",
  "#367E18",
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
const WHITE_BRICK_ID = 7;
const GRID_LINE_COLOR = "#F1F1F1";

// <---SETUP APP--->

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");

// <--- FUNCTION HELPER --->

function generalLayoutActive() {
  return Math.floor(Math.random() * 10) % BRICK_LAYOUT[0].length;
}

function generalLayout() {
  return BRICK_LAYOUT[Math.floor(Math.random() * 10) % BRICK_LAYOUT.length];
}

function generalColorId() {
  return Math.floor(Math.random() * 10) % (COLORS_MAPPING.length - 1);
}

// <--- GENERAL BOARD --->
class Board {
  constructor() {
    ctx.canvas.width = COLS * BRICK_SIZE;
    ctx.canvas.height = ROWS * BRICK_SIZE;
    this.grid = this.generalGrid();
    this.score = 0;
  }

  updateScore() {
    score.innerText = this.score;
  }

  generalGrid() {
    return Array.from({ length: ROWS }).map(() =>
      Array(COLS).fill(WHITE_BRICK_ID)
    );
  }

  drawCell(xAxis, yAxis, colorId = WHITE_BRICK_ID) {
    ctx.fillStyle = COLORS_MAPPING[colorId];
    ctx.fillRect(
      xAxis * BRICK_SIZE,
      yAxis * BRICK_SIZE,
      BRICK_SIZE,
      BRICK_SIZE
    );

    this.drawStroke(xAxis, yAxis);
  }

  drawStroke(xAxis, yAxis) {
    ctx.strokeStyle = GRID_LINE_COLOR;
    ctx.strokeRect(
      xAxis * BRICK_SIZE,
      yAxis * BRICK_SIZE,
      BRICK_SIZE,
      BRICK_SIZE
    );
  }

  drawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.drawCell(col, row, this.grid[row][col]);
      }
    }
  }

  checkedCompleteRow() {
    for (let row = 0; row < this.grid.length; row++) {
      const isComplete = this.grid[row].every((i) => i !== WHITE_BRICK_ID);
      if (isComplete) {
        this.score++;
        board.updateScore();
      }
    }
  }
}

const board = new Board();
board.drawBoard();

class Brick {
  constructor(colPos, rowPos, layout, active, colorId) {
    this.colPos = colPos;
    this.rowPos = rowPos;
    this.layout = layout;
    this.active = active;
    this.colorId = colorId;
  }

  drawBrick() {
    const layoutActive = this.layout[this.active];
    for (let row = 0; row < layoutActive.length; row++) {
      for (let col = 0; col < layoutActive[0].length; col++) {
        if (layoutActive[row][col] !== WHITE_BRICK_ID) {
          board.drawCell(this.colPos + col, this.rowPos + row, this.colorId);
        }
      }
    }
  }

  clear() {
    const layoutActive = this.layout[this.active];
    for (let row = 0; row < layoutActive.length; row++) {
      for (let col = 0; col < layoutActive[0].length; col++) {
        if (layoutActive[row][col] !== WHITE_BRICK_ID) {
          board.drawCell(this.colPos + col, this.rowPos + row, 7);
        }
      }
    }
  }

  checkCollision(nextCol, nextRow, nextLayout) {
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[0].length; col++) {
        if (nextLayout[row][col] !== WHITE_BRICK_ID && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= COLS ||
            row + nextRow >= ROWS ||
            board.grid[row + nextRow][col + nextCol] !== WHITE_BRICK_ID
          )
            return true;
        }
      }
    }
    return false;
  }

  moveLeft() {
    if (
      !this.checkCollision(
        this.colPos - 1,
        this.rowPos,
        this.layout[this.active]
      )
    ) {
      this.clear();
      this.colPos--;
      this.drawBrick();
    }
  }

  moveRight() {
    if (
      this.checkCollision(
        this.colPos + 1,
        this.rowPos,
        this.layout[this.active]
      )
    )
      return;
    this.clear();
    this.colPos++;
    this.drawBrick();
  }

  moveDown() {
    if (
      !this.checkCollision(
        this.colPos,
        this.rowPos + 1,
        this.layout[this.active]
      )
    ) {
      this.clear();
      this.rowPos++;
      this.drawBrick();
      return;
    }
    this.handleLanded();
    generalNewBrick();
  }

  rotate() {
    const nextLayoutActive = this.active + 1 > 3 ? 0 : this.active + 1;
    if (
      this.checkCollision(
        this.colPos,
        this.rowPos,
        this.layout[nextLayoutActive]
      )
    )
      return;
    this.clear();
    this.active = nextLayoutActive;
    this.drawBrick();
  }

  handleLanded() {
    const layoutActive = this.layout[this.active];
    for (let row = 0; row < layoutActive.length; row++) {
      for (let col = 0; col < layoutActive[0].length; col++) {
        if (layoutActive[row][col] !== WHITE_BRICK_ID) {
          board.grid[row + this.rowPos][col + this.colPos] = this.colorId;
          board.drawBoard();
          board.checkedCompleteRow();
        }
      }
    }
  }
}

let brick = new Brick(
  6,
  0,
  generalLayout(),
  generalLayoutActive(),
  generalColorId()
);

brick.drawBrick();

function generalNewBrick() {
  brick = new Brick(
    6,
    0,
    generalLayout(),
    generalLayoutActive(),
    generalColorId()
  );
  brick.drawBrick();
}

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

document
  .getElementById("rotate")
  ?.addEventListener("click", () => brick.rotate());
document
  .getElementById("left")
  ?.addEventListener("click", () => brick.moveLeft());
document
  .getElementById("right")
  ?.addEventListener("click", () => brick.moveRight());
document
  .getElementById("down")
  ?.addEventListener("click", () => brick.moveDown());

// <--- TEST --->
