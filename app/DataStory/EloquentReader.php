<?php

namespace App\DataStory;

class EloquentReader
{
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

    public function run()
    {
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