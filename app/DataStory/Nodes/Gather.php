<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Gather extends NodeModel
{
    public function run()
    {
        $features = $this->input();

        $this->output($features);
    }
}