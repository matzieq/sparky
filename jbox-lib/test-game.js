var x = 0;
var y = 0;
var spd = 60;
jb.init({
  draw: function () {
    jb.cls();
    jb.camera(x - 64, y - 64);
    jb.map();
    jb.spr(2, x, y);
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
    }

    if (jb.btn(jb.BTN_DOWN)) {
      y += spd * dt;
    }

    if (jb.btnp(jb.BTN_A)) {
      jb.sfx(0);
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
