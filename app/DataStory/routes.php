<?php

use App\DataStory\DiagramModel;
use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::view('datastory', 'welcome');

/**
 * API ROUTES
 */
Route::post('datastory/api/run', App\DataStory\API\RunAction::class);

Route::post('datastory/api/run', function() {
    $diagram = DiagramModel::deserialize(
        json_decode(
            request()->input('model')
        )
    );

    $runner = new App\DataStory\API\RunAction;
    $diagram = $runner($diagram);

    return [
        'status' => 200,
        'diagram' => $diagram,
        'logs' => [],
        'executionTime' => 0.31,
    ];
});