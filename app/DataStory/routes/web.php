<?php

use Illuminate\Support\Facades\Route;

Route::view('datastory', 'welcome');

Route::prefix('datastory/api', function() {
    Route::post('run', App\DataStory\API\Run::class);
});
