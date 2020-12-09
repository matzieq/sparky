var x = 0;
var y = 0;
jb.init({
  draw: function () {
    jb.cls();
    // jb.camera(x - 64, y - 64);
    jb.map();
    jb.spr(2, x, y);
    jb.print("Hellllloooo wirruldddd", 5, 10, 0);
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
  },
});

// // jb.map();
// console.log(data.sprites.slice(64 * 8, 64 * 26));
// document.body.innerHTML = data.sprites.slice(64 * 8, 64 * 26).toString();
