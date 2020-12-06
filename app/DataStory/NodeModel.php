<?php

namespace App\DataStory;

use stdClass;

abstract class NodeModel
{
    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Output'];

    const CATEGORY = 'UNCATEGORIZED';

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

    public function run()
    {

    }

    public static function describe($data = [])
    {
        return (object) [
            'class' => self::class,
            'category' => static::CATEGORY,
            'signature' => 'SIGNATURE',
            'inPorts' => self::IN_PORTS,
            'outPorts' => self::OUT_PORTS,
        ];
    }
    
    public static function describeVariations($data = [])
    {
        return [
            static::describe()
        ];
    }
}