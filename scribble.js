
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

var k = Math.random() * (1.9 - 1.3) + 1.3; // creo variabili randomiche per scalare e spostare lo sketch da completare - scale tra 1/3 e 1/2 [da definire meglio]
var fx = Math.random() * (1080 / 8 * ((k - 1) / k) - 1); // utilizzo di Math.round perchè prima della funzione draw e perchè globali [da definire meglio o valori di traslazione]
var fy = Math.random() * (1920 / 8 * ((k - 1) / k) - 1);

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath);
  canvas.parent('createImg');
  canvas.mouseReleased(endPath);
  img1 = loadImage(phpImage)
  console.log(phpImage)
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
  erase = 1
  isErasing = true
  console.log(erase)
  // drawing = []; cancella tutto
}

function drawLine() {
  erase = 0;
  console.log(erase)
}

console.log(Math.round(fx), Math.round(fy), Math.round(k));
function draw() {

  push()
  translate(fx * 4, fy * 4); // traslazione dello sketch complessivo
  scale(1 / k); // scale dello sketch
  background(coloreDue);
  image(img1, 0, 0, 1080 / 5, 1920 / 5)

  coloreUno = get(fx * 4+1, fy * 4+1); // prendo il colore di sfondo
  coloreDue = get(fx * 4, fy * 4); // prendo il colore di traccia

  push()
  scale(k); // scale dello sketch
  translate(-fx * 4,-fy * 4); // traslazione dello sketch complessivo
    noStroke()
    fill(coloreUno)
    rect(0,0,2,2)
    fill(coloreDue)
    rect(3,0,2,2)
  pop()

  pop()
  push()
  translate(fx, fy); // traslazione dello sketch complessivo
  scale(1 / k); // scale dello sketch

  if (isDrawing) {
    var point = {
      x: (mouseX - fx) * k, // compensazione di traslazione e sketch precedente, sia in x che in y
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

  if (erase == 1) {
    push()
    translate(fx, fy); // traslazione dello sketch complessivo
    scale(1 / k); // scale dello sketch

    if (isDrawing) {
      console.log('i')
      var pointErase = {
        x: (mouseX - fx) * k, // compensazione di traslazione e sketch precedente, sia in x che in y
        y: (mouseY - fy) * k
      };
      currentErase.push(pointErase);
    }
    stroke(coloreDue);
    strokeWeight(30);
    noFill();

    for (var i = 0; i < drawingErase.length; i++) {
      pathErase = drawingErase[i];

      beginShape();
      for (var j = 0; j < pathErase.length; j++) {
        vertex(pathErase[j].x, pathErase[j].y);
      }
      endShape();
    }
    pop()

  }

  translate(fx * 4, fy * 4); // traslazione dello sketch complessivo
  scale(1 / k); // scale dello sketch

  image(img1, 0, 0, 1080 / 5, 1920 / 5)

}
