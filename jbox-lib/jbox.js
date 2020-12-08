var _palette = [
  "#fbf5ef",
  "#f2d3ab",
  "#c69fa5",
  "#8b6d9c",
  "#494d7e",
  "#272744",
];

var _screenSize = 128;

var jb = {};

jb._transparent = 5;

jb.init = function (config) {
  this._jbcanv = document.createElement("canvas");
  this._jbcanv.width = 1024;
  this._jbcanv.height = 1024;
  this._jbctx = this._jbcanv.getContext("2d");
  this._jbctx.scale(8, 8);
  this._jbctx.imageSmoothingEnabled = false;
  document.body.appendChild(this._jbcanv);
  this._draw = config && config.draw ? config.draw : function () {};
  this._update = config && config.update ? config.update : function () {};

  document.body.style.backgroundColor = "black";
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  this._jbcanv.style.display = "block";
  this._jbcanv.style.margin = "0 auto";
  this._fitToScreen();

  window.addEventListener("resize", () => this._fitToScreen());
  window.requestAnimationFrame(t => this._step(t));

  if (config.init) {
    config.init();
  }
};

jb._fitToScreen = function () {
  if (window.innerWidth > window.innerHeight) {
    this._jbcanv.style.height = "100vh";
    this._jbcanv.style.width = "auto";
  } else {
    this._jbcanv.style.width = "100vw";
    this._jbcanv.style.height = "auto";
  }
};

jb.cls = function () {
  this._jbctx.fillStyle = _palette[this._transparent];
  this._jbctx.fillRect(0, 0, _screenSize, _screenSize);
};

jb._cam = { x: 0, y: 0 };

jb.camera = function (x, y) {
  this._cam = { x: x, y: y };
};

jb.spr = function (spriteIndex, x, y) {
  var sprite = data.sprites.slice(spriteIndex * 64, (spriteIndex + 1) * 64);
  var adjustedX = x - this._cam.x;
  var adjustedY = y - this._cam.y;
  sprite.forEach((cell, cellIndex) => {
    var pixelX = adjustedX + (cellIndex % 8);
    var pixelY = adjustedY + Math.floor(cellIndex / 8);
    if (cell !== this._transparent) {
      this._jbctx.fillStyle = _palette[cell];
      this._jbctx.fillRect(pixelX, pixelY, 1, 1);
    }
  });
};

jb._lastFrame = 0;

jb._step = function (timestamp) {
  var dt = timestamp - this._lastFrame;
  if (dt >= 1000 / 60) {
    // console.log(dt);
    this._lastFrame = timestamp;
    this._update();
    this._draw();
  }

  window.requestAnimationFrame(t => this._step(t));
};

jb.map = function (_x, _y) {
  var x = Math.floor(_x || 0) * 8 - this._cam.x;
  var y = Math.floor(_y || 0) * 8 - this._cam.y;

  for (var i = 0; i < 64; i++) {
    var screenX = i % 8;
    var screenY = Math.floor(i / 8);

    var screenData = data.map.slice(i * 256, (i + 1) * 256);

    screenData.forEach((cell, cellIndex) => {
      var cellMapX = cellIndex % 16;
      var cellMapY = Math.floor(cellIndex / 16);
      var spriteX = x + screenX * 128 + cellMapX * 8;
      var spriteY = y + screenY * 128 + cellMapY * 8;

      if (spriteX < -8 || spriteX > 128 || spriteY < -8 || spriteY > 128) {
        return;
      }

      this.spr(cell, spriteX, spriteY);
    });
  }
};

// jb.print = function(x,)
