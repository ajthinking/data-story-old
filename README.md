# DataStory
Alpha in development

![image](https://user-images.githubusercontent.com/3457668/100412714-af94bf00-3075-11eb-9f6b-143fe77e4592.png)

## Installation
This is still just a standard Laravel app

## Create custom node
```bash
php artisan story:node Translate
```

```php
<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Translate extends NodeModel
{
    public function run()
    {
        $items = $this->input();

        $this->output($items);
    }
}
```