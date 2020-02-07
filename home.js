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
    button1.mousePressed(openScribble);

    button2 = createButton("Learn More");
    button2.position(windowWidth / 2 - 100, windowHeight / 10 * 6.2);
    button2.mousePressed(openAbout);

    button3 = createButton("Creative Coding 2019/2020");
    button3.position(windowWidth / 2 - 100, windowHeight / 10 * 6.9);
    button3.mousePressed(openCourse);

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
    image(logo, windowWidth / 2, windowHeight / 3.2);

    fill("#9fdfff");
    textFont(myFont);
    textSize(20);
    textAlign(CENTER);
    text("Project by Group 12: \n Beatrice Foresti, Pietro Forino, Emanuele Ghebaur, Michele La Rosa", windowWidth / 2, windowHeight / 10 * 4.4);

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
