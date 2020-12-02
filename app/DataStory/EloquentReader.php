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
        $this->eloquentModel = $node->targetElouquentModel;
        $this->scopes = [];
        $this->whereStatements = [];
    }

    public function run()
    {
        $this->node->ports[0]->executionData = $this->getQueryResults();

        // app('DiagramModel')->bindDataToPort(
        //     'out1',
        //     $this->getQueryResults()
        // );
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