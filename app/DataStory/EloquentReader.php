<?php

namespace App\DataStory;

class EloquentReader
{
    public string $eloquentModel;

    public array $scopes;

    public array $whereStatements;

    // public function __construct(
    //         string $eloquentModel,
    //         array $scopes = [],
    //         array $whereStatements = []
    //     )
    // {
    //     $this->eloquentModel = $eloquentModel;
    //     $this->scopes = $scopes;
    //     $this->whereStatements = $whereStatements;
    // }

    public static function make(...$args)
    {
        return new static(...$args);
    }

    public function run()
    {
        //return $this->getQueryResults();
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