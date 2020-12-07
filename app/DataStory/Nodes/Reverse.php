<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Reverse extends NodeModel
{
    public function run()
    {
        $items = $this->input();

        $this->output($items->reverse());
    }
}