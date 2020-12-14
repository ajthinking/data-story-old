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
        App\DataStory\Nodes\Cloner::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Discover Nodes in a directory
    |--------------------------------------------------------------------------
    |
    | Automatically scan this directory for custom nodes
    |
    */    
    'discover-nodes-in-dir' => 'app/DataStory/Nodes',
];