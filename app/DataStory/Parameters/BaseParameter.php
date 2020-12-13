<?php

namespace App\DataStory\Parameters;

abstract class BaseParameter
{
    public $default;

    public $value;

    public function __construct()
    {
        //
    }

    public static function make()
    {
        return new static;
    }

    public function default($value)
    {
        $this->default = $value;
        $this->value = $value;

        return $this;
    }
}