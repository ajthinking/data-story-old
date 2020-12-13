<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;
use App\DataStory\Parameters\AttributeName;
use App\DataStory\Parameters\Number;
use App\DataStory\Parameters\String_;

class Cloner extends NodeModel
{
    const CATEGORY = Workflow::class;

    public static function describeParameters($data = [])
    {
        return [
            'node_name' => String_::make()->default('Clone'),
            'number_of_clones' => String_::make()->default(10),
            'clone_id_attribute' => String_::make()->default('clone_id'),
            'clone_id_attribute_start_value' => String_::make()->default(0),
        ];
    }



    public function run()
    {
        $features = $this->input()->map(function($original) {
            $clones = collect()->times(
                $this->getParameter('number_of_clones'),
                function($index) use($original) {
                    $clone = clone $original;
                    $cloneIdAttribute = $this->getParameter('clone_id_attribute');
                    $clone->$cloneIdAttribute = $index - 1 + $this->getParameter('clone_id_attribute_start_value'); 
                    return $clone;
                }
            );

            return collect([$original])->concat($clones);
        })->flatten(1);

        $this->output($features);
    }
}