import { DRAW, ERASE } from "../constants";
import { palette } from "../data";
import {
  getMousePos,
  updateSprite,
  changeSelectedSprite,
  download,
} from "../utils";

function SpriteEdit(appDataState) {
  const spriteEdit = {
    appDataState,
    spriteEditState: {
      selectedImage: 0,
      currentMode: DRAW,
      isDrawing: false,
      selectedColor: 5,
    },
    elements: {
      cells: document.querySelectorAll(".draw-grid-cell"),
      colorButtons: document.querySelectorAll(".color-button"),
      currentColor: document.querySelector(".current-color"),
      spritePreview: document.querySelector(".sprite-preview"),
      spritePreviewCtx: null,
      downloadButton: document.querySelector(".download-button"),
    },
    init() {
      const {
        elements: {
          cells,
          colorButtons,
          currentColor,
          spritePreview,
          spritePreviewCtx,
          downloadButton,
        },
      } = this;
      this.elements.spritePreviewCtx = spritePreview.getContext("2d");
      this.elements.spritePreviewCtx.scale(5, 5);

      document.addEventListener("mousedown", (e) => {
        this.spriteEditState.isDrawing = true;
        if (Array.from(cells).indexOf(e.target) > 0) {
          enableDrawing(e.target);
        }
      });
      document.addEventListener(
        "mouseup",
        () => (this.spriteEditState.isDrawing = false)
      );

      cells.forEach((cell) =>
        cell.addEventListener("mouseover", () => enableDrawing(cell))
      );

      colorButtons.forEach((button, i) =>
        button.addEventListener("click", (e) => {
          this.spriteEditState.selectedColor = i;
          currentColor.style.backgroundColor = palette[i];
        })
      );

      spritePreview.addEventListener("click", (e) => {
        const mousePos = getMousePos(e, spritePreview);
        const spriteIndex = mousePos.y * 8 + mousePos.x;
        changeSelectedSprite(
          spriteIndex,
          spritePreviewCtx,
          this.appDataState,
          this.spriteEditState
        );
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

      this.fillDrawGrid();
      this.fillPalette();
      changeSelectedSprite(
        0,
        this.elements.spritePreviewCtx,
        this.appDataState,
        this.appDataState
      );
    },

    enableDrawing(cell) {
      const {
        isDrawing,
        currentMode,
        selectedColor,
        selectedImage,
      } = this.spriteEditState;
      if (isDrawing) {
        switch (currentMode) {
          case DRAW:
            // cell.style.backgroundColor = palette[selectedColor];
            const cellNumber = Array.from(this.elements.cells).indexOf(cell);
            const x = cellNumber % 8;
            const y = Math.floor(cellNumber / 8);
            this.appDataState.sprites[selectedImage][y][x] = selectedColor;

            updateSprite(
              selectedImage,
              this.elements.spritePreviewCtx,
              this.appDataState
            );
            this.updateDrawingSurface(selectedImage);
            break;
          case ERASE:
            cell.style.backgroundColor = palette[5];
            break;
          default:
            break;
        }
      }
    },

    fillDrawGrid() {
      const sprite = this.appDataState.sprites[
        this.spriteEditState.selectedImage
      ];

      let currentCell;
      sprite.forEach((row) =>
        row.forEach((cell) => {
          this.elements.cells.item(currentCell).style.backgroundColor =
            palette[cell];
          currentCell++;
        })
      );
    },

    fillPalette() {
      this.elements.colorButtons.forEach((button, i) => {
        button.style.backgroundColor = palette[i];
      });
    },

    updateDrawingSurface(spriteIndex) {
      const sprite = this.appDataState.sprites[spriteIndex];

      const pixels = sprite.flat(2);

      this.elements.cells.forEach((cell, index) => {
        cell.style.backgroundColor = palette[pixels[index]];
      });
    },
  };

  spriteEdit.init();

  return spriteEdit;
}

export default SpriteEdit;
