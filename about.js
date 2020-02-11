var myFont;
var myFont2;

function preload() {

  myFont = loadFont('./assets/CircularStd-Book.otf');
  myFont2 = loadFont('./assets/CircularStd-Black.otf');
  logo = loadImage("./assets/logo.png");
  authors = loadImage("./assets/autori.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

}

var iterator = 0;

function draw() {

  //Updating a semitransparent background for a trail effect, which hints at the act of scribbling
  background('rgba(4, 5, 28, 0.05)');

  iterator++;
  var x = noise(iterator / 200 + 400) * height;
  var y = (noise(iterator / 500 + 2000) * width) - 300;
  noStroke();
  fill("#ff00ff");
  ellipse(x, y, 20);

  var a = 900 + noise(-iterator / 200 + 400) * height;
  var b = (noise(-iterator / 500 + 2000) * width) - 300;
  fill("#00ffff");
  ellipse(a, b, 20);

  //Logo
  imageMode(CENTER);
  logo.resize(0, 60);
  image(logo, windowWidth / 2, windowHeight / 10 * 0.7);

  //Authors
  authors.resize(0, 230);
  image(authors, windowWidth / 2, windowHeight / 10 * 8.2);

  //Text

  fill("#00ffff");
  textFont(myFont2);
  textSize(50);
  textAlign(CENTER);
  text("About", windowWidth / 2, windowHeight / 10 * 1.5);

  fill("#ff00ff");
  textFont(myFont2);
  textSize(25);
  text("Where?", windowWidth / 2, windowHeight / 10 * 2);

  fill("#00ffff");
  textFont(myFont);
  textSize(20);
  text("While you are waiting for the subway, while you are ''studying'' for the exam, \nwhile you are waiting for your girlfriend or while you are doing that big one, \nScribble Loop will be there to take you by the hand and bring you to a total waste of time.", windowWidth / 2, windowHeight / 10 * 2.3);

  fill("#ff00ff");
  textFont(myFont2);
  textSize(25);
  text("How?", windowWidth / 2, windowHeight / 10 * 3.2);

  fill("#00ffff");
  textFont(myFont);
  textSize(20);
  text("Scribble Loop is a web platform that allows anyone to create infinite drawings \nin collaboration with many other people. Each user can start with a preset scribble \nor can join a scribble that has already been started by other users. \n \nThe aim is to try to include the previous scribbles with your drawing, creating \na collaborative and potentially endless work of art. \n\nWhen you are done, send your scribble to the Loop! \nFuture users will go on with the journey from there.", windowWidth / 2, windowHeight / 10 * 3.5);

  fill("#ff00ff");
  textFont(myFont2);
  textSize(25);
  text("Who?", windowWidth / 2, windowHeight / 10 * 6.1);

  fill("#00ffff");
  textFont(myFont);
  textSize(20);
  text("Scribble Loop is a Creative Coding project, created for the 2019/2020 edition of the course. \nIt's made by Group 12:", windowWidth / 2, windowHeight / 10 * 6.4);

}

function goHome() {
  window.open("index.php", "_self");
}

function windowResized() {
  //resizing the canvas when the window is resized
  resizeCanvas(windowWidth, windowWidth);
}
