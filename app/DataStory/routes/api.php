<?php

use App\DataStory\DiagramModel;
use Illuminate\Support\Facades\Route;

Route::post('datastory/api/run', function() {
    $diagram = DiagramModel::deserialize(
        json_decode(request()->input('model'))
    );

    $diagram->registerGlobal()->run();

    return [
        'status' => 200,
        'diagram' => $diagram,
        'logs' => [],
        'executionTime' => 0.31,
    ];
});

Route::post('datastory/api/save', function() {
    $filename = request()->input('filename'); 
    $content = request()->input('model');

    file_put_contents(
        app_path("DataStory/stories/$filename"),
        $content
    );
});