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
<?php // codice per salvare la variabile phpImage poi utilizzata in scribble.js
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
    <!-- <img src="assets/draw.png" id="drawButton"onclick="drawLine()"/> -->
    <img src="assets/erase.png" id="eraseButton" onclick="eraseLine()" ontouchstart="eraseLine()"/>
  </div>

  <div id="modal">
    <div id="popup">
        <p id="testo">Great Job!</br>Your artwork is ready to be send into the Loop.</p>
      <span id="closePopup">x</span>

      <a href="#" id="galleryLink">
        <div id="buttonGallery"  onclick="galleria()" ontouchstart="galleria()">save in the Loop</div>
        <div id="buttonGallery2"  onclick="apriGalleria()" ontouchstart="apriGalleria()">go to the gallery</div>

      </a>
    </div>
  </div>

  <!-- utilizzo di jquery per ottimizzazione con linguaggio PHP + AJAX -->
  <script>
  // $(function() {
  $('#buttonGallery2').hide()
// mostro il popup al premere del bottone
  function salvaLoop() {
    $('#controller').fadeOut()
    $('#modal').fadeIn()
  }

// nascondo il popup al premere della X
  function chiudiPopUp() {
    $('#controller').fadeIn()
    $('#modal').fadeOut()
  }
    // $("#saveLoop").click(function() {
    //   $('#controller').fadeOut()
    //   $('#modal').fadeIn()
    // });

    // nascondo il popup al premere della X
    // $("#closePopup").click(function() {
    //   $('#controller').fadeIn()
    //   $('#modal').fadeOut()
    // })
    var contaGallery = 0 // variabile per salvare solo una volta lo sketch

    function galleria() {
      html2canvas($("#screen"), { //utilizzo libreria html2canvas
       onrendered: function(canvas) {
         var imgsrc = canvas.toDataURL("image/png");

         $("#newimg").attr('src', imgsrc);
         $("#img").show();

         $("#newimg").show();
         $("#createImg").hide();
         var dataURL = canvas.toDataURL();

       if (contaGallery == 0) { //salvataggio effettivo del file, da eseguire una sola volta
         $.ajax({
           type: "POST",
           url: "server.php",
           data: {
             imgBase64: dataURL
           }
         }).done(function(o) {
           console.log('saved');
           contaGallery = 1 // impedisco un nuovo salvataggio

          $('#buttonGallery').hide()
          $('#buttonGallery2').show()
          $("#testo").text('Sent! Thanks for your contribution'); //cambio testo popup
         });
       }
     }
     });

    }
    function apriGalleria() {
      window.open("gallery.php","_self")
}



  </script>
</body>

</html>
