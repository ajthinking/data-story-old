<?php

namespace App\DataStory;

use stdClass;

class NodeModel
{
    public string $id;

    public stdClass $data;

    public static function deserialize(stdClass $serialized)
    {
        $node = new static();

        $node->id = $serialized->id;

        $node->ports = $serialized->ports;

        $node->data = $serialized;
        
        return $node;
    }

    public function portNamed($name)
    {
        return collect($this->ports)->where('name', $name)->first();
    }

    public function getDataAtPortNamed($name)
    {
        $port = $this->portNamed($name);

        return collect($port->links)->map(function($linkId) {
            $link = $this->diagram()->find($linkId);
            $source = $this->diagram()->find($link->sourcePort);
            return $source->data;
        })->flatten();
    }

    public function diagram()
    {
        return app('DiagramModel');
    }
}