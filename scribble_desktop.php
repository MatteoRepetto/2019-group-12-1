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

  <h1 style="color:white; text-align: center">logo</h1>
  <h1 style="position: absolute; color:white; left: 10%; top: 48%;">scribble + breve testo</h1>
  <h1 style="position: absolute; color:white; right: 10%; top: 48%;">scribble + breve testo</h1>
  <h1 style="position: absolute; bottom: 2%;color:white; left: 43%;">deve essere figo</h1>



  <div class="content">
    <iframe src="scribble.php" style="width:100%;border:none;height:100%" />
  </div>

</body>
</html>
