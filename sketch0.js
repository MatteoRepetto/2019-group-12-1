var myFont;

function preload() {

    myFont = loadFont('./assets/CircularStd-Book.otf');
    logo = loadImage("./assets/logo.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("black");

    imageMode(CENTER);
    image(logo, windowWidth / 2, windowHeight / 3.2);

    fill("#9fdfff");
    textFont(myFont);
    textSize(20);
    textAlign(CENTER);
    text("by Group 12: \n Emanuele Ghebaur, Beatrice Foresti, Pietro Forino, Michele La Rosa", windowWidth/2, windowHeight/10*4.4);

    button = createButton("START SCRIBBLING");
    button.position(windowWidth / 2-100, windowHeight/10*5.5);
    button.size(200, 50);
    button.mousePressed(openScribble);
    button.style('background-color', "black");
    button.style("color", "#ffb3ff");
    button.style("border-color", "#9fdfff");
    button.style("font-size", "15px");
    button.style("font-family", "CircularStd-Book");

    button = createButton("Learn more");
    button.position(windowWidth / 2-100, windowHeight/10*6.2);
    button.size(200, 50);
    //button.mousePressed(openScribble); <-- QUA METTERE PAGINA ABOUT
    button.style('background-color', "black");
    button.style("color", "#ffb3ff");
    button.style("border-color", "#9fdfff");
    button.style("font-size", "15px");
    button.style("font-family", "CircularStd-Book");

    button = createButton("Creative Coding 2019/2020");
    button.position(windowWidth / 2-100, windowHeight/10*6.9);
    button.size(200, 50);
    button.mousePressed(openCourse);
    button.style('background-color', "black");
    button.style("color", "#ffb3ff");
    button.style("border-color", "#9fdfff");
    button.style("font-size", "15px");
    button.style("font-family", "CircularStd-Book");

}

function draw() {

}

function openScribble() {

    window.open("scribble.html", "_self");

}

function openCourse() {

    window.open("https://drawwithcode.github.io/2019/");

}
