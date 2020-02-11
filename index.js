var myFont;

function preload() {

  myFont = loadFont('./assets/CircularStd-Black.otf');
  logo = loadImage("./assets/logo.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  //Buttons

  button1 = createButton("START SCRIBBLING");
  button1.position(windowWidth / 2 - 100, windowHeight / 10 * 5.5);
  button1.mousePressed(openScribble);

  button2 = createButton("About");
  button2.position(windowWidth / 2 - 100, windowHeight / 10 * 6.5);
  button2.mousePressed(openAbout);

  button3 = createButton("Creative Coding 2019/2020");
  button3.position(windowWidth / 2 - 100, windowHeight / 10 * 7.5);
  button3.mousePressed(openCourse);

  //same styling through "button" selector
  selectAll("button").forEach(item => {
    item.size(200, 50);
    item.style('background-color', "black");
    item.style("color", "#ff00ff");
    item.style("border-color", "#00ffff");
    item.style("border-radius", "6px");
    item.style("font-size", "15px");
    item.style("font-family", "CircularStd-Black");
    item.mouseOver(changeColor);
    item.mouseOut(beginningColor);
  });
}

var iterator = 0;

function draw() {

  //Updating a semitransparent background for a trail effect, which hints at the act of scribbling
  background('rgba(4, 5, 28, 0.05)');

  if (windowWidth > 415) {
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
  }

  //Logo and resize on mobile devices
  if (windowWidth < 415) {
    logo.resize(windowWidth * 0.7, 0)
  }

  imageMode(CENTER);
  image(logo, windowWidth / 2, windowHeight / 3.2);

  //Claim
  fill("#00ffff");
  textFont(myFont);
  textSize(20);
  textAlign(CENTER);
  text("Create infinite drawings \nand collaborate with others!", windowWidth / 2, windowHeight / 10 * 4.4);

}

function openScribble() {
  if (windowWidth <= 415) {
    window.open("scribble.php", "_self");
  } else {
    window.open("scribble_desktop.php", "_self");
  }
}

function openCourse() {
  window.open("https://drawwithcode.github.io/2019/");
}

function openAbout() {
  window.open("about.php", "_self");
}

//All these create an hover effect on the buttons
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
