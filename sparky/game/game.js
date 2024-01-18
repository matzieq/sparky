if (
  localStorage.getItem("SPARKY_GAME_CODE") &&
  localStorage.getItem("SPARKY_GAME_DATA")
) {
  eval(localStorage.getItem("SPARKY_GAME_DATA"));
  eval(localStorage.getItem("SPARKY_GAME_CODE"));
}
