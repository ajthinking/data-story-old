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

        //return [$diagram];

        foreach($executionOrder as $nodeId) {
            $node = $diagram->find($nodeId);
            $runner = $node->dataStoryAction;

            (new $runner($node))->run();

            return [
                'hey101' => 'The story ran successfully!'
            ];
        }
    }
}