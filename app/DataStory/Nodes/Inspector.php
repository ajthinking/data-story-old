<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Inspector extends NodeModel
{
    public function __construct($node)
    {
        $this->node = $node;
    }

    public function run()
    {
        $this->node->features = $this->node->getDataAtPortNamed('Input');
    }
}