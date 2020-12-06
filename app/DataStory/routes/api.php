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