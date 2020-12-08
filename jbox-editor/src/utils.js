import { palette } from "./data";

export function updateSprite(spriteIndex, ctx, state) {
  const sprite = state.sprites[spriteIndex];

  const spriteRow = Math.floor(spriteIndex / 8);
  const spriteCol = spriteIndex % 8;
  drawSprite(sprite, ctx, spriteCol * 8, spriteRow * 8);
}

export function drawSprite(sprite, ctx, x, y) {
  sprite.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      ctx.fillStyle = palette[cell];
      ctx.fillRect(x + cellIndex, y + rowIndex, 1, 1);
    })
  );
}

export function changeSelectedSprite({
  newSprite,
  contextList,
  state,
  spriteEditState,
  updateDrawingSurface,
}) {
  spriteEditState.selectedImage = newSprite;

  const spriteRow = Math.floor(newSprite / 8);
  const spriteCol = newSprite % 8;
  contextList.forEach((ctx) => {
    state.sprites.forEach((_, index) => updateSprite(index, ctx, state));

    ctx.strokeStyle = palette[0];
    ctx.lineWidth = 1;
    ctx.strokeRect(spriteCol * 8, spriteRow * 8, 8, 8);
  });
  updateDrawingSurface(newSprite);
}

export function getMousePos(e, canv) {
  const rect = canv.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export function download(filename, text) {
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
