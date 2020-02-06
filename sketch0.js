var myFont;

function preload() {

    myFont = loadFont('./assets/CircularStd-Book.otf');
    logo = loadImage("./assets/logo.png");

}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background("black");

    button1 = createButton("START SCRIBBLING");
    button1.position(windowWidth / 2 - 100, windowHeight / 10 * 5.5);
    button1.size(200, 50);
    button1.mousePressed(openScribble);
    button1.style('background-color', "black");
    button1.style("color", "#ffb3ff");
    button1.style("border-color", "#9fdfff");
    button1.style("font-size", "15px");
    button1.style("font-family", "CircularStd-Book");
    button1.mouseOver(changeColor1);
    button1.mouseOut(beginningColor1);

    button2 = createButton("Learn more");
    button2.position(windowWidth / 2 - 100, windowHeight / 10 * 6.2);
    button2.size(200, 50);
    button2.mousePressed(openAbout);
    button2.style('background-color', "black");
    button2.style("color", "#ffb3ff");
    button2.style("border-color", "#9fdfff");
    button2.style("font-size", "15px");
    button2.style("font-family", "CircularStd-Book");
    button2.mouseOver(changeColor2);
    button2.mouseOut(beginningColor2);

    button3 = createButton("Creative Coding 2019/2020");
    button3.position(windowWidth / 2 - 100, windowHeight / 10 * 6.9);
    button3.size(200, 50);
    button3.mousePressed(openCourse);
    button3.style('background-color', "black");
    button3.style("color", "#ffb3ff");
    button3.style("border-color", "#9fdfff");
    button3.style("font-size", "15px");
    button3.style("font-family", "CircularStd-Book");
    button3.mouseOver(changeColor3);
    button3.mouseOut(beginningColor3);

}

var iterator = 0;

function draw() {

    //Updating a semitransparent background for a trail effect, which hints at the act of scribbling
    background('rgba(4, 5, 28, 0.05)');

    iterator++;
    var x = noise(iterator / 200 + 400) * height;
    var y = (noise(iterator / 500 + 2000) * width) -300;
    noStroke();
    fill("#ffb3ff");
    ellipse(x, y, 20);

    var a = 900 + noise(-iterator / 200 + 400) * height;
    var b = (noise(-iterator / 500 + 2000) * width) - 300;
    fill("#9fdfff");
    ellipse(a, b, 20);

    imageMode(CENTER);
    image(logo, windowWidth / 2, windowHeight / 3.2);

    fill("#9fdfff");
    textFont(myFont);
    textSize(20);
    textAlign(CENTER);
    text("Project by Group 12: \n Emanuele Ghebaur, Beatrice Foresti, Pietro Forino, Michele La Rosa", windowWidth / 2, windowHeight / 10 * 4.4);
    iterator++;
    var x = noise(iterator / 200 + 100) * height;
    var y = noise(iterator / 100) * width;
}

function openScribble() {
    window.open("scribble.html", "_self");
}

function openCourse() {
    window.open("https://drawwithcode.github.io/2019/");
}

function openAbout() {
    window.open("about.html", "_self");
}

//All these create a hover effect on the buttons
function changeColor1() {
    button1.style('background-color', "#3f3f3f");
}

function beginningColor1() {
    button1.style('background-color', "black");
}

function changeColor2() {
    button2.style('background-color', "#3f3f3f");
}

function beginningColor2() {
    button2.style('background-color', "black");
}

function changeColor3() {
    button3.style('background-color', "#3f3f3f");
}

function beginningColor3() {
    button3.style('background-color', "black");
}

function windowResized() {
    //resizing the canvas when the window is resized
    resizeCanvas(windowWidth, windowWidth);
}
