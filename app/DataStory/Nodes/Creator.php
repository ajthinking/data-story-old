<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;

class Creator extends NodeModel
{
    const IN_PORTS = [];

    const CATEGORY = Workflow::class;

    public function run()
    {
        $features = collect()->times(10, function($i) {
            return (object) [
                'creation_sequence_id' => $i
            ];
        });

        // Pass does nothing!

        $this->portNamed('Output')->data = $features;
    }
}