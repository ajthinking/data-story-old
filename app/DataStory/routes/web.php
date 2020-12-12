<?php

use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::get('datastory', function() {

    return view('welcome', [
        //'dataStoryCapabilities' => DiagramModel::capabilities()
    ]);
});