<?php

namespace App\DataStory;

use stdClass;

class DiagramModel
{
    public array $nodes;

    public array $links;

    public array $tags;

    public static function make()
    {
        return new static;
    }

    public function find($id)
    {
        return collect(
            array_merge($this->links(), $this->nodes(), $this->ports())
        )->where('id', $id)->first();
    }

    public function links($links = null) 
    {
        if($links === null) return $this->links;

        $this->links = $links;

        return $this;
    }

    public function nodes($nodes = null) 
    {
        if($nodes === null) return $this->nodes;

        $this->nodes = $nodes;

        return $this;
    }

    public function ports() 
    {
        return collect($this->nodes)->pluck('ports')->flatten()->toArray();
    }

    public function tag($id, $data)
    {
        $this->tags[$id] = $data;
    }

    public function tags()
    {
        return $this->tags;
    }

    public function bindDataToPort($portId, $data)
    {
        //
    }

    public static function deserialize($serialized)
    {
        $diagram = new DiagramModel();

        $diagram->links(
            collect(
                array_values((array) $serialized->layers[0]->models)
            )->map(function($link) {
                return $link;
            })->toArray()
        );

        $diagram->nodes(
            collect(
                array_values((array) $serialized->layers[1]->models)
            )->map(function($serializedNode) {
                return NodeModel::deserialize($serializedNode);
            })->toArray()
        );

        $diagram->data = $serialized;

        return $diagram;        
    }
}