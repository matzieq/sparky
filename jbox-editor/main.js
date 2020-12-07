import { DRAW, ERASE } from "./src/constants";
import { palette } from "./src/data";
const appDataState = {
  sprites: Array(64)
    .fill(0)
    .map(() =>
      Array(8)
        .fill(0)
        .map(() => Array(8).fill(5))
    ),
  tileMap: Array(64)
    .fill(0)
    .map(() =>
      Array(16)
        .fill(0)
        .map(() => Array(16).fill(0))
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
const downloadButton = document.querySelector(".download-button");
ctx.scale(5, 5);

window.addEventListener("mousedown", e => {
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

spritePreview.addEventListener("click", e => {
  const mousePos = getMousePos(e);
  const spriteIndex = mousePos.y * 8 + mousePos.x;
  changeSelectedSprite(spriteIndex);
});

downloadButton.addEventListener("click", () => {
  download(
    "data.json",
    JSON.stringify({
      sprites: appDataState.sprites.flat(2),
      map: appDataState.tileMap.flat(2),
    })
  );
});

fillDrawGrid();
fillPalette();
changeSelectedSprite(0);

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
        // cell.style.backgroundColor = palette[selectedColor];
        const cellNumber = Array.from(cells).indexOf(cell);
        const x = cellNumber % 8;
        const y = Math.floor(cellNumber / 8);
        appDataState.sprites[selectedImage][y][x] = selectedColor;

        updateSprite(selectedImage);
        updateDrawingSurface(selectedImage);
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
      cells.item(currentCell).style.backgroundColor = palette[cell];
      currentCell++;
    })
  );
}

function fillPalette() {
  colorButtons.forEach((button, i) => {
    button.style.backgroundColor = palette[i];
  });
}

function updateSprite(spriteIndex) {
  const sprite = appDataState.sprites[spriteIndex];

  const spriteRow = Math.floor(spriteIndex / 8);
  const spriteCol = spriteIndex % 8;

  sprite.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      ctx.fillStyle = palette[cell];
      ctx.fillRect(spriteCol * 8 + cellIndex, spriteRow * 8 + rowIndex, 1, 1);
    })
  );
}

function updateDrawingSurface(spriteIndex) {
  const sprite = appDataState.sprites[spriteIndex];

  const pixels = sprite.flat(2);

  cells.forEach((cell, index) => {
    cell.style.backgroundColor = palette[pixels[index]];
  });
}

function changeSelectedSprite(newSprite) {
  appDataState.sprites.forEach((_, index) => updateSprite(index));
  spriteEditState.selectedImage = newSprite;

  const spriteRow = Math.floor(newSprite / 8);
  const spriteCol = newSprite % 8;

  ctx.strokeStyle = palette[0];
  ctx.lineWidth = 1;
  ctx.strokeRect(spriteCol * 8, spriteRow * 8, 8, 8);
  updateDrawingSurface(newSprite);
}

function getMousePos(e) {
  const rect = spritePreview.getBoundingClientRect();

  return {
    x: Math.floor((e.clientX - rect.left) / 40),
    y: Math.floor((e.clientY - rect.top) / 40),
  };
}

function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
