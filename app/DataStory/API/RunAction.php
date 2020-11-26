<?php

namespace App\DataStory\API;

use App\DataStory\EloquentReader;
use App\DataStory\Runner;

class RunAction
{
    public function __invoke()
    {
        $diagram = (object) request()->input('diagram');

        $reader = new EloquentReader(
            $diagram->class
        );

        // Simulate reading only one
        $results = Runner::make()->run($reader);

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