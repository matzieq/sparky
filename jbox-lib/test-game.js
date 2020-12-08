var x = 0;
jb.init({
  draw: function () {
    jb.cls();
    jb.camera(x - 64, 0);
    jb.map();
    jb.spr(2, x, 64);
    if (jb.btnp(3)) {
      x++;
    }
    if (jb.btnp(0)) {
      x--;
    }
  },
});

// // jb.map();
// console.log(data.sprites.slice(64 * 8, 64 * 26));
// document.body.innerHTML = data.sprites.slice(64 * 8, 64 * 26).toString();
