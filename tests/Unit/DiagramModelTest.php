<?php

namespace Tests\Unit;

use App\DataStory\DiagramModel;
use Tests\TestCase;

class DiagramModelTest extends TestCase
{
    public function test_basic_execution()
    {
        $diagram = $this->sampleDiagram();

        $diagram->registerGlobal()->run();

        $this->assertInstanceOf(DiagramModel::class, $diagram);

        $this->assertTrue(true);
    }

    // public function test_diagram_capabilities()
    // {
    //     $capabilities = DiagramModel::capabilities();
    // }

    protected function sampleDiagram()
    {
        return DiagramModel::deserialize(
            json_decode(
                file_get_contents(__DIR__ . '/sampleDiagram.json')
            )
        );
    }
}