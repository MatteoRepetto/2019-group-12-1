<!DOCTYPE html>
<html>

<head>
  <title></title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

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
<?php
  $imagesDir = 'newSketches/';

  $images = glob($imagesDir . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

  $randomImage = $images[array_rand($images)];

?>

<script type="text/javascript">

  phpImage = <?php echo json_encode($randomImage); ?>;

</script>

  <div id="screen">
    <div id="createImg"></div>
    <div id="img">
      <img src="" id="newimg"/></div>
  </div>
  <div id="controller">
    <img src="assets/home.png" id="homeButton"  type="button" onclick="window.open('index.php', '_top')"/>
    <img src="assets/loop.png" id="saveLoop"/>
    <!-- <img src="assets/draw.png" id="drawButton"onclick="drawLine()"/> -->
    <img src="assets/erase.png" id="eraseButton" onclick="eraseLine()"/>
  </div>

  <div id="modal">
    <div id="popup">
        <p id="testo">Great Job!</br>Your artwork is ready to be send into the Loop.</p>
      <span id="closePopup">x</span>

      <a href="#" id="galleryLink">
        <div id="buttonGallery">save in the Loop</div>
      </a>
    </div>

  </div>

  <script>

    $(function() {
        $("#saveLoop").click(function() {
          $('#controller').fadeOut()
          $('#modal').fadeIn()
        });

        $("#closePopup").click(function() {
          $('#controller').fadeIn()
          $('#modal').fadeOut()
        })

var contaGallery = 0

      $("#buttonGallery").click(function() {
         html2canvas($("#screen"), {
          onrendered: function(canvas) {
            var imgsrc = canvas.toDataURL("image/png");

            $("#newimg").attr('src', imgsrc);
            $("#img").show();

            $("#newimg").show();
            $("#createImg").hide();
            var dataURL = canvas.toDataURL();

          if (contaGallery == 0) {
            $.ajax({
              type: "POST",
              url: "server.php",
              data: {
                imgBase64: dataURL
              }
            }).done(function(o) {
              console.log('saved');
              contaGallery = 1
             console.log(contaGallery);
             $("#buttonGallery").text('go to the gallery');
             $("#testo").text('Sended! Thank for your contribution');
             $("#galleryLink").attr('href','gallery.php');
            });
          }
        }
        });
      });


      // touch controls
      $("#saveLoop").on("tap",function() {

        html2canvas($("#screen"), {
          onrendered: function(canvas) {
            var imgsrc = canvas.toDataURL("image/png");

            $("#newimg").attr('src', imgsrc);
            $("#img").show();

            $("#newimg").show();
            $("#createImg").hide();
            var dataURL = canvas.toDataURL();

            $.ajax({
              type: "POST",
              // url: "http://www.pietroforino.com/test3/script.php", // due to the GitHub restrictions, we have to use an external domain which permitt the use of PHP
              url: "script.php", // da attivare per il local server, disattivando quello sopra
              data: {
                imgBase64: dataURL
              }
            }).done(function(o) {
              console.log('saved');
              $('#controller').fadeOut()
              $('#modal').fadeIn()

              $("#closePopup").on("tap",function() {
                $('#controller').fadeIn()
                $('#modal').fadeOut()
              })
            });
          }
        });
      });
    });

  </script>
</body>

</html>
