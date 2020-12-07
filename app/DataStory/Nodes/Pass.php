<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;

class Pass extends NodeModel
{
    const CATEGORY = Workflow::class;

    public function run()
    {
        // Pass does nothing!
        $this->output(
            $this->input()
        );
    }
}