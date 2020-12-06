<?php

namespace App\DataStory\API;

use App\DataStory\DiagramModel;

class RunAction
{
    public function __invoke(DiagramModel $diagram)
    {    
        return $diagram->run();
    }
}