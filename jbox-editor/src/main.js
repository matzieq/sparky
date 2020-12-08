import {
  LOCAL_STORAGE_KEY,
  MAX_SPRITES,
  MAX_TILEMAP_SCREENS,
  SPRITE,
  TILEMAP_SIZE,
  TILE_SIZE,
} from "./constants";
import { palette } from "./data";
import {
  getMousePos,
  updateSprite,
  changeSelectedSprite,
  download,
  drawSprite,
} from "./utils";

const initialDataState = {
  sprites: Array(MAX_SPRITES)
    .fill(0)
    .map(() =>
      Array(TILE_SIZE)
        .fill(0)
        .map(() => Array(TILE_SIZE).fill(5))
    ),
  tileMap: Array(MAX_TILEMAP_SCREENS)
    .fill(0)
    .map(() =>
      Array(TILEMAP_SIZE)
        .fill(0)
        .map(() => Array(TILEMAP_SIZE).fill(0))
    ),
};

let appDataState = initialDataState;

// const spriteEdit = SpriteEdit(appDataState);

const appEditState = {
  mode: SPRITE,
  selectedImage: 0,
  selectedScreen: 0,
  isDrawing: false,
  selectedColor: 5,
};

/**
 * CONTROL STUFF
 */

const sections = document.querySelectorAll(".section");
const controlButtons = document.querySelectorAll(".control-button");
const downloadButton = document.querySelector(".download-button");
const clearButton = document.querySelector(".clear-button");

/**
 * SPRITE EDIT STUFF
 */
const cells = document.querySelectorAll(".draw-grid-cell");
const colorButtons = document.querySelectorAll(".color-button");
const currentColor = document.querySelector(".current-color");
const spritePreview = document.querySelector(".sprite-preview");
const spritePreviewCtx = spritePreview.getContext("2d");

/**
 * MAP STUFF
 */

const mapDrawingSurface = document.querySelector(".map-drawing-surface");
const mapDrawingSurfaceCtx = mapDrawingSurface.getContext("2d");

const mapSpritePreview = document.querySelector(".sprite-list");
const mapSpritePreviewCtx = mapSpritePreview.getContext("2d");

const mapPreview = document.querySelector(".tilemap-preview");
const mapPreviewCtx = mapPreview.getContext("2d");

/**
 * GET MOVING YOU INFERNAL MACHINE
 */

init();

/**
 * FUNCTIONS
 */

function init() {
  spritePreviewCtx.scale(5, 5);
  mapSpritePreviewCtx.scale(5, 5);
  mapDrawingSurfaceCtx.scale(4, 4);
  mapPreviewCtx.scale(4, 4);

  attachControlListeners();
  attachSpriteEditListeners();
  attachTilemapListeners();

  document.addEventListener("mousedown", e => {
    appEditState.isDrawing = true;
    if (Array.from(cells).indexOf(e.target) > 0) {
      enableDrawing(e.target);
    }

    if (e.target.classList.contains("map-drawing-surface")) {
      const mousePos = getMousePos(e, mapDrawingSurface);
      drawOnMap(mousePos);
    }
  });

  document.addEventListener("mouseup", () => {
    appEditState.isDrawing = false;
    updateMapPreview();
  });

  const appData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (appData) {
    appDataState = appData;
  }

  initDrawingSurfaces();
}

function attachControlListeners() {
  downloadButton.addEventListener("click", () => {
    download(
      "data.js",
      `var data = ${JSON.stringify({
        sprites: appDataState.sprites.flat(2),
        map: appDataState.tileMap.flat(2),
      })}`
    );
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    appDataState = initialDataState;
    initDrawingSurfaces();
  });

  controlButtons.forEach(button =>
    button.addEventListener("click", () => {
      controlButtons.forEach(btn => btn.classList.remove("btn-active"));
      sections.forEach(section => section.classList.remove("section-active"));

      const toggleMode = button.dataset.activate;
      button.classList.add("btn-active");

      Array.from(sections)
        .find(section => section.id === toggleMode)
        .classList.add("section-active");
      initDrawingSurfaces();
    })
  );
}

function attachSpriteEditListeners() {
  cells.forEach(cell =>
    cell.addEventListener("mouseover", () => enableDrawing(cell))
  );

  colorButtons.forEach((button, i) =>
    button.addEventListener("click", e => {
      appEditState.selectedColor = i;
      currentColor.style.backgroundColor = palette[i];
    })
  );

  spritePreview.addEventListener("click", e => {
    const mousePos = getMousePos(e, spritePreview);
    const spriteIndex =
      Math.floor(mousePos.y / 40) * 8 + Math.floor(mousePos.x / 40);
    changeSelectedSprite({
      newSprite: spriteIndex,
      contextList: [spritePreviewCtx, mapSpritePreviewCtx],
      state: appDataState,
      spriteEditState: appEditState,
      updateDrawingSurface,
    });
  });
}

function attachTilemapListeners() {
  mapSpritePreview.addEventListener("click", e => {
    const mousePos = getMousePos(e, mapSpritePreview);
    const spriteIndex =
      Math.floor(mousePos.y / 40) * 8 + Math.floor(mousePos.x / 40);
    changeSelectedSprite({
      newSprite: spriteIndex,
      contextList: [spritePreviewCtx, mapSpritePreviewCtx],
      state: appDataState,
      spriteEditState: appEditState,
      updateDrawingSurface,
    });
  });

  mapDrawingSurface.addEventListener("mousemove", e => {
    const mousePos = getMousePos(e, mapDrawingSurface);
    drawOnMap(mousePos);
  });
}

function initDrawingSurfaces() {
  fillPalette();
  changeSelectedSprite({
    newSprite: 0,
    contextList: [spritePreviewCtx, mapSpritePreviewCtx],
    state: appDataState,
    spriteEditState: appEditState,
    updateDrawingSurface,
  });
  updateMap();
  updateMapPreview();
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
    saveData();
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

function drawOnMap({ x, y }) {
  const { isDrawing, selectedImage, selectedScreen } = appEditState;
  if (isDrawing) {
    const mapX = Math.floor(x / 32);
    const mapY = Math.floor(y / 32);

    if (mapX >= 0 && mapX < 16 && mapY >= 0 && mapY < 16) {
      const mapCell = appDataState.tileMap[selectedScreen][mapY][mapX];
      if (mapCell != selectedImage) {
        appDataState.tileMap[selectedScreen][mapY][mapX] = selectedImage;
        const sprite = appDataState.sprites[selectedImage];
        drawSprite(sprite, mapDrawingSurfaceCtx, mapX * 8, mapY * 8);
        saveData();
      }
    }
  }
}

function updateMap() {
  const { selectedScreen } = appEditState;
  const mapChunk = appDataState.tileMap[selectedScreen];

  mapChunk.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      const x = cellIndex * 8;
      const y = rowIndex * 8;
      const sprite = appDataState.sprites[cell];

      drawSprite(sprite, mapDrawingSurfaceCtx, x, y);
    })
  );
}

function updateMapPreview() {
  const { tileMap, sprites } = appDataState;

  tileMap.forEach((screen, screenIndex) =>
    screen.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        const screenX = screenIndex % 8;
        const screenY = Math.floor(screenIndex / 8);
        if (!isSpriteEmpty(sprites[cell])) {
          mapPreviewCtx.fillStyle = palette[3];
        } else {
          mapPreviewCtx.fillStyle = palette[5];
        }
        mapPreviewCtx.fillRect(
          screenX * 16 + cellIndex,
          screenY * 16 + rowIndex,
          1,
          1
        );
      })
    )
  );
}

function saveData() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appDataState));
}

function isSpriteEmpty(sprite) {
  return sprite.flat().every(el => el === 5);
}
