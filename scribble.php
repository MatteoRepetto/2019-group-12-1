<!DOCTYPE html>
<html>

<head>
  <title>  scribbleLoop | scribble</title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <script language="javascript" type="text/javascript" src="addons/p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="addons/p5.dom.min.js"></script>
  <script language="javascript" type="text/javascript" src="addons/p5.sound.min.js"></script>
  <link rel="stylesheet" href="/style.css">
  <script language="javascript" type="text/javascript" src="scribble.js"></script>
  <style media="screen">
  body {
    overflow-x: hidden;
    overflow-y: hidden;
  }
  </style>
</head>

<body>

<!-- start php -->
<?php // code to save var phpImage that is used in scribble.js
  $imagesDir = 'newSketches/';
  $images = glob($imagesDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);
  $randomImage = $images[array_rand($images)];

?>

<script type="text/javascript">

  phpImage = <?php echo json_encode($randomImage); ?>;

</script>
<!-- end php -->


  <div id="screen">
    <div id="createImg"></div>
    <div id="img">
      <img src="" id="newimg"/></div>
  </div>
  <div id="controller">
    <img src="assets/home.png" id="homeButton"  type="button" onclick="window.open('index.php', '_top')" ontouchstart="window.open('index.php', '_top')"/>
    <img src="assets/loop.png" id="saveLoop" onclick="salvaLoop()" ontouchstart="salvaLoop()"/>
    <img src="assets/erase.png" id="eraseButton" onclick="eraseLine()" ontouchstart="eraseLine()"/>
  </div>

  <div id="modal">
    <div id="popup">
        <p id="testo">Great Job!</br>Your artwork is ready to be sent to the Loop.</p>
      <span id="closePopup" onclick="chiudiPopUp()" ontouchstart="chiudiPopUp()">x</span>

      <a href="#" id="galleryLink">
        <div id="buttonGallery"  onclick="galleria()" ontouchstart="galleria()">Save in the Loop</div>
        <div id="buttonGallery2"  onclick="apriGalleria()" ontouchstart="apriGalleria()">Go to the Gallery Loop</div>
        <div id="buttonGallery3"  onclick="scribbleAgain()" ontouchstart="scribbleAgain()">Scribble again!</div>
      </a>
    </div>
  </div>

  <!-- use of jquery to optimize with PHP + AJAX language -->
  <script>
  $('#buttonGallery2').hide()
  $('#buttonGallery3').hide()
// show popup when button is pressed
  function salvaLoop() {
    $('#controller').fadeOut()
    $('#modal').fadeIn()
  }

// press x and close popup
  function chiudiPopUp() {
    $('#controller').fadeIn()
    $('#modal').fadeOut()
  }

  var contaGallery = 0 // var to save sketch once

    function galleria() {
      html2canvas($("#screen"), { //use of library html2canvas
       onrendered: function(canvas) {
         var imgsrc = canvas.toDataURL("image/png");

         $("#newimg").attr('src', imgsrc);
         $("#img").show();

         $("#newimg").show();
         $("#createImg").hide();
         var dataURL = canvas.toDataURL();

       if (contaGallery == 0) { //save file, execute only once
         $.ajax({
           type: "POST",
           url: "server.php",
           data: {
             imgBase64: dataURL
           }
         }).done(function(o) {
           console.log('saved');
           contaGallery = 1 // prevent a new saving

          $('#buttonGallery').hide()
          // $('#buttonGallery2').show()
          $('#buttonGallery3').show()
          $("#testo").text('Sent! Thank you for your contribution'); //change popup text
         });
       }
     }
      });

    }
    function apriGalleria() {
      window.open("gallery.php","_self")
    }
    function scribbleAgain() {
      window.open("scribble_desktop.php","_self")
    }



  </script>
</body>

</html>
