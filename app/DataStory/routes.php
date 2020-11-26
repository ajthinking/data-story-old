<?php

use Illuminate\Support\Facades\Route;

/**
 * WEB ROUTES
 */
Route::view('datastory', 'welcome');

/**
 * API ROUTES
 */
Route::post('datastory/api/run', App\DataStory\API\RunAction::class);
