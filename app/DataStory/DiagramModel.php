<?php

namespace App\DataStory;

use stdClass;

class DiagramModel
{
    public function __construct(stdClass $data)
    {
        $this->data = $data;
    }

    public function find($id)
    {
        return $this->nodeLayer()->models->$id;    
    }

    public function bindDataToPort($portId, $data)
    {
        $this->nodeLayer()->models;
    }

    protected function nodeLayer()
    {
        return $this->data->layers[1];
    }
}