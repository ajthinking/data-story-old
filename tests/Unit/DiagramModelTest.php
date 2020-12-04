<?php

namespace Tests\Unit;

use App\DataStory\API\RunAction;
use App\DataStory\DiagramModel;
use App\DataStory\DiagramModelFactory;
use Tests\TestCase;

class DiagramModelTest extends TestCase
{
    public function test_basic_execution()
    {
        $diagram = DiagramModel::deserialize(
            json_decode(
                file_get_contents(__DIR__ . '/sampleDiagram.json')
            )
        );
        
        $runner = new RunAction;
        $runner($diagram);

        $this->assertTrue(true);
    }
}
