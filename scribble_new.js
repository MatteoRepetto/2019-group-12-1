
var img1;
var coloreUno = '';
var coloreDue = '';
// var coloreTre = 'black';
// var coloreQuattro = 'black';
var path;
var pathErase;

var phpImage;

var erase = 0;

var drawing = [];
var currentPath = [];
var isDrawing = false;

var k = Math.random() * (1.9 - 1.3) + 1.3; // creo variabili randomiche per scalare e spostare lo sketch da completare - scale tra 1/3 e 1/2 [da definire meglio]
var fx = Math.random() * (1080 / 8 * ((k - 1) / k) - 1); // utilizzo di Math.round perchè prima della funzione draw e perchè globali [da definire meglio o valori di traslazione]
var fy = Math.random() * (1920 / 8 * ((k - 1) / k) - 1);

function preload() {
  img1 = loadImage(phpImage)
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mousePressed(startPath);
  canvas.parent('createImg');
  canvas.mouseReleased(endPath);
  console.log(phpImage)
  push()
  translate(fx * 4, fy * 4); // traslazione dello sketch complessivo
  scale(1 / k); // scale dello sketch

  image(img1, 0, 0, 1080 / 5, 1920 / 5)

  coloreUno = get(fx * 4 + 5, fy * 4 + 5); // prendo il colore di sfondo
  coloreDue = get(fx * 4, fy * 4); // prendo il colore di traccia


  pop()
  background(coloreDue);
}

function startPath() {
  $('#controller').fadeOut('fast')
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function touchStarted() {
  $('#controller').fadeOut('fast')
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
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
  console.log(erase)
  // drawing = []; cancella tutto
}

function drawLine() {
  erase = 0;
  console.log(erase)
  // drawing = []; cancella tutto
}



console.log(Math.round(fx), Math.round(fy), Math.round(k));

function draw() {
  // background(coloreDue);

  push()
  translate(fx * 4, fy * 4); // traslazione dello sketch complessivo
  scale(1 / k); // scale dello sketch
  image(img1, 0, 0, 1080 / 5, 1920 / 5)

  push()
  scale(k); // scale dello sketch
  translate(-fx * 4,-fy * 4); // traslazione dello sketch complessivo

   if (isDrawing) {
    stroke(coloreUno);
    strokeWeight(3)
    line(mouseX, mouseY ,pmouseX, pmouseY )
} else if (erase == 1) {
  console.log(erase)
  stroke(coloreDue);
  strokeWeight(3)
  line(mouseX, mouseY ,pmouseX, pmouseY )

}
    noStroke()
    fill(coloreDue)
    rect(0,0,1,1)
    fill(coloreUno)
    rect(1,0,1,1)

  pop()

  if (erase) {
    push()
    translate(fx, fy); // traslazione dello sketch complessivo
    scale(1 / k); // scale dello sketch



    // if (isDrawing) {
    //   var point = {
    //     x: (mouseX - fx) * k, // compensazione di traslazione e sketch precedente, sia in x che in y
    //     y: (mouseY - fy) * k
    //   };
    //   currentPath.push(point);
    // }
    // stroke(coloreDue);
    // strokeWeight(5);
    // noFill();
    //
    // for (var i = 0; i < drawing.length; i++) {
    //   path = drawing[i];
    //   beginShape();
    //   for (var j = 0; j < path.length; j++) {
    //     vertex(path[j].x, path[j].y);
    //   }
    //   endShape();
    // }
    pop()
  } else {
    fill(coloreUno);
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

  }
}

function sendCanvas() {
  document.getElementById('img').style.position = "absolute";
  document.getElementById('newimg').style.position = "relative";

  // push()
  //   translate(-fx,-fy)
  //   scale(k)
  //   coloreQuattro = get(1, 0); // prendo il colore di sfondo
  //   coloreTre = get(fx, fy); // prendo il colore di traccia
  //   print('3', coloreTre)
  //   print('4', coloreQuattro)
  //
  // pop()
  // new p5(
  //   function(p) {
  //     p.setup = function() {
  //       drawing = [];
  //       p.createCanvas(windowWidth, windowHeight);
  //
  //
  //     }
  //
  //     p.mousePressed = function() {
  //       $('#controller').fadeOut('fast')
  //       startPath()
  //
  //     }
  //     p.mouseReleased = function() {
  //       $('#controller').fadeIn('fast')
  //       endPath()
  //     }
  //
  //     p.draw = function() {
  //
  //
  //       p.background(coloreQuattro);
  //
  //       p.translate(fx, fy); // traslazione dello sketch complessivo
  //       p.scale(1 / k); // scale dello sketch
  //
  //       if (isDrawing) {
  //         var point = {
  //           x: (mouseX - fx) * k, // compensazione di traslazione e sketch precedente, sia in x che in y
  //           y: (mouseY - fy) * k
  //         };
  //         currentPath.push(point);
  //       }
  //
  //         p.stroke(coloreTre);
  //         p.strokeWeight(5);
  //         p.noFill();
  //         var path
  //         for (var i = 0; i < drawing.length; i++) {
  //           path = drawing[i];
  //           p.beginShape();
  //           for (var j = 0; j < path.length; j++) {
  //             p.vertex(path[j].x, path[j].y);
  //           }
  //           p.endShape();
  //       }
  //     }
  //   }
  // );

  // document.getElementById('img').style.transform = "translate(" + fx + "px," + fy + "px) scale(" + 1 / k + ")";
}
