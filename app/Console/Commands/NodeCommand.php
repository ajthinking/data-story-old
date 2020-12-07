<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Str;

class NodeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'story:node {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new node';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $stub = file_get_contents(
            base_path('app/DataStory/stubs/node.php')
        );

        $contents = Str::of($stub)->replaceFirst('NodeName', $this->argument('name'));

        file_put_contents(
            base_path('app/DataStory/Nodes/' . $this->argument('name') . '.php'),
            $contents
        );

        $this->info('Successfully created node ' . $this->argument('name'));

        return 0;
    }
}
