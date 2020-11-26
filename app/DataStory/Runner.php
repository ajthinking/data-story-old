<?php

namespace App\DataStory;

class Runner
{
    public function __construct()
    {
        
    }

    public static function make()
    {
        return new static;
    }

    public function run($manipulator)
    {
        return $manipulator->run();
    }
}