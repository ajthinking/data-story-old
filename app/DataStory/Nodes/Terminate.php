<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Terminate extends NodeModel
{
    public function run()
    {
        throw new Terminate;
    }
}