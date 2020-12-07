const palette = [
  "#fbf5ef",
  "#f2d3ab",
  "#c69fa5",
  "#8b6d9c",
  "#494d7e",
  "#272744",
];
const appDataState = {
  sprites: Array(64).fill(Array(8).fill(Array(8).fill(palette[5]))),
};

const spriteEditState = {
  selectedImage: 0,
  currentMode: DRAW,
  isDrawing: false,
};

const grid = document.querySelector(".draw-grid");
const cells = document.querySelectorAll(".draw-grid-cell");
const drawButton = document.querySelector(".button-draw");
const eraseButton = document.querySelector(".button-erase");
const colorButtons = document.querySelectorAll(".color-button");
console.log(cells);
console.log(grid);

console.log(appDataState);

window.addEventListener("mousedown", () => (spriteEditState.isDrawing = true));
window.addEventListener("mouseup", () => (spriteEditState.isDrawing = false));

cells.forEach((cell) =>
  cell.addEventListener("mouseover", () => enableDrawing(cell))
);

drawButton.addEventListener("click", () => {
  spriteEditState.currentMode = DRAW;
  eraseButton.style.opacity = 0.5;
  drawButton.style.opacity = 1;
});
eraseButton.addEventListener("click", () => {
  spriteEditState.currentMode = ERASE;
  drawButton.style.opacity = 0.5;
  eraseButton.style.opacity = 1;
});

fillDrawGrid();
fillPalette();

function enableDrawing(cell) {
  if (spriteEditState.isDrawing) {
    switch (spriteEditState.currentMode) {
      case DRAW:
        cell.style.backgroundColor = palette[0];
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
  sprite.forEach((row) =>
    row.forEach((cell) => {
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
