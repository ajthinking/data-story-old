<?php

namespace App\DataStory;

Class ModelFactory
{
    public static function make()
    {
        return unserialize(
            file_get_contents(
                storage_path('model')
            )
        );
    }
}