<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;

class Cloner extends NodeModel
{
    const CATEGORY = Workflow::class;

    public function run()
    {
        $features = $this->input()->map(function($feature) {
            return collect([
                $feature,
                clone $feature
            ]);
        })->flatten(1);

        $this->output($features);
    }
}