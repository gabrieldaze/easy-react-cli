module.exports.src =
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Easy React Application</title>
  <style>body, html { margin: 0; padding: 0; }</style>
</head>
<body>
  <div id="easy-react"></div>

  <!-- Adding React production library -->
  <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>

  <!-- Adding application script -->
  <script src="main.js"></script>
</body>
</html>`