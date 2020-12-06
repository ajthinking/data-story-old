<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;

class Cloner extends NodeModel
{
    const CATEGORY = Workflow::class;

    public function run()
    {
        $features = $this->getDataAtPortNamed('Input');

        // Pass does nothing!

        $features = $features->map(function($feature) {
            return collect([
                $feature,
                clone $feature
            ]);
        })->flatten(1);

        $this->portNamed('Output')->data = $features;
    }
}