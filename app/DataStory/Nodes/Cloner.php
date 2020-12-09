<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;

class Cloner extends NodeModel
{
    const CATEGORY = Workflow::class;

    public function run()
    {
        $this->number_of_clones = $this->data->options->parameters->number_of_clones;
        $this->clone_id_attribute = $this->data->options->parameters->clone_id_attribute;
        $this->clone_id_attribute_start_value = $this->data->options->parameters->clone_id_attribute_start_value;

        $features = $this->input()->map(function($original) {
            $clones = collect()->times($this->number_of_clones, function($index) use($original) {
                $clone = clone $original;
                $clone->{$this->clone_id_attribute} = $index - 1 + $this->clone_id_attribute_start_value; 
                return $clone;
            });

            return collect([$original])->concat($clones);
        })->flatten(1);

        $this->output($features);
    }

    public static function getParameters()
    {
        return [
            'number_of_clones'                  => 10,
            'clone_id_attribute'                => 'clone_id',
            'clone_id_attribute_start_value'    => 0,
        ];
    }
}