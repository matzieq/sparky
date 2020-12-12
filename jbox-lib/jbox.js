// https://github.com/cwilso/AudioContext-MonkeyPatch/blob/gh-pages/AudioContextMonkeyPatch.js

(function (global, exports, perf) {
  "use strict";

  function fixSetTarget(param) {
    if (!param)
      // if NYI, just return
      return;
    if (!param.setTargetAtTime)
      param.setTargetAtTime = param.setTargetValueAtTime;
  }

  if (
    window.hasOwnProperty("webkitAudioContext") &&
    !window.hasOwnProperty("AudioContext")
  ) {
    window.AudioContext = webkitAudioContext;

    if (!AudioContext.prototype.hasOwnProperty("createGain"))
      AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
    if (!AudioContext.prototype.hasOwnProperty("createDelay"))
      AudioContext.prototype.createDelay =
        AudioContext.prototype.createDelayNode;
    if (!AudioContext.prototype.hasOwnProperty("createScriptProcessor"))
      AudioContext.prototype.createScriptProcessor =
        AudioContext.prototype.createJavaScriptNode;
    if (!AudioContext.prototype.hasOwnProperty("createPeriodicWave"))
      AudioContext.prototype.createPeriodicWave =
        AudioContext.prototype.createWaveTable;

    AudioContext.prototype.internal_createGain =
      AudioContext.prototype.createGain;
    AudioContext.prototype.createGain = function () {
      var node = this.internal_createGain();
      fixSetTarget(node.gain);
      return node;
    };

    AudioContext.prototype.internal_createDelay =
      AudioContext.prototype.createDelay;
    AudioContext.prototype.createDelay = function (maxDelayTime) {
      var node = maxDelayTime
        ? this.internal_createDelay(maxDelayTime)
        : this.internal_createDelay();
      fixSetTarget(node.delayTime);
      return node;
    };

    AudioContext.prototype.internal_createBufferSource =
      AudioContext.prototype.createBufferSource;
    AudioContext.prototype.createBufferSource = function () {
      var node = this.internal_createBufferSource();
      if (!node.start) {
        node.start = function (when, offset, duration) {
          if (offset || duration) this.noteGrainOn(when || 0, offset, duration);
          else this.noteOn(when || 0);
        };
      } else {
        node.internal_start = node.start;
        node.start = function (when, offset, duration) {
          if (typeof duration !== "undefined")
            node.internal_start(when || 0, offset, duration);
          else node.internal_start(when || 0, offset || 0);
        };
      }
      if (!node.stop) {
        node.stop = function (when) {
          this.noteOff(when || 0);
        };
      } else {
        node.internal_stop = node.stop;
        node.stop = function (when) {
          node.internal_stop(when || 0);
        };
      }
      fixSetTarget(node.playbackRate);
      return node;
    };

    AudioContext.prototype.internal_createDynamicsCompressor =
      AudioContext.prototype.createDynamicsCompressor;
    AudioContext.prototype.createDynamicsCompressor = function () {
      var node = this.internal_createDynamicsCompressor();
      fixSetTarget(node.threshold);
      fixSetTarget(node.knee);
      fixSetTarget(node.ratio);
      fixSetTarget(node.reduction);
      fixSetTarget(node.attack);
      fixSetTarget(node.release);
      return node;
    };

    AudioContext.prototype.internal_createBiquadFilter =
      AudioContext.prototype.createBiquadFilter;
    AudioContext.prototype.createBiquadFilter = function () {
      var node = this.internal_createBiquadFilter();
      fixSetTarget(node.frequency);
      fixSetTarget(node.detune);
      fixSetTarget(node.Q);
      fixSetTarget(node.gain);
      return node;
    };

    if (AudioContext.prototype.hasOwnProperty("createOscillator")) {
      AudioContext.prototype.internal_createOscillator =
        AudioContext.prototype.createOscillator;
      AudioContext.prototype.createOscillator = function () {
        var node = this.internal_createOscillator();
        if (!node.start) {
          node.start = function (when) {
            this.noteOn(when || 0);
          };
        } else {
          node.internal_start = node.start;
          node.start = function (when) {
            node.internal_start(when || 0);
          };
        }
        if (!node.stop) {
          node.stop = function (when) {
            this.noteOff(when || 0);
          };
        } else {
          node.internal_stop = node.stop;
          node.stop = function (when) {
            node.internal_stop(when || 0);
          };
        }
        if (!node.setPeriodicWave) node.setPeriodicWave = node.setWaveTable;
        fixSetTarget(node.frequency);
        fixSetTarget(node.detune);
        return node;
      };
    }
  }

  if (
    window.hasOwnProperty("webkitOfflineAudioContext") &&
    !window.hasOwnProperty("OfflineAudioContext")
  ) {
    window.OfflineAudioContext = webkitOfflineAudioContext;
  }
})(window);

var _letters = {
  A: [
    [, 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1],
    [1, , 1],
  ],
  B: [
    [1, 1],
    [1, , 1],
    [1, 1],
    [1, , 1],
    [1, 1],
  ],
  C: [[, 1, 1], [1], [1], [1], [, 1, 1]],
  D: [
    [1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1],
  ],
  E: [[1, 1, 1], [1], [1, 1], [1], [1, 1, 1]],
  F: [[1, 1, 1], [1], [1, 1], [1], [1]],
  G: [[, 1, 1], [1], [1, , 1], [1, , 1], [, 1, 1]],
  H: [
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, , 1],
    [1, , 1],
  ],
  I: [
    [1, 1, 1],
    [, 1],
    [, 1],
    [, 1],
    [1, 1, 1],
  ],
  J: [
    [, , 1],
    [, , 1],
    [, , 1],
    [1, , 1],
    [1, 1, 1],
  ],
  K: [
    [1, , 1],
    [1, , 1],
    [1, 1],
    [1, , 1],
    [1, , 1],
  ],
  L: [[1], [1], [1], [1], [1, 1, 1]],
  M: [
    [1, , 1],
    [1, 1, 1],
    [1, 1, 1],
    [1, , 1],
    [1, , 1],
  ],
  N: [
    [1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
  ],
  O: [
    [, 1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1],
  ],
  P: [[1, 1], [1, , 1], [1, 1], [1], [1]],
  Q: [
    [0, 1, 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [, 1, 1],
  ],
  R: [
    [1, 1],
    [1, , 1],
    [1, 1],
    [1, , 1],
    [1, , 1],
  ],
  S: [[, 1, 1], [1], [1, 1, 1], [, , 1], [1, 1]],
  T: [
    [1, 1, 1],
    [, 1],
    [, 1],
    [, 1],
    [, 1],
  ],
  U: [
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
  ],
  V: [
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [, 1],
  ],
  W: [
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  X: [
    [1, , 1],
    [1, , 1],
    [, 1],
    [1, , 1],
    [1, , 1],
  ],
  Y: [
    [1, , 1],
    [1, , 1],
    [, 1],
    [, 1],
    [, 1],
  ],
  Z: [[1, 1, 1], [, , 1], [, 1], [1], [1, 1, 1]],
  0: [
    [1, 1, 1],
    [1, , 1],
    [1, , 1],
    [1, , 1],
    [1, 1, 1],
  ],
  1: [
    [1, 1],
    [, 1],
    [, 1],
    [, 1],
    [1, 1, 1],
  ],
  2: [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  3: [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  4: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  5: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  6: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  7: [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  8: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  9: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  " ": [
    [, ,],
    [, ,],
    [, ,],
    [, ,],
    [, ,],
  ],
  ",": [[, , ,], [, , ,], [, , ,], [, 1, ,], [1]],
  ".": [
    [, , ,],
    [, , ,],
    [, , ,],
    [, , ,],
    [, 1],
  ],
  "!": [[1], [1], [1], [,], [1]],
  "?": [[1, 1], [, , 1], [, 1], [,], [, 1]],
  "(": [
    [, 1],
    [1, ,],
    [1, ,],
    [1, ,],
    [, 1],
  ],
  ")": [
    [, 1],
    [, , 1],
    [, , 1],
    [, , 1],
    [, 1],
  ],
  "[": [
    [1, 1],
    [1, ,],
    [1, ,],
    [1, ,],
    [1, 1],
  ],
  "]": [
    [, 1, 1],
    [, , 1],
    [, , 1],
    [, , 1],
    [, 1, 1],
  ],
  "{": [
    [, 1, 1],
    [, 1, ,],
    [1, 1],
    [, 1, ,],
    [, 1, 1],
  ],
  "}": [
    [1, 1],
    [, 1],
    [, 1, 1],
    [, 1],
    [1, 1],
  ],
  "'": [[1], [1], [,], [,], [,]],
  '"': [
    [1, , 1],
    [1, , 1],
    [, ,],
    [, ,],
    [, ,],
  ],
  "%": [[1, , 1], [, , 1], [, 1], [1], [1, , 1]],
  "&": [
    [1, 1],
    [1, 1],
    [1, 1],
    [1, , 1],
    [1, 1, 1],
  ],
  "-": [
    [, ,],
    [, ,],
    [1, 1, 1],
    [, ,],
    [, ,],
  ],
  "+": [[,], [, 1], [1, 1, 1], [, 1], [,]],
  "*": [
    [1, , 1],
    [, 1],
    [1, 1, 1],
    [, 1],
    [1, , 1],
  ],
  "/": [
    [, , 1],
    [, , 1],
    [, 1],
    [1, ,],
    [1, ,],
  ],
  ":": [
    [, ,],
    [, 1],
    [, ,],
    [, 1],
    [, ,],
  ],
  ";": [
    [, ,],
    [, 1],
    [, ,],
    [, 1],
    [1, ,],
  ],
  _: [
    [, ,],
    [, ,],
    [, ,],
    [, ,],
    [1, 1, 1],
  ],
};

var _palette = [
  "#fbf5ef",
  "#f2d3ab",
  "#c69fa5",
  "#8b6d9c",
  "#494d7e",
  "#272744",
];

var _screenSize = 128;

var _frameRate = 30;

var jb = jb || {};

jb._transparent = 5;

jb.BTN_LEFT = 0;
jb.BTN_UP = 1;
jb.BTN_RIGHT = 2;
jb.BTN_DOWN = 3;
jb.BTN_A = 4;
jb.BTN_B = 5;
jb.BTN_START = 6;
jb.BTN_SELECT = 7;

jb.init = function (config) {
  jb._jbcanv = document.createElement("canvas");
  jb._jbcanv.width = 1024;
  jb._jbcanv.height = 1024;
  jb._jbctx = jb._jbcanv.getContext("2d");
  jb._jbctx.scale(8, 8);

  jb._actx = new AudioContext();

  jb._jbctx.imageSmoothingEnabled = false;
  document.body.appendChild(jb._jbcanv);
  jb._draw = config && config.draw ? config.draw : function () {};
  jb._update = config && config.update ? config.update : function () {};

  document.body.style.backgroundColor = "black";
  document.body.style.padding = 0;
  document.body.style.margin = 0;
  jb._jbcanv.style.display = "block";
  jb._jbcanv.style.margin = "0 auto";
  jb._fitToScreen();

  window.addEventListener("resize", () => jb._fitToScreen());
  window.addEventListener("keydown", e => jb._onKeyPressed(e));
  window.addEventListener("keyup", e => jb._onKeyReleased(e));
  window.requestAnimationFrame(t => jb._step(t));

  if (config.init) {
    config.init();
  }
};

jb._fitToScreen = function () {
  if (window.innerWidth > window.innerHeight) {
    jb._jbcanv.style.height = "100vh";
    jb._jbcanv.style.width = "auto";
  } else {
    jb._jbcanv.style.width = "100vw";
    jb._jbcanv.style.height = "auto";
  }
};

jb.cls = function () {
  jb._jbctx.fillStyle = _palette[jb._transparent];
  jb._jbctx.fillRect(0, 0, _screenSize, _screenSize);
};

jb._cam = { x: 0, y: 0 };

jb.camera = function (x, y) {
  jb._cam = { x: x, y: y };
};

jb.spr = function (spriteIndex, _x, _y) {
  var sprite = jb._data.sprites.slice(spriteIndex * 64, (spriteIndex + 1) * 64);
  var x = Math.floor(_x - jb._cam.x);
  var y = Math.floor(_y - jb._cam.y);

  // Do not render anything off screen
  if (x > -8 && x < _screenSize && y > -8 && y < _screenSize) {
    sprite.forEach((cell, cellIndex) => {
      var pixelX = x + (cellIndex % 8);
      var pixelY = y + Math.floor(cellIndex / 8);
      if (cell !== jb._transparent) {
        jb._jbctx.fillStyle = _palette[cell];
        jb._jbctx.fillRect(pixelX, pixelY, 1, 1);
      }
    });
  }
};

jb._step = function (timestamp) {
  if (!jb._lastFrame) {
    jb._lastFrame = 0;
  }
  var _dt = timestamp - jb._lastFrame;

  jb._frameRate = 1000 / _dt;
  jb._lastFrame = timestamp;
  jb._update(_dt / 1000);
  jb._draw();

  window.requestAnimationFrame(t => jb._step(t));
};

jb.map = function (_x, _y) {
  var x = Math.floor(_x || 0) * 8;
  var y = Math.floor(_y || 0) * 8;

  for (var i = 0; i < 64; i++) {
    var screenX = i % 8;
    var screenY = Math.floor(i / 8);

    var screenData = jb._data.map.slice(i * 256, (i + 1) * 256);

    screenData.forEach((cell, cellIndex) => {
      var cellMapX = cellIndex % 16;
      var cellMapY = Math.floor(cellIndex / 16);
      var spriteX = x + screenX * 128 + cellMapX * 8;
      var spriteY = y + screenY * 128 + cellMapY * 8;

      if (
        spriteX - jb._cam.x < -8 ||
        spriteX - jb._cam.x > 128 ||
        spriteY - jb._cam.y < -8 ||
        spriteY - jb._cam.y > 128
      ) {
        return;
      }

      jb.spr(cell, spriteX, spriteY);
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
  for (key in jb._keys) {
    jb._keys[key].justPressed = false;
  }
};

jb._onKeyPressed = function (e) {
  switch (e.key) {
    case "ArrowUp":
      jb._keys.up.pressed = true;
      jb._keys.up.justPressed = true;
      break;
    case "ArrowDown":
      jb._keys.down.pressed = true;
      jb._keys.down.justPressed = true;
      break;
    case "ArrowLeft":
      jb._keys.left.pressed = true;
      jb._keys.left.justPressed = true;
      break;
    case "ArrowRight":
      jb._keys.right.pressed = true;
      jb._keys.right.justPressed = true;
      break;
    case "z":
      jb._keys.a.pressed = true;
      jb._keys.a.justPressed = true;
      break;
    case "c":
      jb._keys.a.pressed = true;
      jb._keys.a.justPressed = true;
      break;
    case "x":
      jb._keys.b.pressed = true;
      jb._keys.b.justPressed = true;
      break;
    case "Escape":
      jb._keys.start.pressed = true;
      jb._keys.start.justPressed = true;
      break;
    case "Tab":
      jb._keys.select.pressed = true;
      jb._keys.select.justPressed = true;
      break;
    default:
      break;
  }
};
jb._onKeyReleased = function (e) {
  switch (e.key) {
    case "ArrowUp":
      jb._keys.up.pressed = false;
      break;
    case "ArrowDown":
      jb._keys.down.pressed = false;
      break;
    case "ArrowLeft":
      jb._keys.left.pressed = false;
      break;
    case "ArrowRight":
      jb._keys.right.pressed = false;
      break;
    case "z":
      jb._keys.a.pressed = false;
      break;
    case "c":
      jb._keys.a.pressed = false;
      break;
    case "x":
      jb._keys.b.pressed = false;
      break;
    case "Escape":
      jb._keys.start.pressed = false;
      break;
    case "Tab":
      jb._keys.select.pressed = false;
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
    case 2:
      return jb._keys.right.pressed;
    case 3:
      return jb._keys.down.pressed;
    case 4:
      return jb._keys.a.pressed;
    case 5:
      return jb._keys.b.pressed;
    case 6:
      return jb._keys.start.pressed;
    case 7:
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
    case 2:
      if (jb._keys.right.justPressed) {
        jb._keys.right.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 3:
      if (jb._keys.down.justPressed) {
        jb._keys.down.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 4:
      if (jb._keys.a.justPressed) {
        jb._keys.a.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 5:
      if (jb._keys.b.justPressed) {
        jb._keys.b.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 6:
      if (jb._keys.start.justPressed) {
        jb._keys.start.justPressed = false;
        return true;
      } else {
        return false;
      }
    case 7:
      if (jb._keys.select.justPressed) {
        jb._keys.select.justPressed = false;
        return true;
      } else {
        return false;
      }
  }
};

// Based on pixel font by PaulBGD
jb.print = function (_str, _x, _y, col) {
  var needed = [];

  var str =
    typeof _str === "string"
      ? _str.toUpperCase()
      : _str.toString().toUpperCase();
  var x = _x - jb._cam.x;
  var y = _y - jb._cam.y;
  for (var i = 0; i < str.length; i++) {
    var letter = _letters[str.charAt(i)];
    if (letter) {
      // because there's letters I didn't do
      needed.push(letter);
    }
  }

  jb._jbctx.fillStyle = col != null ? _palette[col] : _palette[2];

  var currX = 0;
  needed.forEach((letter, letterIndex) => {
    var currY = 0;
    var addX = 0;
    letter.forEach(row => {
      row.forEach((pixel, stringX) => {
        if (pixel) {
          jb._jbctx.fillRect(currX + x + stringX, currY + y, 1, 1);
        }
      });
      addX = Math.max(addX, row.length);
      currY += 1;
    });
    currX += 1 + addX;
  });
};

jb._middleC = 440 * Math.pow(Math.pow(2, 1 / 12), -9);

jb._getFrequency = function (dist, octaveDiff = 0) {
  freq = jb._middleC * Math.pow(Math.pow(2, 1 / 12), dist);
  return freq * Math.pow(2, octaveDiff);
};

jb._soundEffect = function (
  actx, // audio context
  frequency, //The sound's fequency pitch in Hertz
  type, //waveform type: "sine", "triangle", "square", "sawtooth"
  volumeValue, //The sound's maximum volume
  wait, //The time, in seconds, to wait before playing the sound
  timeout, //A number, in seconds, which is the maximum duration for sound effects
  fx, // what effect to apply: "fade-in", "fade-out", "vibrato", "slide"
  nextFreq // if there is any sound after this, for slide purposes
) {
  //Set the default values
  if (frequency === undefined) frequency = 200;
  if (type === undefined) type = "sine";
  if (volumeValue === undefined) volumeValue = 1;
  if (wait === undefined) wait = 0;
  if (timeout === undefined) timeout = 2;

  var attack = timeout / 4;
  var decay = timeout;

  var oscillator, volume;
  oscillator = jb._actx.createOscillator();
  volume = actx.createGain();

  oscillator.connect(volume);
  volume.connect(actx.destination);

  oscillator.type = type;

  oscillator.frequency.value = frequency;
  volume.gain.value = volumeValue;

  // mitigate irritating pop
  // if (!["fade-in", "fade-out"].includes(fx)) {
  cutOff(volume);
  // }

  //Apply effects
  switch (fx) {
    case "fade-in":
      fadeIn(volume);
      break;
    case "fade-out":
      fadeOut(volume);
      break;
    case "vibrato":
      vibrato(oscillator.frequency);
      break;

    case "slide":
      slide(oscillator.frequency);
      break;
    default:
      break;
  }

  // volume.gain.setTargetAtTime(
  //   0,
  //   actx.currentTime + wait + timeout,
  //   timeout + wait - 0.015
  // );
  // volume.gain.exponentialRampToValueAtTime(
  //   0.0001,
  //   actx.currentTime + wait + timeout + 1
  // );

  play(oscillator);

  function fadeIn(volumeNode) {
    volumeNode.gain.value = 0;

    volumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + wait);
    volumeNode.gain.linearRampToValueAtTime(
      volumeValue,
      actx.currentTime + wait + attack
    );
  }

  function fadeOut(volumeNode) {
    volumeNode.gain.linearRampToValueAtTime(
      volumeValue,
      actx.currentTime + wait
    );
    volumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + wait + decay);
  }

  function cutOff(volumeNode) {
    if (fx !== "fade-in") {
      volumeNode.gain.value = 0;

      volumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + wait);
      volumeNode.gain.linearRampToValueAtTime(
        volumeValue,
        actx.currentTime + wait + 0.01
      );
    }

    if (fx !== "fade-out") {
      volumeNode.gain.linearRampToValueAtTime(
        volumeValue,
        actx.currentTime + wait + timeout - 0.01
      );
      volumeNode.gain.linearRampToValueAtTime(
        0,
        actx.currentTime + wait + timeout - 0.001
      );
    }
  }

  function vibrato(frequencyNode) {
    var waveTable = [];
    for (var i = 0; i < timeout; i += 0.01) {
      waveTable.push(frequency + Math.sin(i * 40) * (frequency / 40));
    }

    frequencyNode.setValueCurveAtTime(
      waveTable,
      actx.currentTime + wait,
      timeout
    );
  }

  function slide(frequencyNode) {
    if (!nextFreq) {
      return;
    }
    var waveTable = [frequency, nextFreq];

    frequencyNode.setValueCurveAtTime(
      waveTable,
      actx.currentTime + wait,
      timeout
    );
  }
  function play(node) {
    node.start(actx.currentTime + wait);
    node.stop(actx.currentTime + wait + timeout);
  }
};

jb.sfx = function (soundIndex) {
  const sound = jb._data.sfx[soundIndex];
  const interval = sound.tempo / 64;
  for (let i = 0; i < sound.samples.length; i++) {
    const sample = sound.samples[i];
    let repeat = 1;

    if (!["fade-in", "fade-out"].includes(sample.fx)) {
      for (let j = i + 1; j < sound.samples.length; j++) {
        const nextSample = sound.samples[j];
        if (
          !nextSample ||
          nextSample.dist !== sample.dist ||
          nextSample.type !== sample.type ||
          nextSample.volume !== sample.volume ||
          nextSample.fx !== sample.fx
        ) {
          break;
        }
        repeat++;
      }
    }
    soundEffect(
      actx,
      jb._getFrequency(sample.dist),
      sample.type,
      sample.volume / 5,
      interval * i,
      interval * repeat,
      sample.fx,
      sound.samples[i + 1] ? jb._getFrequency(sound.samples[i + 1].dist) : null
    );
    i += repeat - 1;
  }
};
