<?php

use App\DataStory\DiagramModel;
use App\DataStory\Nodes\EloquentReader;
use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::get('datastory', function() {

    return view('welcome', [
        'dataStoryCapabilities' => DiagramModel::capabilities()
    ]);
});