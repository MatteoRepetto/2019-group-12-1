<!DOCTYPE html>
<html>

<head>
  <title></title>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"></script>

  <script language="javascript" type="text/javascript" src="addons/p5.min.js"></script>
  <script language="javascript" type="text/javascript" src="addons/p5.dom.min.js"></script>
  <script language="javascript" type="text/javascript" src="addons/p5.sound.min.js"></script>


</head>

<body>

  <div style="text-align: center">
    <h1>scribble gallery</h1>
  </div>
  <?php

  function beliefmedia_grid_gallery($dir = 'newSketches/', $columns = '3', $url = false, $width = '200') {

    /* Viewport width */

    /* Transient */
    $transient = md5(serialize(func_get_args()));

    $style = '<style>
      .bm-grid-' . $transient . ' {
        background: #ffffff;
        -webkit-column-count: 1;
        -webkit-column-gap: 10px;
        -webkit-column-fill: auto;
        -moz-column-count: 1;
        -moz-column-gap: 10px;
        -moz-column-fill: auto;
        column-count: 1;
        column-gap: 15px;
        padding: 15px;
        column-fill: auto;

      }

      .bm-grid-item-' . $transient . ' {
        display: inline-block;
        background: red;
        margin: 0 0 10px;
        padding: 3px 3px 0 3px;
        -webkit-column-break-inside: avoid;
        -moz-column-break-inside: avoid;
        column-break-inside: avoid;
      }

      .bm-hr-grid-' . $transient . ' {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: .5em 10px;
        padding: 0;
      }

      .bm-grid-img-' . $transient . ' {
        width: 100%
      }

      .bm_p_grid-' . $transient . ' {
        margin: 10px;
        font-size: .8em;
        font-family: arial;
        line-height: 1.5em;
      }

      @media (min-width: ' . $width['0'] . 'px) {
        .bm-grid-' . $transient . ' {
          -webkit-column-count: 2;
          -moz-column-count: 2;
          column-count: 2;
        }
      }

      @media (min-width: ' . $width['1'] . 'px) {
        .bm-grid-' . $transient . ' {
          -webkit-column-count: 3;
          -moz-column-count: 3;
          column-count: 3;
        }
      }

      @media (min-width: ' . $width['2'] . 'px) {
        .bm-grid-' . $transient . ' {
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
