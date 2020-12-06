<?php

namespace App\DataStory;

class NodeCatalogue
{
    public static function make()
    {
        return new static;
    }

    public function toArray()
    {
        return collect(config('data-story.nodes'))->map(function($class) {
            return $class::describeVariations();
        })->flatten(1)->toArray();
    }

    public function spawners()
    {
        return [];
    }
}