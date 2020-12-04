<?php

namespace App\DataStory\API;

use App\DataStory\DiagramModel;

class RunAction
{
    public function __invoke(DiagramModel $diagram)
    {    
        // Register diagram globally
        app()->instance('DiagramModel', $diagram);
        
        foreach($diagram->data->executionOrder as $nodeId) {
            
            $node = $diagram->find($nodeId);

            $runner = $node->data->runner;
            
            (new $runner($node))->run();
        }

        return $diagram;
    }
}