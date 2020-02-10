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
  <img src="assets/logo.png" align="middle"/>
  <h1 style="color:white; text-align: center"></h1>
  <h1 style="position: absolute;  left: 10%; top: 48%;">Try to merge the previous scribble in your own drawing!</h1>
  <h1 style="position: absolute;  right: 10%; top: 48%;">When you're done, press the Loop button in the bottom-right corner.</h1>
  <h1 style="position: absolute; bottom: 2%;color:white; left: 43%;"></h1>



  <div class="content">
    <iframe src="scribble.php" style="width:100%;border:none;height:100%" />
  </div>

</body>
</html>
