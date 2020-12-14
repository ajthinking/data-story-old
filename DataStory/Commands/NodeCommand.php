<?php

namespace DataStory\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class NodeCommand extends Command
{
    protected $signature = 'story:node {name}';

    protected $description = 'Create a new node';

    protected $files;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $path = config('data-story.custom-nodes-dir') . '/' . $this->argument('name') . '.php';

        $contents = Str::of(
            file_get_contents(__DIR__ . '/../stubs/node.php')
        )->replaceFirst(
            'NodeName',
            $this->argument('name')
        );

        $this->save($path, $contents);

        $this->info('Successfully created node ' . $this->argument('name'));

        return 0;
    }

    /**
     * Build the directory for the class if necessary.
     *
     * @param  string  $path
     * @return string
     */    
    protected function save($path, $contents)
    {
        if (! $this->files->isDirectory(dirname($path))) {
            $this->files->makeDirectory(dirname($path), 0777, true, true);
        }

        $this->files->put($path, $contents);
    }    
}
