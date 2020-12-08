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
  window.addEventListener("keydown", (e) => this._onKeyPressed(e));
  window.addEventListener("keyup", (e) => this._onKeyReleased(e));
  window.requestAnimationFrame((t) => this._step(t));

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
    this._lastFrame = timestamp;
    this._update();
    this._draw();
  }

  window.requestAnimationFrame((t) => this._step(t));
};

jb.map = function (_x, _y) {
  var x = Math.floor(_x || 0) * 8;
  var y = Math.floor(_y || 0) * 8;

  for (var i = 0; i < 64; i++) {
    var screenX = i % 8;
    var screenY = Math.floor(i / 8);

    var screenData = data.map.slice(i * 256, (i + 1) * 256);

    screenData.forEach((cell, cellIndex) => {
      var cellMapX = cellIndex % 16;
      var cellMapY = Math.floor(cellIndex / 16);
      var spriteX = x + screenX * 128 + cellMapX * 8;
      var spriteY = y + screenY * 128 + cellMapY * 8;

      if (
        spriteX - this._cam.x < -8 ||
        spriteX - this._cam.x > 128 ||
        spriteY - this._cam.y < -8 ||
        spriteY - this._cam.y > 128
      ) {
        return;
      }

      this.spr(cell, spriteX, spriteY);
    });
  }
};

jb._keys = {
  left: {
    pressed: false,
    justPressed: false,
  },
  up: {
    pressed: false,
    justPressed: false,
  },
  right: {
    pressed: false,
    justPressed: false,
  },
  down: {
    pressed: false,
    justPressed: false,
  },
  a: {
    pressed: false,
    justPressed: false,
  },
  b: {
    pressed: false,
    justPressed: false,
  },
  start: {
    pressed: false,
    justPressed: false,
  },
  select: {
    pressed: false,
    justPressed: false,
  },
};

jb._resetKeys = function () {
  for (key in this._keys) {
    this._keys[key].justPressed = false;
  }
};

jb._onKeyPressed = function (e) {
  switch (e.key) {
    case "ArrowUp":
      this._keys.up.pressed = true;
      this._keys.up.justPressed = true;
      break;
    case "ArrowDown":
      this._keys.down.pressed = true;
      this._keys.down.justPressed = true;
      break;
    case "ArrowLeft":
      this._keys.left.pressed = true;
      this._keys.left.justPressed = true;
      break;
    case "ArrowRight":
      this._keys.right.pressed = true;
      this._keys.right.justPressed = true;
      break;
    case "z":
      this._keys.a.pressed = true;
      this._keys.a.justPressed = true;
      break;
    case "c":
      this._keys.a.pressed = true;
      this._keys.a.justPressed = true;
      break;
    case "x":
      this._keys.b.pressed = true;
      this._keys.b.justPressed = true;
      break;
    case "Escape":
      this._keys.start.pressed = true;
      this._keys.start.justPressed = true;
      break;
    case "Tab":
      this._keys.select.pressed = true;
      this._keys.select.justPressed = true;
      break;
    default:
      break;
  }
};
jb._onKeyReleased = function (e) {
  switch (e.key) {
    case "ArrowUp":
      this._keys.up.pressed = false;
      break;
    case "ArrowDown":
      this._keys.down.pressed = false;
      break;
    case "ArrowLeft":
      this._keys.left.pressed = false;
      break;
    case "ArrowRight":
      this._keys.right.pressed = false;
      break;
    case "z":
      this._keys.a.pressed = false;
      break;
    case "c":
      this._keys.a.pressed = false;
      break;
    case "x":
      this._keys.b.pressed = false;
      break;
    case "Escape":
      this._keys.start.pressed = false;
      break;
    case "Tab":
      this._keys.select.pressed = false;
      break;
    default:
      break;
  }
};

jb.btn = function (key) {
  switch (key) {
    case 0:
      return jb._keys.left.pressed;
    case 1:
      return jb._keys.up.pressed;
    case 3:
      return jb._keys.right.pressed;
    case 4:
      return jb._keys.down.pressed;
    case 5:
      return jb._keys.a.pressed;
    case 6:
      return jb._keys.b.pressed;
    case 7:
      return jb._keys.start.pressed;
    case 8:
      return jb._keys.select.pressed;
  }
};

jb.btnp = function (key) {
  switch (key) {
    case 0:
      if (jb._keys.left.justPressed) {
        jb._keys.left.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 1:
      if (jb._keys.up.justPressed) {
        jb._keys.up.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 3:
      if (jb._keys.right.justPressed) {
        jb._keys.right.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 4:
      if (jb._keys.down.justPressed) {
        jb._keys.down.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 5:
      if (jb._keys.a.justPressed) {
        jb._keys.a.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 6:
      if (jb._keys.b.justPressed) {
        jb._keys.b.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 7:
      if (jb._keys.start.justPressed) {
        jb._keys.start.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 8:
      if (jb._keys.select.justPressed) {
        jb._keys.select.justPressed = false;
        return true;
      } else {
        return false;
      }
  }
};
