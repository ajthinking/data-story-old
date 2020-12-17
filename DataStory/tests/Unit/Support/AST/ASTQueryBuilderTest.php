<?php

use Archetype\Support\AST\ASTQueryBuilder;
use Archetype\Support\QueryBuilder;

class ASTQueryBuilderTest extends Archetype\Tests\FileTestCase
{
    /** @test
    */
    public function it_can_be_instanciated_using_an_ast_object()
    {
        $ast = LaravelFile::load('app/Models/User.php')->ast();
        
        $ASTQB = new ASTQueryBuilder($ast);

        $this->assertInstanceOf(
            ASTQueryBuilder::class,
            $ASTQB
        );
    }

    /** @test */
    public function it_will_return_instance_of_itself_on_chain()
    {
        $ast = LaravelFile::load('app/Models/User.php')->ast();

        $result = (new ASTQueryBuilder($ast))
            ->class();

        $this->assertInstanceOf(
            ASTQueryBuilder::class,
            $result
        );
    }    
    
    /** @test
    */
    public function it_can_query_deep()
    {
        $result = LaravelFile::load(
            'database/migrations/2014_10_12_000000_create_users_table.php'
        )
            ->astQuery() // get a ASTQueryBuilder
            ->method()
                ->where('name->name', 'up')
            ->staticCall()
                ->where('class', 'Schema')
                ->where('name->name', 'create')
            ->args
            ->value
            ->value
            ->get() // exit ASTQueryBuilder, get a Collection   
            ->first();
            
        $this->assertEquals($result, 'users');
    }
}