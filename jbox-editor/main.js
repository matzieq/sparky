import { DRAW, ERASE } from "./src/constants";
import { palette } from "./src/data";
import {
  getMousePos,
  updateSprite,
  changeSelectedSprite,
  download,
} from "./src/utils";
import SpriteEdit from "./src/components/SpriteEdit";

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

const spriteEdit = SpriteEdit(appDataState);

// const spriteEditState = {
//   selectedImage: 0,
//   currentMode: DRAW,
//   isDrawing: false,
//   selectedColor: 5,
// };

// const cells = document.querySelectorAll(".draw-grid-cell");

// const colorButtons = document.querySelectorAll(".color-button");
// const currentColor = document.querySelector(".current-color");
// const spritePreview = document.querySelector(".sprite-preview");
// const spritePreviewCtx = spritePreview.getContext("2d");
// const downloadButton = document.querySelector(".download-button");
// spritePreviewCtx.scale(5, 5);

// document.addEventListener("mousedown", (e) => {
//   spriteEditState.isDrawing = true;
//   if (Array.from(cells).indexOf(e.target) > 0) {
//     enableDrawing(e.target);
//   }
// });
// document.addEventListener("mouseup", () => (spriteEditState.isDrawing = false));

// cells.forEach((cell) =>
//   cell.addEventListener("mouseover", () => enableDrawing(cell))
// );

// colorButtons.forEach((button, i) =>
//   button.addEventListener("click", (e) => {
//     spriteEditState.selectedColor = i;
//     currentColor.style.backgroundColor = palette[i];
//   })
// );

// spritePreview.addEventListener("click", (e) => {
//   const mousePos = getMousePos(e, spritePreview);
//   const spriteIndex = mousePos.y * 8 + mousePos.x;
//   changeSelectedSprite(spriteIndex, spritePreviewCtx, appDataState);
// });

// downloadButton.addEventListener("click", () => {
//   download(
//     "data.json",
//     JSON.stringify({
//       sprites: appDataState.sprites.flat(2),
//       map: appDataState.tileMap.flat(2),
//     })
//   );
// });

// fillDrawGrid();
// fillPalette();
// changeSelectedSprite(0, spritePreviewCtx, appDataState);

// function enableDrawing(cell) {
//   const {
//     isDrawing,
//     currentMode,
//     selectedColor,
//     selectedImage,
//   } = spriteEditState;
//   if (isDrawing) {
//     switch (currentMode) {
//       case DRAW:
//         // cell.style.backgroundColor = palette[selectedColor];
//         const cellNumber = Array.from(cells).indexOf(cell);
//         const x = cellNumber % 8;
//         const y = Math.floor(cellNumber / 8);
//         appDataState.sprites[selectedImage][y][x] = selectedColor;

//         updateSprite(selectedImage, spritePreviewCtx, appDataState);
//         updateDrawingSurface(selectedImage);
//         break;
//       case ERASE:
//         cell.style.backgroundColor = palette[5];
//         break;
//       default:
//         break;
//     }
//   }
// }

// function fillDrawGrid() {
//   const sprite = appDataState.sprites[spriteEditState.selectedImage];

//   let currentCell;
//   sprite.forEach((row) =>
//     row.forEach((cell) => {
//       cells.item(currentCell).style.backgroundColor = palette[cell];
//       currentCell++;
//     })
//   );
// }

// function fillPalette() {
//   colorButtons.forEach((button, i) => {
//     button.style.backgroundColor = palette[i];
//   });
// }

// function updateDrawingSurface(spriteIndex) {
//   const sprite = appDataState.sprites[spriteIndex];

//   const pixels = sprite.flat(2);

//   cells.forEach((cell, index) => {
//     cell.style.backgroundColor = palette[pixels[index]];
//   });
// }
