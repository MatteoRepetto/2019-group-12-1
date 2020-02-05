
var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup() {
  canvas = createCanvas(1080/4, 1920/4);

  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDa3XeVIjIXi-b5jLdEDEtmoDecHUWWlFc",
    authDomain: "scribblealpha.firebaseapp.com",
    databaseURL: "https://scribblealpha.firebaseio.com",
    projectId: "scribblealpha",
    storageBucket: "scribblealpha.appspot.com",
    messagingSenderId: "646981921563",
    appId: "1:646981921563:web:94ada1169cb912296801be"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  var params = getURLParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
    showDrawing(params.id);
  }

  var ref = database.ref('drawings');
  ref.on('value', gotData, errData);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

var k  = Math.random() * (3 - 2) + 2;            // creo variabili randomiche per scalare e spostare lo sketch da completare - scale tra 1/3 e 1/2 [da definire meglio]
var fx = Math.random() * (1080/6 - 1) + 1;      // utilizzo di Math.round perchè prima della funzione draw e perchè globali [da definire meglio o valori di traslazione]
var fy = Math.random() * (1920/6 - 1) + 1;

console.log(Math.round(fx),Math.round(fy),Math.round(k));

function draw() {

  canvas.mouseOut(endPath);

  translate(fx,fy); // traslazione dello sketch complessivo
  scale(1/k)  ;     // scale dello sketch

  background('tomato');
  fill('gold')
  noStroke()
  rectMode(CORNER)
  rect(0,0,windowWidth/2.2,windowHeight/2.2) // rettangolo funge da sfondo del canvas originale, il fattore scale 2.2 funziona ma non si sa bene il perchè, k invece sfattona

  if (isDrawing) {
    var point = {
      x: (mouseX-fx)*k,   // compensazione di traslazione e sketch precedente, sia in x che in y
      y: (mouseY-fy)*k
    };
    currentPath.push(point);
  }

  stroke(255);
  strokeWeight(3);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];

    beginShape();
    for (var j = 0; j < path.length; j++) {
          vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: 'ScribbleLoop',
    drawing: drawing,
    position: random(10)
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }

}

function gotData(data) {
  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    console.log(key);
    var li = createElement('li', '');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);

    var perma = createA('?id=' + key, 'permalink');
    perma.parent(li);
    perma.style('padding', '4px');

    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {
  //console.log(arguments);
  // if (key instanceof MouseEvent) {
     // key = this.html();
  // }

  var ref = database.ref('drawings/' + key);
  translate(100,108)
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    translate(200,108)
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;

    //console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
}
