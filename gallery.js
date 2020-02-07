//PAGINA ABOUT

var myFont;
var myFontBlack;

function preload() {

  myFont = loadFont('./assets/CircularStd-Book.otf');
  myFontBlack = loadFont('./assets/CircularStd-Black.otf');
  logo = loadImage("./assets/logo.png");
  loop = loadImage("./assets/loop.png");
  homeImg = loadImage("./assets/home.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  button1 = createButton("SCRIBBLE AGAIN");
  button1.position(windowWidth - 300, windowHeight / 10);
  button1.size(200, 50);
  button1.mousePressed(openScribble);
  button1.style('background-color', "black");
  button1.style("color", "#ffb3ff");
  button1.style("border-color", "#9fdfff");
  button1.style("font-size", "15px");
  button1.style("font-family", "CircularStd-Black");
  button1.mouseOver(changeColor1);
  button1.mouseOut(beginningColor1);


  home = createButton("Return to Home");
  home.position(300, windowHeight / 10);
  home.size(200, 50);
  home.mousePressed(goHome);
  home.style('background-color', "black");
  home.style("color", "#ffb3ff");
  home.style("border-color", "#9fdfff");
  home.style("font-size", "15px");
  home.style("font-family", "CircularStd-Book");
  home.mouseOver(changeColor1);
  home.mouseOut(beginningColor1);

}

var iterator = 0;

function draw() {

  //Updating a semitransparent background for a trail effect, which hints at the act of scribbling
  background('rgba(4, 5, 28, 0.05)');

  iterator++;
  var x = noise(iterator / 200 + 400) * height;
  var y = (noise(iterator / 500 + 2000) * width) - 300;
  noStroke();
  fill("#ffb3ff");
  ellipse(x, y, 20);

  var a = 900 + noise(-iterator / 200 + 400) * height;
  var b = (noise(-iterator / 500 + 2000) * width) - 300;
  fill("#9fdfff");
  ellipse(a, b, 20);

  imageMode(CENTER);
  // home.resize(100, 45);
  image(homeImg, 400, windowHeight / 10 * 0.5);

  imageMode(CENTER);
  loop.resize(100, 43);
  image(loop, windowWidth / 2, windowHeight / 10 * 1.4);

  fill("#ffb3ff");
  textFont(myFontBlack);
  textSize(50);
  textAlign(CENTER);
  text("Gallery", windowWidth / 2, windowHeight / 10);

}

function openScribble() {
  window.open("scribble.html", "_self");
}

function goHome() {
  window.open("index.html", "_self");
}

function changeColor1() {
  home.style('background-color', "#3f3f3f");
  button1.style('background-color', "#3f3f3f");
}

function beginningColor1() {
  home.style('background-color', "black");
  button1.style('background-color', "black");
}

function windowResized() {
  //resizing the canvas when the window is resized
  resizeCanvas(windowWidth, windowWidth);
}
