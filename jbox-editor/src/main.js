import {
  LOCAL_STORAGE_KEY,
  MAX_SPRITES,
  MAX_TILEMAP_SCREENS,
  SPRITE,
  TILEMAP,
  TILEMAP_SIZE,
  TILE_SIZE,
  MAX_SOUNDS,
  SOUND_SAMPLE_COUNT,
} from "./constants";
import { palette } from "./data";
import {
  getMousePos,
  updateSprite,
  changeSelectedSprite,
  download,
  drawSprite,
  soundEffect,
  getFrequency,
} from "./utils";
import { fixAudioContext } from "./audioContextPatch";

fixAudioContext(window);

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

  sfx: Array(MAX_SOUNDS)
    .fill(0)
    .map(() => ({
      tempo: 1,
      samples: Array(SOUND_SAMPLE_COUNT)
        .fill(0)
        .map(() => ({
          type: "sine",
          dist: 0,
          oct: 0,
          volume: 3,
          fx: null,
        })),
    })),
};

let appDataState = initialDataState;

console.log(appDataState);

// const spriteEdit = SpriteEdit(appDataState);

const appEditState = {
  mode: SPRITE,
  selectedImage: 0,
  selectedScreen: 0,
  selectedSound: 0,
  isDrawing: false,
  selectedColor: 5,
};

//#region selectors
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
 * SFX STUFF
 */

const actx = new AudioContext();
const playButton = document.querySelector(".play-button");
const tempoDisplay = document.querySelector(".tempo-number");
const tempoIncButton = document.querySelector(".tempo-increase");
const tempoDecButton = document.querySelector(".tempo-decrease");
const waveTypeButtons = document.querySelectorAll(".wave-button");
const fxButtons = document.querySelectorAll(".fx-button");
const soundCanvas = document.querySelector(".sound-paint");
const soundCanvasCtx = soundCanvas.getContext("2d");

//#endregion

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
  attachSfxListeners();

  document.addEventListener("mousedown", (e) => {
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

    if (appEditState.mode === TILEMAP) {
      updateMapPreview();
    }
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
      `var jb = jb || {}; jb._data = ${JSON.stringify({
        sprites: appDataState.sprites.flat(2),
        map: appDataState.tileMap.flat(2),
        sfx: appDataState.sfx,
      })}`
    );
  });

  clearButton.addEventListener("click", () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    appDataState = initialDataState;
    initDrawingSurfaces();
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
      initDrawingSurfaces();
      appEditState.mode = toggleMode;
    })
  );
}

function attachSpriteEditListeners() {
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
      contextList: [spritePreviewCtx, mapSpritePreviewCtx],
      state: appDataState,
      spriteEditState: appEditState,
      updateDrawingSurface,
    });
  });
}

function attachTilemapListeners() {
  mapSpritePreview.addEventListener("click", (e) => {
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

  mapDrawingSurface.addEventListener("mousemove", (e) => {
    const mousePos = getMousePos(e, mapDrawingSurface);
    drawOnMap(mousePos);
  });

  mapPreview.addEventListener("click", (e) => {
    const mousePos = getMousePos(e, mapPreview);
    const mapX = Math.floor(mousePos.x / (16 * 4));
    const mapY = Math.floor(mousePos.y / (16 * 4));
    const newScreenIndex = mapY * 8 + mapX;
    changeSelectedScreen(newScreenIndex);
  });
}

function attachSfxListeners() {
  playButton.addEventListener("click", () =>
    playSound(appEditState.selectedSound)
  );
  tempoIncButton.addEventListener("click", increaseTempo);
  tempoDecButton.addEventListener("click", decreaseTempo);
  soundCanvas.addEventListener("mousemove", (e) => {
    const mousePos = getMousePos(e, soundCanvas);
    drawSounds(mousePos);
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
  updateSfxPaint();
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
  const { selectedScreen } = appEditState;

  tileMap.forEach((screen, screenIndex) =>
    screen.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        const screenX = screenIndex % 8;
        const screenY = Math.floor(screenIndex / 8);

        mapPreviewCtx.fillStyle = palette[getMapDotColor(sprites[cell])];

        mapPreviewCtx.fillRect(
          screenX * 16 + cellIndex,
          screenY * 16 + rowIndex,
          1,
          1
        );
      })
    )
  );

  const markerX = selectedScreen % 8;
  const markerY = Math.floor(selectedScreen / 8);
  mapPreviewCtx.strokeStyle = palette[0];
  mapPreviewCtx.strokeRect(markerX * 16, markerY * 16, 16, 16);
}

function saveData() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appDataState));
}

function getMapDotColor(sprite) {
  const spriteDensity = sprite
    .flat()
    .map((cell) => (cell === 5 ? 0 : 1))
    .reduce((a, b) => a + b, 0);

  let color = 5;
  if (spriteDensity > 5 && spriteDensity < 20) {
    color = 4;
  } else if (spriteDensity >= 20 && spriteDensity < 36) {
    color = 3;
  } else if (spriteDensity >= 36 && spriteDensity < 50) {
    color = 2;
  } else if (spriteDensity >= 50) {
    color = 1;
  }
  return color;
}

function changeSelectedScreen(newScreen) {
  appEditState.selectedScreen = newScreen;

  updateMapPreview();
  updateMap();
}

function updateSfxPaint() {
  const { selectedSound } = appEditState;
  console.log(appDataState.sfx);
  const sound = appDataState.sfx[selectedSound];

  tempoDisplay.textContent = sound.tempo;

  soundCanvasCtx.fillStyle = palette[5];
  soundCanvasCtx.fillRect(0, 0, soundCanvas.width, soundCanvas.height);

  soundCanvasCtx.fillStyle = palette[2];

  sound.samples.forEach((sample, index) => {
    const x = index * 16;
    const y = 256;
    const h = sample.dist * 8 + 8;
    const w = 14;
    soundCanvasCtx.fillRect(x, y, w, -h);
  });
}

function increaseTempo() {
  const { selectedSound } = appEditState;
  const sound = appDataState.sfx[selectedSound];
  sound.tempo = Math.min(sound.tempo + 1, 32);
  tempoDisplay.textContent = sound.tempo;
}

function decreaseTempo() {
  const { selectedSound } = appEditState;
  const sound = appDataState.sfx[selectedSound];
  sound.tempo = Math.max(sound.tempo - 1, 1);
  tempoDisplay.textContent = sound.tempo;
}

function drawSounds({ x, y }) {
  if (!appEditState.isDrawing) {
    return;
  }
  if (y < 256) {
    const sampleIndex = Math.floor(x / 16);

    const { selectedSound } = appEditState;
    const sound = appDataState.sfx[selectedSound];
    const sample = sound.samples[sampleIndex];
    const sampleValue = Math.floor((256 - y) / 8);
    if (sample) {
      sample.dist = sampleValue;
      updateSfxPaint();
      saveData();
    }
  }
}

function playSound(soundIndex) {
  const sound = appDataState.sfx[soundIndex];
  const interval = sound.tempo / 48;

  for (let i = 0; i < sound.samples.length; i++) {
    const sample = sound.samples[i];
    let repeat = 1;

    for (let j = i + 1; j < sound.samples.length; j++) {
      const nextSample = sound.samples[j];
      if (!nextSample || nextSample.dist !== sample.dist) {
        break;
      }
      repeat++;
    }
    soundEffect(
      actx,
      getFrequency(sample.dist),
      sample.type,
      sample.volume,
      interval * i,
      interval * repeat,
      sample.fx,
      sound.samples[i + 1] ? sound.samples[i + 1].dist : null
    );
    i += repeat - 1;
  }
}
