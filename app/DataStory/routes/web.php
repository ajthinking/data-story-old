<?php

use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::get('datastory/{story?}', function() {

    return view('welcome', [
        //'dataStoryCapabilities' => DiagramModel::capabilities()
    ]);
});