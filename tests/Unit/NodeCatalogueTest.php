<?php

namespace Tests\Unit;

use App\DataStory\NodeCatalogue;
use Tests\TestCase;

class NodeCatalogueTest extends TestCase
{
    public function test_catalogue_to_array()
    {
        $catalogue = NodeCatalogue::make()->toArray();

        $this->assertIsArray($catalogue);

        dd($catalogue);
    }
}