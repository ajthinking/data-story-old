<?php

namespace App\DataStory;

class Inspector
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