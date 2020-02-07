var myFont;

function preload() {

    myFont = loadFont('./assets/CircularStd-Book.otf');
    logo = loadImage("./assets/logo.png");

}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background("black");

    again = createButton("Scribble Again");
    again.position(windowWidth / 2 - 100, windowHeight / 10 * 4.5);
    again.mousePressed(goAgain);

    gallery = createButton("Discover the Gallery");
    gallery.position(windowWidth / 2 - 100, windowHeight / 10 * 5.5);
    gallery.mousePressed(goGallery);

    home = createButton("Return to Home");
    home.position(windowWidth / 2 - 100, windowHeight / 10 * 6.5);
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

    fill("#9fdfff");
    textFont(myFont);
    textSize(20);
    textAlign(CENTER);
    text("Great Job! \nYour work of art is now in the Loop. Thank you for your contribution!", windowWidth / 2, windowHeight / 10 * 3);

}

function goHome() {
    window.open("index.html", "_self");
}

function goAgain() {
    window.open("scribble.html", "_self");
}

function goGallery() {
    window.open("gallery.html", "_self");
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
