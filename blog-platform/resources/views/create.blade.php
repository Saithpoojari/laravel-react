<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create Post</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/app.jsx'],['resources/css/app.css'])
</head>
<body>
    <div id="app" data-page="create"></div>
</body>
</html>