<?php

use App\DataStory\Nodes\EloquentReader;
use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::get('datastory', function() {
    return view('welcome', [
        'dataStoryCapabilities' => [
            EloquentReader::describe(),
            // Pass::describe(),
            // Inspector::describe(),
        ]
    ]);
});