<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Eloquent;
use App\DataStory\NodeModel;

class EloquentReader extends NodeModel
{
    const IN_PORTS = [];

    const CATEGORY = Eloquent::class;

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

    public static function describe($data = [])
    {
        $shortCategory = class_basename(static::CATEGORY);
        $shortModel = class_basename($data['model']);
        $shortModelPlural = \Illuminate\Support\Str::of($shortModel)->plural();
        $signature = "$shortCategory::$shortModelPlural";

        return (object) [
            'nodePhp' => static::class,
            'nodeModelReact' => static::NODE_MODEL_REACT,
            'key' => $shortCategory . static::class . (string) $shortModelPlural,

            'name' => (string) $shortModelPlural,
            'class' => static::class,
            'category' => $shortCategory,
            'summary' => "$shortModel::where(...)",
            'signature' => $signature,
            'inPorts' => static::IN_PORTS,
            'outPorts' => static::OUT_PORTS,
        ];
    }
    
    public static function describeVariations($data = [])
    {
        $models = [
            \App\Models\User::class,
            \App\Models\Comment::class,
            \App\Models\Post::class,
        ];

        return [
            ...collect($models)->map(function($model) {
                return static::describe([
                    'model' => $model
                ]);
            })->toArray()
        ];
    }
}