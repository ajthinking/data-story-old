<?php

namespace App\DataStory\API;

use App\DataStory\EloquentReader;
use App\DataStory\Runner;

class RunAction
{
    public function __invoke()
    {
        $diagram = (object) request()->input('diagram');
        return;

        // Simulate reading only one
        $results = Runner::make()->run();

        file_put_contents(
            storage_path('model'),
            serialize(
                $diagram->model
            )
        );

        return [
            'status' => 'success',
            'results' => $results,
            'model' => $diagram->model
        ];
    }
}