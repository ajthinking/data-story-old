<?php

namespace App\DataStory\API;

use App\DataStory\DiagramModel;
use App\DataStory\EloquentReader;

class RunAction
{
    public function __invoke()
    {
        // Create a DiagramModel wrapper instance
        $diagram = new DiagramModel(
            json_decode(request()->input('model'))
        );

        // Register instance globally
        app()->instance('DiagramModel', $diagram);

        // Front end has sorted the manipulators
        $executionOrder = request()->input('executionOrder');

        foreach($executionOrder as $nodeId) {
            $runner = $this->getRunner(
                $diagram->find($nodeId)
            );

            //$runner::run();
        }

        return [
            'diagram' => $diagram
        ];
    }

    protected function getRunner($nodeId)
    {
        $node = app('DiagramModel')->find($nodeId);
        logger(json_encode($node));
    }
}