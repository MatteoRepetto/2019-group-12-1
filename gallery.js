var myFont;

function preload() {

    myFont = loadFont('./assets/CircularStd-Book.otf');
    gallery = loadImage("./assets/gallery.png");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    background("black");

    home = createButton("Return to Home");
    home.position(windowWidth/2-100, windowHeight /10*9.3-25);
    home.size(200, 50);
    home.mousePressed(goHome);
    home.style('background-color', "black");
    home.style("color", "#ff00ff");
    home.style("border-color", "#00ffff");
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
    fill("#ff00ff");
    ellipse(x, y, 20);

    var a = 900 + noise(-iterator / 200 + 400) * height;
    var b = (noise(-iterator / 500 + 2000) * width) - 300;
    fill("#00ffff");
    ellipse(a, b, 20);

    fill("#00ffff");
    textFont(myFont);
    textSize(20);
    textAlign(CENTER);
    text("Welcome to the Loop Gallery! \nHere you can see what the other users have been drawing and some preset scribbles.. \nChoose your next scribble to interact with!", windowWidth / 2, windowHeight / 10 * 2);

    strokeWeight(30);
    stroke("#ff00ff");
    noFill();
    rect(0, 0, windowWidth, windowHeight);

    strokeWeight(15);
    stroke("#00ffff");
    noFill();
    rect(0, 0, windowWidth, windowHeight);

    imageMode(CENTER);
    gallery.resize(0, 80);
    image(gallery, windowWidth / 2, windowHeight / 10);


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
