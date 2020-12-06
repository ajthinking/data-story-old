<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Pass extends NodeModel
{
    public function __construct($node)
    {
        $this->node = $node;
    }

    public function run()
    {
        $features = $this->node->getDataAtPortNamed('Input');

        // Pass does nothing!

        $this->node->portNamed('Output')->data = $features;
    }
}