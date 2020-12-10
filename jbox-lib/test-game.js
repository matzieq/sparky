var x = 0;
var y = 0;
jb.init({
  draw: function () {
    jb.cls();
    jb.camera(x, y);
    jb.map();
    // for (var i = 1; i < 100; i++)
    //   jb.spr(
    //     2,
    //     x / (i / 10) + (i / 2) * Math.sin(i),
    //     y / (i / 10) + (i / 2) * Math.cos(i)
    //   );
    jb.print('it\'s on! "DUPA"%&+-*/:;_', 5, 10, 0);
  },

  update: function () {
    if (jb.btn(jb.BTN_RIGHT)) {
      x++;
    }
    if (jb.btn(jb.BTN_LEFT)) {
      x--;
    }

    if (jb.btn(jb.BTN_UP)) {
      y--;
    }

    if (jb.btn(jb.BTN_DOWN)) {
      y++;
    }

    if (jb.btnp(jb.BTN_A)) {
      soundEffect(500, 0, 0.5, "sawtooth", 0.5, 0, 0, 1000, false, 0);
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
