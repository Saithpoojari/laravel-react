<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel Blog</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/app.jsx'])
</head>
<body>
    <div id="app" data-page="home"></div>
    <div id="app" data-page="login"></div>
    
</body>
</html>