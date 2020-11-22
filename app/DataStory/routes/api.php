<?php

use Illuminate\Support\Facades\Route;

Route::prefix('datastory/api', function() {
    Route::post('run', App\DataStory\API\Run::class);
});
