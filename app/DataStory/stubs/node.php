<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class NodeName extends NodeModel
{
    public function run()
    {
        $items = $this->input();

        $this->output($items);
    }
}