<?php

namespace App\DataStory;

class Inspector
{
    public function __construct($node)
    {
        $this->node = $node;
    }

    public function getIncomingData()
    {
        $this->node->incomingPortOrigins;
    }

    public function run()
    {
        //
    }
}