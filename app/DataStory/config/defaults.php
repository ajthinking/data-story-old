<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Available Nodes
    |--------------------------------------------------------------------------
    |
    | These nodes will be available in the story workbench
    |
    */    
    'nodes' => [
        App\DataStory\Nodes\EloquentReader::class,
        App\DataStory\Nodes\Inspector::class,
        App\DataStory\Nodes\Pass::class,
    ]
];