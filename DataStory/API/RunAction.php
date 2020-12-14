<?php

namespace DataStory\API;

use DataStory\DiagramModel;

class RunAction
{
    public function __invoke(DiagramModel $diagram)
    {    
        return $diagram->run();
    }
}