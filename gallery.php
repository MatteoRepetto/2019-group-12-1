<!DOCTYPE html>
<html>

<head>
  <title>scribbleLoop | gallery</title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
  <link rel="stylesheet" href="/style.css">
  <script language="javascript" type="text/javascript" src="addons/p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="addons/p5.dom.min.js"></script>
  <script language="javascript" type="text/javascript" src="addons/p5.sound.min.js"></script>


</head>

<body>
  <img src="assets/home.png" id="homeButton"  type="button" onclick="window.open('index.php', '_top')"/>

  <div style="text-align: center; color: #9fdfff">
    <h1>scribble</br>gallery</h1>
  </div>
  <?php

  function beliefmedia_grid_gallery($dir = 'newSketches/', $columns = '3', $url = false, $width = '200') {

    $transient = md5(serialize(func_get_args()));

    $style = '<style>
      .bm-grid-' . $transient . ' {
        -webkit-column-count: 1;
        -webkit-column-gap: 10px;
        -webkit-column-fill: auto;
        -moz-column-count: 1;
        -moz-column-gap: 10px;
        -moz-column-fill: auto;
        column-count: 1;
        column-gap: 10px;
        padding: 30px;
        column-fill: auto;

      }

      .bm-grid-item-' . $transient . ' {
        display: inline-block;
        background: #ffb3ff;
        margin: 0 0 10px;
        padding: 3px 3px 0px 3px;
      }

      .bm-hr-grid-' . $transient . ' {
        display: inline-block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: .5em 10px;
        padding: 0;
      }

      .bm-grid-img-' . $transient . ' {
        width: 100%
      }



      @media (min-width: ' . $width['0'] . 'px) {
        .bm-grid-' . $transient . ' {
          display: inline-block;
          -webkit-column-count: 2;
          -moz-column-count: 2;
          column-count: 2;
        }
      }

      @media (min-width: ' . $width['1'] . 'px) {
        .bm-grid-' . $transient . ' {
          display: inline-block;
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
        }
      }

      @media (min-width: ' . $width['2'] . 'px) {
        .bm-grid-' . $transient . ' {
          display: inline-block;
          -webkit-column-count: ' . $columns . ';
          -moz-column-count: ' . $columns . ';
          column-count: ' . $columns . ';
        }
      }
      </style>';

    /* Scan all images in the image directory */
    $image_array = glob(rtrim($dir, '/') . '/*.{jpg,jpeg,png,gif}', GLOB_BRACE);

    foreach ($image_array AS $image) {
      $image = ($url !== false) ? rtrim($url, '/') . '/' . basename($image) : $image;
      $return .= '<div class="bm-grid-item-' . $transient . '"><img class="bm-grid-img-' . $transient . '" src="' . $image . '"></div>';
    }

    $return = '<div class="bm-grid-' . $transient . '">' . $style . $return . '</div>';

   return $return;
  }


  /* Usage */
  echo beliefmedia_grid_gallery();
?>
  </body>

</html>
