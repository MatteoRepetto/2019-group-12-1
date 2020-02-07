var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;
var sfondo;
var counter = 0;

var k =  Math.random() * (1.9 - 1.3) + 1.3; // creo variabili randomiche per scalare e spostare lo sketch da completare - scale tra 1/3 e 1/2 [da definire meglio]
var fx = Math.random() * (1080 / 6 * ((k - 1) / k) - 1) + 1; // utilizzo di Math.round perchè prima della funzione draw e perchè globali [da definire meglio o valori di traslazione]
var fy = Math.random() * (1920 / 6 * ((k - 1) / k) - 1) + 1;
// var r  = Math.random() * (60 + 60) + 60;


function setup() {
  canvas = createCanvas(1080 / 4, 1920 / 4);
  pg = createGraphics(1080 / 4, 1920 / 4);
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

  sfondo = new SfondoRect();
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}


console.log(Math.round(fx), Math.round(fy), Math.round(k));

function draw() {

  canvas.mouseOut(endPath);

  // rotate(r)

  if (counter == 0) {
    push()
      translate(fx, fy); // traslazione dello sketch complessivo
      scale(1 / k); // scale dello sketch
      background('gold');
      sfondo.display();
      sfondo.displayDraw()
      sfondo.drawing();
    pop()
  }

  if (counter == 1) {
      sfondo.bg = 'gold'
      background('tomato');
      translate(fx, fy); // traslazione dello sketch complessivo
      scale(1 / k); // scale dello sketch
      sfondo.display();
      translate(fx, fy); // traslazione dello sketch complessivo
      scale(1 / k); // scale dello sketch
      sfondo.displayDraw()

      push()
        translate(0,0); // traslazione dello sketch complessivo
        scale(2); // scale dello sketch
        sfondo.drawing();
      pop()


  }

  // if (counter == 2) {
  //
  //   sfondo.bg = 'tomato'
  //   background('gold');
  //
  //   // var sfondo = rect(0,0,windowHeight/2.2,windowWidth/2.2) // rettangolo funge da sfondo del canvas originale, il fattore scale 2.2 funziona ma non si sa bene il perchè, k invece sfattona. Bisogna scambiare height e width per fatlo andare
  //   push()
  //     // translate(fx, fy); // traslazione dello sketch complessivo
  //     // scale(1 / k); // scale dello sketch
  //     sfondo.display();
  //     sfondo.displayDraw()
  //   pop()
  //   push()
  //   sfondo.drawing();
  //   pop()
  // }


}

function keyPressed() {
  // saveCanvas('canvas', 'jpg');
  // saveFrames('prova','png',0.1,1,[callback])
  canvas.drop(gotFile);
}

function gotFile(f) {
  var base64result = f.data.substr(f.data.indexOf(',') + 1); //take out the leading base64 description, which seems to mess things up
  var blob = b64toBlob(base64result, 'image/jpeg'); //enhance this to support common image formats
 //then upload this blob as you would a typical input type=file
}

//from: <a href="http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript" target="_blank" rel="nofollow">http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript</a>
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function saveDrawing() {
  counter++
  var ref = database.ref('drawings');
  var data = {
    name: 'ScribbleLoop',
    drawing: drawing,
    position: random(10)
  };
  var result = ref.push(data, dataSent);
  // console.log(result.key);

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

    // console.log(key);
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
  // translate(100, 108)
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    // translate(200, 108)
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;

    //console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
}

class SfondoRect {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.base = 1080/4;
    this.altezza = 1920/4;
    this.bg = 'gold'
  }

  display() {
    pg.background(this.bg)
    // pg.position(this.x, this.y)
    // rectMode(CORNER)

    image(pg, 0, 0);
    // rect(this.x, this.y, this.base, this.altezza);
  }

  drawing() {
    if (isDrawing) {
      var point = {
        x: (mouseX - fx) * k, // compensazione di traslazione e sketch precedente, sia in x che in y
        y: (mouseY - fy) * k
      };
      currentPath.push(point);
    }
  }

  displayDraw() {
    stroke('tomato');
    strokeWeight(5);
    noFill();
    if (counter >= 1) {
      stroke('red');
}
    var path
    for (var i = 0; i < drawing.length; i++) {
      path = drawing[i];
      beginShape();
      for (var j = 0; j < path.length; j++) {
        vertex(path[j].x, path[j].y);
      }
      endShape();
      if (counter == 1) {


      translate(-fx,fy); // traslazione dello sketch complessivo
      scale(k)
      beginShape();
      for (var j = 0; j < path.length; j++) {
        vertex(path[j].x, path[j].y);
      }
      endShape();
      }
    }
  }


}
