let x = 0;
let y = 0;
let spd = 60;
let r = 50;

let mapX = 0;
let mapY = 0;

jb.init({
  init: function () {
    jb.mset(0, 0, 1);

    console.log(jb.mget(0, 0));
    console.log(jb.mget(0, 1));
    console.log(jb.fget(jb.mget(0, 1)));
    console.log(jb.fget(jb.mget(0, 1), 0));
    console.log(jb.fget(jb.mget(0, 1), 1));
  },
  draw: function () {
    jb.cls();
    jb.camera(x - 64, y - 64);
    // jb.color(4);
    // for (let i = 0; i < 100; i++) {
    //   jb.rect(20, 10, 40, 60);
    //   jb.circ(x, y, 20);
    // jb.line(
    //   Math.sin(i) * 10,
    //   Math.cos(i) * 10,
    //   Math.cos(i) * 100,
    //   Math.sin(i) * 100
    // );
    // }
    jb.pal();
    jb.map();
    jb.pset(20, 20, 1);
    jb.palt(5, false);
    jb.spr(1, x, y, 1, 1, true, false);

    jb.pal(2, 0);
    jb.spr(1, x + 10, y + 10);
    jb.palt(3, true);
    jb.spr(1, x + 20, y + 20);
    jb.fset(2, 8);

    jb.print(jb.fget(2, 3), x - 59, y - 59);
    jb.print(jb.pget(10, 6), x - 59, y - 49);
    jb.print(jb.sget(10, 6), x - 59, y - 39);
  },

  update: function (dt) {
    if (jb.btn(jb.BTN_RIGHT)) {
      x += spd * dt;
    }
    if (jb.btn(jb.BTN_LEFT)) {
      x -= spd * dt;
    }

    if (jb.btn(jb.BTN_UP)) {
      y -= spd * dt;
      r++;
    }

    if (jb.btn(jb.BTN_DOWN)) {
      y += spd * dt;
      r--;
    }

    if (jb.btnp(jb.BTN_A)) {
      // jb.sfx(0);
      mapX++;
      mapY++;
    }

    if (jb.btnp(jb.BTN_B)) {
      mapX--;
      mapY--;
    }

    if (jb.btn(jb.BTN_UP)) {
      r++;
    }

    if (jb.btn(jb.BTN_DOWN)) {
      r--;
    }
  },
});

// var bufferSize = 4096;
// var brownNoise = (function () {
//   var lastOut = 0.0;
//   var node = actx.createScriptProcessor(bufferSize, 1, 1);
//   node.onaudioprocess = function (e) {
//     var output = e.outputBuffer.getChannelData(0);
//     for (var i = 0; i < bufferSize; i++) {
//       var white = Math.random() * 2 - 1;
//       output[i] = (lastOut + 0.02 * white) / 1.02;
//       lastOut = output[i];
//       output[i] *= 3.5; // (roughly) compensate for gain
//     }
//   };
//   return node;
// })();

// brownNoise.connect(actx.destination);

// // jb.map();
// console.log(data.sprites.slice(64 * 8, 64 * 26));
// document.body.innerHTML = data.sprites.slice(64 * 8, 64 * 26).toString();
