import { DRAW, ERASE } from "./src/constants";
import { palette } from "./src/data";
const appDataState = {
  sprites: Array(64)
    .fill(0)
    .map(sprite =>
      Array(8)
        .fill(0)
        .map(row => Array(8).fill(palette[5]))
    ),
};

const spriteEditState = {
  selectedImage: 0,
  currentMode: DRAW,
  isDrawing: false,
  selectedColor: 5,
};

const grid = document.querySelector(".draw-grid");
const cells = document.querySelectorAll(".draw-grid-cell");

const colorButtons = document.querySelectorAll(".color-button");
const currentColor = document.querySelector(".current-color");
const spritePreview = document.querySelector(".sprite-preview");
const ctx = spritePreview.getContext("2d");
ctx.scale(4, 4);

console.log(spritePreview, ctx);

console.log(grid);

console.log(appDataState);

window.addEventListener("mousedown", e => {
  console.log(e.target);
  spriteEditState.isDrawing = true;
  if (Array.from(cells).indexOf(e.target) > 0) {
    enableDrawing(e.target);
  }
});
window.addEventListener("mouseup", () => (spriteEditState.isDrawing = false));

cells.forEach(cell =>
  cell.addEventListener("mouseover", () => enableDrawing(cell))
);

colorButtons.forEach((button, i) =>
  button.addEventListener("click", e => {
    spriteEditState.selectedColor = i;
    currentColor.style.backgroundColor = palette[i];
  })
);

fillDrawGrid();
fillPalette();

function enableDrawing(cell) {
  const {
    isDrawing,
    currentMode,
    selectedColor,
    selectedImage,
  } = spriteEditState;
  if (isDrawing) {
    switch (currentMode) {
      case DRAW:
        cell.style.backgroundColor = palette[selectedColor];
        var cellNumber = Array.from(cells).indexOf(cell);
        var x = cellNumber % 8;
        var y = Math.floor(cellNumber / 8);
        appDataState.sprites[selectedImage][y][x] = palette[selectedColor];
        console.log(appDataState.sprites[selectedImage][y][x]);
        console.log(appDataState.sprites);

        fillCanvas();
        break;
      case ERASE:
        cell.style.backgroundColor = palette[5];
        break;
      default:
        break;
    }
  }
}

function fillDrawGrid() {
  const sprite = appDataState.sprites[spriteEditState.selectedImage];

  let currentCell;
  sprite.forEach(row =>
    row.forEach(cell => {
      cells.item(currentCell).style.backgroundColor = cell;
      currentCell++;
    })
  );

  // console.log(drawGrid);

  // grid.innerHTML = drawGrid;
}

function fillPalette() {
  colorButtons.forEach((button, i) => {
    button.style.backgroundColor = palette[i];
  });
}

function fillCanvas() {
  const { selectedImage: spriteIndex } = spriteEditState;
  const sprite = appDataState.sprites[spriteIndex];

  const spriteRow = Math.floor(spriteIndex / 8);
  const spriteCol = spriteIndex % 8;

  ctx.fillStyle = palette[5];
  ctx.fillRect(spriteRow, spriteCol, 8, 8);

  // console.log(spriteRow, spriteCol);
  sprite.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      // console.log(cell);
      ctx.fillStyle = cell;
      ctx.fillRect(spriteCol * 8 + cellIndex, spriteRow * 8 + rowIndex, 1, 1);
    })
  );
}
