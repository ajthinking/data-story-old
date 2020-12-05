<?php

use App\DataStory\DiagramModel;
use App\DataStory\EloquentReader;
use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::get('datastory', function() {
    return view('welcome', [
        'dataStoryCapabilities' => json_encode([
            EloquentReader::describe(),
            // Pass::describe(),
            // Inspector::describe(),
        ]),
        'dummy' => 123
    ]);
});

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