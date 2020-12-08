import { DRAW, ERASE, LOCAL_STORAGE_KEY, SPRITE } from "./src/constants";
import { palette } from "./src/data";
import {
  getMousePos,
  updateSprite,
  changeSelectedSprite,
  download,
} from "./src/utils";
import SpriteEdit from "./src/components/SpriteEdit";

let appDataState = {
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

// const spriteEdit = SpriteEdit(appDataState);

const appEditState = {
  mode: SPRITE,
  selectedImage: 0,
  isDrawing: false,
  selectedColor: 5,
};

const cells = document.querySelectorAll(".draw-grid-cell");

const colorButtons = document.querySelectorAll(".color-button");
const currentColor = document.querySelector(".current-color");
const spritePreview = document.querySelector(".sprite-preview");
const spritePreviewCtx = spritePreview.getContext("2d");
const downloadButton = document.querySelector(".download-button");

const sections = document.querySelectorAll(".section");
const controlButtons = document.querySelectorAll(".control-button");

init();
fillPalette();
changeSelectedSprite({
  newSprite: 0,
  ctx: spritePreviewCtx,
  state: appDataState,
  spriteEditState: appEditState,
  updateDrawingSurface,
});

function init() {
  spritePreviewCtx.scale(5, 5);

  document.addEventListener("mousedown", (e) => {
    appEditState.isDrawing = true;
    if (Array.from(cells).indexOf(e.target) > 0) {
      enableDrawing(e.target);
    }
  });
  document.addEventListener("mouseup", () => (appEditState.isDrawing = false));

  cells.forEach((cell) =>
    cell.addEventListener("mouseover", () => enableDrawing(cell))
  );

  colorButtons.forEach((button, i) =>
    button.addEventListener("click", (e) => {
      appEditState.selectedColor = i;
      currentColor.style.backgroundColor = palette[i];
    })
  );

  spritePreview.addEventListener("click", (e) => {
    const mousePos = getMousePos(e, spritePreview);
    const spriteIndex =
      Math.floor(mousePos.y / 40) * 8 + Math.floor(mousePos.x / 40);
    changeSelectedSprite({
      newSprite: spriteIndex,
      ctx: spritePreviewCtx,
      state: appDataState,
      spriteEditState: appEditState,
      updateDrawingSurface,
    });
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

  controlButtons.forEach((button) =>
    button.addEventListener("click", () => {
      controlButtons.forEach((btn) => btn.classList.remove("btn-active"));
      sections.forEach((section) => section.classList.remove("section-active"));

      const toggleMode = button.dataset.activate;
      button.classList.add("btn-active");

      Array.from(sections)
        .find((section) => section.id === toggleMode)
        .classList.add("section-active");
    })
  );

  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));

  const appData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (appData) {
    appDataState = appData;
  }
}

function enableDrawing(cell) {
  const { isDrawing, selectedColor, selectedImage } = appEditState;
  if (isDrawing) {
    const cellNumber = Array.from(cells).indexOf(cell);
    const x = cellNumber % 8;
    const y = Math.floor(cellNumber / 8);
    appDataState.sprites[selectedImage][y][x] = selectedColor;

    updateSprite(selectedImage, spritePreviewCtx, appDataState);
    updateDrawingSurface(selectedImage);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appDataState));
  }
}

function fillPalette() {
  colorButtons.forEach((button, i) => {
    button.style.backgroundColor = palette[i];
  });
}

function updateDrawingSurface(spriteIndex) {
  const sprite = appDataState.sprites[spriteIndex];

  const pixels = sprite.flat(2);

  cells.forEach((cell, index) => {
    cell.style.backgroundColor = palette[pixels[index]];
  });
}
