<!DOCTYPE html>
<html>
<head>
  <title>scribbleLoop | scribble</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/style.css">
  <link rel="shortcut icon" href="assets/squaredloop.png">
  <style>

    body {
        background-image:url(./assets/pattern.png);
        height: 100%;
        background-size: cover;
    }

    /* The screen (or content) of the device */
    .content {
      position: absolute;
      width: 360px;
      height: 640px;
      background: white;
      left:50%;
      top: 55%;
      transform: translate(-50%, -50%);
    }
  </style>
</head>

<body>
  <img src="assets/logo.png" id="mylogo" style="margin-top: 5vh"/>

  <h1 style="position: absolute;  left: 10%; top: 50%;">Try to merge the previous scribble <br> in your own drawing! </br></h1>
  <h2 style="position: absolute;  right: 10%; top: 50%;">When you're done, <br> press the Loop button <br> in the bottom-right corner. </br></h1>

  <div class="content">
    <iframe src="scribble.php" style="width:100%;border:none;height:100%" />
  </div>

</body>
</html>
