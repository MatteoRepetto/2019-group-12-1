var myFont;

function preload() {

  myFont = loadFont('./assets/CircularStd-Book.otf');
  logo = loadImage("./assets/logo.png");
  authors = loadImage("./assets/autori.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  home = createButton("Return to Home");
  home.position(windowWidth / 2 - 100, windowHeight / 10 * 9);
  home.mousePressed(goHome);

  selectAll("button").forEach(item => {
    item.size(200, 50);
    item.style('background-color', "black");
    item.style("color", "#ffb3ff");
    item.style("border-color", "#9fdfff");
    item.style("font-size", "15px");
    item.style("font-family", "CircularStd-Book");
    item.mouseOver(changeColor);
    item.mouseOut(beginningColor);
  });

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
  logo.resize(0, 80);
  image(logo, windowWidth / 2, windowHeight / 10);

  authors.resize(0, 200);
  image(authors, windowWidth / 2, windowHeight / 10 * 7.7);

  fill("#9fdfff");
  textFont(myFont);
  textSize(20);
  textAlign(LEFT);
  text("While you are waiting for the subway, while you are ''studying'' for the exam, \nwhile you are waiting for your girlfriend or while you are doing that big one, \nScribble Loop will be there to take you by the hand and bring you to a total waste of time. \n\nScribble Loop is a web platform that allows anyone to create infinite drawings \nin collaboration with many other people. Each user can start with a preset scribble \nor can join a scribble that has already been started by other users.", windowWidth / 3.5 , windowHeight / 10 * 2);

  fill("#ffb3ff");
  text("The aim is to try to include the previous scribbles with your drawing, creating \na collaborative and potentially endless work of art. \n\nWhen you are done, send your scribble to the Loop! \nFuture users will go on with the journey from there.", windowWidth / 3.5, windowHeight / 10 * 4.2);

  fill("#9fdfff");
  text("Scribble Loop is a Creative Coding project, created for the 2019/2020 edition of the course. \nIt's made by Group 12: Beatrice Foresti, Pietro Forino, Emanuele Ghebaur and Michele La Rosa.", windowWidth / 3.5, windowHeight / 10 * 5.8);

}

function goHome() {
  window.open("index.php", "_self");
}

function changeColor() {
  this.style('background-color', "#3f3f3f");
}

function beginningColor() {
  this.style('background-color', "black");
}

function windowResized() {
  //resizing the canvas when the window is resized
  resizeCanvas(windowWidth, windowWidth);
}
