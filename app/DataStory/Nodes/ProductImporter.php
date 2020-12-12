<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class ProductImporter extends NodeModel
{
    public function run()
    {
        $items = $this->input();

        //ImageImport($items);

        $this->output($items);
    }
}