<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>

body {
  background-color: black;
}

/* The screen (or content) of the device */
.content {
  position: absolute;
  width: 360px;
  height: 640px;
  background: white;
  left:50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
</head>
<body>

  <div class="content">
    <iframe src="scribble.php" style="width:100%;border:none;height:100%" />
  </div>

</body>
</html>
