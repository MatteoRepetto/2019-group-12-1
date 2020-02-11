var img1;
var coloreUno = '';
var coloreDue = '';

var path;

var phpImage, pathErase;

var drawing = [];
var drawingErase = [];
var currentPath = [];
var currentErase = [];
var erase = 0;
var isDrawing = false;
var isErasing = false;

var k = Math.random() * (1.9 - 1.3) + 1.3; // create random variables to scale and move the sketch that you have to complete
var fx = Math.random() * (1080 / 8 * ((k - 1) / k) - 1); // use of Math.round because it is before draw function and it is global
var fy = Math.random() * (1920 / 8 * ((k - 1) / k) - 1);

function preload() {
  img1 = loadImage(phpImage);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath);
  canvas.parent('createImg');
  canvas.mouseReleased(endPath);
  console.log(phpImage);
  //image(img1, 0, 0, 1080 / 5, 1920 / 5)
  coloreUno = get(fx * 4 + 2, fy * 4 + 1); // pick up the background color
  coloreDue = get(fx * 4, fy * 4); // pick up the stroke color
  //print("ScoloreUno: " + coloreUno, "ScoloreDue: " + coloreDue);
}

function startPath() {
  $('#controller').fadeOut('fast')
  isDrawing = true;
  currentPath = [];
  currentErase = [];
  drawing.push(currentPath);
  drawingErase.push(currentErase);
}

function touchStarted() {
  $('#controller').fadeOut('fast')
  isDrawing = true;
  currentPath = [];
  currentErase = [];
  drawing.push(currentPath);
  drawingErase.push(currentErase);
  return false;
}

function endPath() {
  $('#controller').fadeIn('fast')
  isDrawing = false;
}

function touchEnded() {
  $('#controller').fadeIn('fast')
  isDrawing = false;
}

function eraseLine() {
  drawing = [];
}

console.log(Math.round(fx), Math.round(fy), Math.round(k));

function draw() {

  push()
  translate(fx * 4, fy * 4); // translate the whole sketch
  scale(1 / k); // scale of the sketch
  background(coloreDue);
  image(img1, 0, 0, 1080 / 5, 1920 / 5)

  coloreUno = get(fx * 4 + 2, fy * 4 + 1); // pick up the background color
  coloreDue = get(fx * 4, fy * 4); // pick up the stroke color
  print("coloreUno: " + coloreUno, "coloreDue: " + coloreDue);

  push()
  scale(k); // scale of the sketch
  translate(-fx * 4, -fy * 4); // translate of the whole sketch
  noStroke()
  fill(coloreUno)
  rect(0, 0, 2, 2)
  fill(coloreDue)
  rect(3, 0, 2, 2)
  pop()

  pop()
  push()
  translate(fx, fy); // translate of the whole sketch
  scale(1 / k); // scale of the sketch

  if (isDrawing) {
    var point = {
      x: (mouseX - fx) * k, // compensation of translate and previous sketch, both in x and in y
      y: (mouseY - fy) * k
    };
    currentPath.push(point);
  }

  stroke(coloreUno);
  strokeWeight(5);
  noFill();

  for (var i = 0; i < drawing.length; i++) {
    path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
  pop()


  translate(fx * 4, fy * 4); // translate of the whole sketch
  scale(1 / k); // scale of the sketch

  image(img1, 0, 0, 1080 / 5, 1920 / 5)

}
