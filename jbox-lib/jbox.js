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

var jb = {};

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

jb.spr = function (spriteIndex, _x, _y) {
  var sprite = data.sprites.slice(spriteIndex * 64, (spriteIndex + 1) * 64);
  var x = _x - this._cam.x;
  var y = _y - this._cam.y;

  // Do not render anything off screen
  if (x > -8 && x < _screenSize && y > -8 && y < _screenSize) {
    sprite.forEach((cell, cellIndex) => {
      var pixelX = x + (cellIndex % 8);
      var pixelY = y + Math.floor(cellIndex / 8);
      if (cell !== this._transparent) {
        this._jbctx.fillStyle = _palette[cell];
        this._jbctx.fillRect(pixelX, pixelY, 1, 1);
      }
    });
  }
};

jb._step = function (timestamp) {
  if (!this._lastFrame) {
    this._lastFrame = 0;
  }
  var dt = timestamp - this._lastFrame;
  if (dt >= 1000 / 30) {
    this._lastFrame = timestamp - (dt - 1000 / 30);
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
  var str = _str.toUpperCase();
  var x = _x - this._cam.x;
  var y = _y - this._cam.y;
  for (var i = 0; i < str.length; i++) {
    var letter = _letters[str.charAt(i)];
    if (letter) {
      // because there's letters I didn't do
      needed.push(letter);
    }
  }

  this._jbctx.fillStyle = col != null ? _palette[col] : _palette[2];

  var currX = 0;
  needed.forEach((letter, letterIndex) => {
    var currY = 0;
    var addX = 0;
    letter.forEach((row) => {
      row.forEach((pixel, stringX) => {
        if (pixel) {
          this._jbctx.fillRect(currX + x + stringX, currY + y, 1, 1);
        }
      });
      addX = Math.max(addX, row.length);
      currY += 1;
    });
    currX += 1 + addX;
  });
};

var actx = new AudioContext();

function soundEffect(
  frequencyValue, //The sound's fequency pitch in Hertz
  attack, //The time, in seconds, to fade the sound in
  decay, //The time, in seconds, to fade the sound out
  type, //waveform type: "sine", "triangle", "square", "sawtooth"
  volumeValue, //The sound's maximum volume
  panValue, //The speaker pan. left: -1, middle: 0, right: 1
  wait, //The time, in seconds, to wait before playing the sound
  pitchBendAmount, //The number of Hz in which to bend the sound's pitch down
  reverse, //If `reverse` is true the pitch will bend up
  randomValue, //A range, in Hz, within which to randomize the pitch
  dissonance, //A value in Hz. It creates 2 dissonant frequencies above and below the target pitch
  echo, //An array: [delayTimeInSeconds, feedbackTimeInSeconds, filterValueInHz]
  reverb, //An array: [durationInSeconds, decayRateInSeconds, reverse]
  timeout //A number, in seconds, which is the maximum duration for sound effects
) {
  //Set the default values
  if (frequencyValue === undefined) frequencyValue = 200;
  if (attack === undefined) attack = 0;
  if (decay === undefined) decay = 1;
  if (type === undefined) type = "sine";
  if (volumeValue === undefined) volumeValue = 1;
  if (panValue === undefined) panValue = 0;
  if (wait === undefined) wait = 0;
  if (pitchBendAmount === undefined) pitchBendAmount = 0;
  if (reverse === undefined) reverse = false;
  if (randomValue === undefined) randomValue = 0;
  if (dissonance === undefined) dissonance = 0;
  if (echo === undefined) echo = undefined;
  if (reverb === undefined) reverb = undefined;
  if (timeout === undefined) timeout = undefined;

  //Create an oscillator, gain and pan nodes, and connect them
  //together to the destination
  var oscillator, volume, pan;
  oscillator = actx.createOscillator();
  volume = actx.createGain();
  if (!actx.createStereoPanner) {
    pan = actx.createPanner();
  } else {
    pan = actx.createStereoPanner();
  }
  oscillator.connect(volume);
  volume.connect(pan);
  pan.connect(actx.destination);

  //Set the supplied values
  volume.gain.value = volumeValue;
  if (!actx.createStereoPanner) {
    pan.setPosition(panValue, 0, 1 - Math.abs(panValue));
  } else {
    pan.pan.value = panValue;
  }
  oscillator.type = type;

  //Optionally randomize the pitch. If the `randomValue` is greater
  //than zero, a random pitch is selected that's within the range
  //specified by `frequencyValue`. The random pitch will be either
  //above or below the target frequency.
  var frequency;
  var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  if (randomValue > 0) {
    frequency = randomInt(
      frequencyValue - randomValue / 2,
      frequencyValue + randomValue / 2
    );
  } else {
    frequency = frequencyValue;
  }
  oscillator.frequency.value = frequency;

  //Apply effects
  if (attack > 0) fadeIn(volume);
  fadeOut(volume);
  if (pitchBendAmount > 0) pitchBend(oscillator);
  if (echo) addEcho(volume);
  if (reverb) addReverb(volume);
  if (dissonance > 0) addDissonance();

  //Play the sound
  play(oscillator);

  //The helper functions:

  function addReverb(volumeNode) {
    var convolver = actx.createConvolver();
    convolver.buffer = impulseResponse(reverb[0], reverb[1], reverb[2], actx);
    volumeNode.connect(convolver);
    convolver.connect(pan);
  }

  function addEcho(volumeNode) {
    //Create the nodes
    var feedback = actx.createGain(),
      delay = actx.createDelay(),
      filter = actx.createBiquadFilter();

    //Set their values (delay time, feedback time and filter frequency)
    delay.delayTime.value = echo[0];
    feedback.gain.value = echo[1];
    if (echo[2]) filter.frequency.value = echo[2];

    //Create the delay feedback loop, with
    //optional filtering
    delay.connect(feedback);
    if (echo[2]) {
      feedback.connect(filter);
      filter.connect(delay);
    } else {
      feedback.connect(delay);
    }

    //Connect the delay loop to the oscillator's volume
    //node, and then to the destination
    volumeNode.connect(delay);

    //Connect the delay loop to the main sound chain's
    //pan node, so that the echo effect is directed to
    //the correct speaker
    delay.connect(pan);
  }

  //The `fadeIn` function
  function fadeIn(volumeNode) {
    //Set the volume to 0 so that you can fade
    //in from silence
    volumeNode.gain.value = 0;

    volumeNode.gain.linearRampToValueAtTime(0, actx.currentTime + wait);
    volumeNode.gain.linearRampToValueAtTime(
      volumeValue,
      actx.currentTime + wait + attack
    );
  }

  //The `fadeOut` function
  function fadeOut(volumeNode) {
    volumeNode.gain.linearRampToValueAtTime(
      volumeValue,
      actx.currentTime + attack + wait
    );
    volumeNode.gain.linearRampToValueAtTime(
      0,
      actx.currentTime + wait + attack + decay
    );
  }

  //The `pitchBend` function
  function pitchBend(oscillatorNode) {
    //If `reverse` is true, make the note drop in frequency. Useful for
    //shooting sounds

    //Get the frequency of the current oscillator
    var frequency = oscillatorNode.frequency.value;

    //If `reverse` is true, make the sound drop in pitch
    if (!reverse) {
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency,
        actx.currentTime + wait
      );
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency - pitchBendAmount,
        actx.currentTime + wait + attack + decay
      );
    }

    //If `reverse` is false, make the note rise in pitch. Useful for
    //jumping sounds
    else {
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency,
        actx.currentTime + wait
      );
      oscillatorNode.frequency.linearRampToValueAtTime(
        frequency + pitchBendAmount,
        actx.currentTime + wait + attack + decay
      );
    }
  }

  //The `addDissonance` function
  function addDissonance() {
    //Create two more oscillators and gain nodes
    var d1 = actx.createOscillator(),
      d2 = actx.createOscillator(),
      d1Volume = actx.createGain(),
      d2Volume = actx.createGain();

    //Set the volume to the `volumeValue`
    d1Volume.gain.value = volumeValue;
    d2Volume.gain.value = volumeValue;

    //Connect the oscillators to the gain and destination nodes
    d1.connect(d1Volume);
    d1Volume.connect(actx.destination);
    d2.connect(d2Volume);
    d2Volume.connect(actx.destination);

    //Set the waveform to "sawtooth" for a harsh effect
    d1.type = "sawtooth";
    d2.type = "sawtooth";

    //Make the two oscillators play at frequencies above and
    //below the main sound's frequency. Use whatever value was
    //supplied by the `dissonance` argument
    d1.frequency.value = frequency + dissonance;
    d2.frequency.value = frequency - dissonance;

    //Fade in/out, pitch bend and play the oscillators
    //to match the main sound
    if (attack > 0) {
      fadeIn(d1Volume);
      fadeIn(d2Volume);
    }
    if (decay > 0) {
      fadeOut(d1Volume);
      fadeOut(d2Volume);
    }
    if (pitchBendAmount > 0) {
      pitchBend(d1);
      pitchBend(d2);
    }
    if (echo) {
      addEcho(d1Volume);
      addEcho(d2Volume);
    }
    if (reverb) {
      addReverb(d1Volume);
      addReverb(d2Volume);
    }
    play(d1);
    play(d2);
  }

  //The `play` function
  function play(node) {
    node.start(actx.currentTime + wait);

    //Oscillators have to be stopped otherwise they accumulate in
    //memory and tax the CPU. They'll be stopped after a default
    //timeout of 2 seconds, which should be enough for most sound
    //effects. Override this in the `soundEffect` parameters if you
    //need a longer sound
    node.stop(actx.currentTime + wait + (timeout || 2));
  }
}

/*
impulseResponse
---------------
The `makeSound` and `soundEffect` functions uses `impulseResponse`  to help create an optional reverb effect.
It simulates a model of sound reverberation in an acoustic space which
a convolver node can blend with the source sound. Make sure to include this function along with `makeSound`
and `soundEffect` if you need to use the reverb feature.
*/

function impulseResponse(duration, decay, reverse, actx) {
  //The length of the buffer.
  var length = actx.sampleRate * duration;

  //Create an audio buffer (an empty sound container) to store the reverb effect.
  var impulse = actx.createBuffer(2, length, actx.sampleRate);

  //Use `getChannelData` to initialize empty arrays to store sound data for
  //the left and right channels.
  var left = impulse.getChannelData(0),
    right = impulse.getChannelData(1);

  //Loop through each sample-frame and fill the channel
  //data with random noise.
  for (var i = 0; i < length; i++) {
    //Apply the reverse effect, if `reverse` is `true`.
    var n;
    if (reverse) {
      n = length - i;
    } else {
      n = i;
    }

    //Fill the left and right channels with random white noise which
    //decays exponentially.
    left[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
    right[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);
  }

  //Return the `impulse`.
  return impulse;
}
