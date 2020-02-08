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

  <script language="javascript" type="text/javascript" src="scribble_new.js"></script>

  <style>
    body {
      overflow-x: hidden;
      overflow-y: hidden;
      margin: 0;
      padding: 0;
      -webkit-touch-callout: none; /* iOS Safari */
   -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
       -ms-user-select: none; /* Internet Explorer/Edge */
           user-select: none; /* Non-prefixed version, currently
                                 supported by Chrome, Opera and Firefox */
    }
    #saveLoop {
      position: absolute;
      max-width: 40px;
      bottom: 20px;
      right: 30px;
      /* -webkit-filter: drop-shadow(5px 5px 5px #000);
      filter: drop-shadow(5px 5px 5px #000); */
    }

    #drawButton{
      position: absolute;
      max-width: 40px;
      bottom: 20px;
      left: 30px;
      /* -webkit-filter: drop-shadow(5px 5px 5px #000);
      filter: drop-shadow(5px 5px 5px #000); */
    }

    #eraseButton{
      position: absolute;
      max-width: 40px;
      bottom: 20px;
      left: 50vw;
      transform: translate(-20px,0px);
      /* -webkit-filter: drop-shadow(5px 5px 5px #000);
      filter: drop-shadow(5px 5px 5px #000); */
    }

    #homeButton{
      position: absolute;
      max-width: 40px;
      top: 20px;
      left: 30px;
      /* -webkit-filter: drop-shadow(5px 5px 5px #000);
      filter: drop-shadow(5px 5px 5px #000); */
    }

    #modal {
      display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.8); /* Black w/ opacity */    }

    #popup {
      position: absolute;
      width: 80vw;
      height: 40vh;
      background-color: black;
      border: 2px solid red;
      border-radius: 10px;
      left: 50%;
      top: 50%;
      transform: translate(-40vw, -40vw);
      z-index: 1000;
      margin: 0 auto;
      color:white;
      text-align: center;
      padding-top: 9vh;
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
    <a href="index.php"><img src="assets/home.png" id="homeButton" type="button"/></a>
    <img src="assets/loop.png" id="saveLoop" type="button" onclick="sendCanvas()"/>
    <img src="assets/draw.png" id="drawButton" type="button" onclick="drawLine()"/>
    <img src="assets/erase.png" id="eraseButton" type="button" onclick="eraseLine()"/>
  </div>

  <div id="modal">
    <div id="popup">
        Thank you!<br>Your scribble has been sent to the Loop, let's take a look
      <span id="closePopup" style="position: absolute; top: 1vh; right: 3vw; color:red; cursor: pointer">x</span>

      <a href="gallery.php">
        <div style="text-align:center; background:red; color:black; width:60vw; height: 5vh; margin-left: 10vw; margin-top: 20vh;padding-top: 2vh">go to the gallery</div>

      </a>
    </div>

  </div>

  <script>

    $(function() {
      $("#saveLoop").click(function() {

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
              url: "server.php",
              data: {
                imgBase64: dataURL
              }
            }).done(function(o) {
              console.log('saved');

              $('#controller').fadeOut()
              $('#modal').fadeIn()

              $("#closePopup").click(function() {
                $('#controller').fadeIn()
                $('#modal').fadeOut()
              })
            });
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
