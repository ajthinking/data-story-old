<?php

namespace App\DataStory;

use App\DataStory\Categories\Eloquent;

class EloquentReader
{
    const IN_PORTS = ['Input'];

    const OUT_PORTS = ['Output'];

    public string $eloquentModel;

    public array $scopes;

    public array $whereStatements;

    public $node;
    
    public function __construct($node)
    {
        $this->node = $node;
        $this->eloquentModel = $node->data->targetElouquentModel;
        $this->scopes = [];
        $this->whereStatements = [];
    }

    public static function describe()
    {
        return [
            'class' => static::class,
            'category' => Eloquent::class,
            'signature' => 'Eloquent::User::find()',
            'inPorts' => static::IN_PORTS,
            'outPorts' => static::OUT_PORTS,
        ];
    }

    public function run()
    {
        sleep(4);
        $out = $this->node->portNamed('out1');
        $out->data = $this->getQueryResults();
    }

    protected function getQueryResults()
    {
        // Get QueryBuilder
        $query = app($this->eloquentModel)->query();

        // Apply scopes
        $query = collect($this->scopes)->reduce(function($query, $scope) {
            $name = $scope->name;
            $args = $scope->args;
            return $query->$name(...$args);
        }, $query);

        // Apply where statements
        $query = collect($this->whereStatements)->reduce(function($query, $whereStatement) {
            return $query->where(...$whereStatement->args);
        }, $query);
        
        // Return results
        return $query->get();
    }
}