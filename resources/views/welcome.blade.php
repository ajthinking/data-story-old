<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>DataStory</title>
        
        <link href="/css/app.css" rel="stylesheet">
    </head>
    <body class="bg-gray-700">
        <!-- attaching view data -->
        <script>
            window.dataStoryCapabilities = {!! json_encode($dataStoryCapabilities) !!}
        </script>
            
        <!-- the react app -->
        <div id="app"></div>
        <script type="text/javascript" src="/js/app.js"></script>

        <!-- ajthinkings font awesome kit -->
        <script src="https://kit.fontawesome.com/f9f7777401.js" crossorigin="anonymous"></script>


    </body>
</html>
