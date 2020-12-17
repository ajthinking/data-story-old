<?php

namespace Archetype\Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Contracts\Console\Kernel;
use ErrorException;
use Illuminate\Support\Str;

abstract class FileTestCase extends BaseTestCase
{
    protected function setUp() : void
    {
        parent::setUp();
        $this->cleanupDirectories();
        $this->bootDevelopmentRootDisks();
    }

    protected function tearDown() : void
    {
        parent::tearDown();
        $this->cleanupDirectories();
    }

    public function createApplication()
    {
        $app = require __DIR__.'/../../../../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    protected function cleanupDirectories()
    {
        $debug = __DIR__ . '/.debug';
        $output = __DIR__ . '/.output';

        is_dir($debug) ? $this->rrmdir($debug) : null;
        is_dir($output) ? $this->rrmdir($output) : null;
    }

    protected function bootDevelopmentRootDisks()
    {
        config([
            'archetype.roots.output.root' => __DIR__ . '/../tests/.output',
            'archetype.roots.debug.root' => __DIR__ . '/../tests/.debug',
        ]);
    }

    protected function rrmdir($dir)
    {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (
                        is_dir($dir . DIRECTORY_SEPARATOR . $object) &&
                        !is_link($dir . "/" . $object)
                    ) {
                        $this->rrmdir($dir . DIRECTORY_SEPARATOR . $object);
                    } else {
                        unlink($dir . DIRECTORY_SEPARATOR . $object);
                    }
                }
            }
            rmdir($dir);
        }
    }    

    protected function deleteDirectory($path)
    {
        if (is_dir($path)) {
            //GLOB_MARK adds a slash to directories returned
            //GLOB_BRACE includes hidden files
            $files = glob( $path . '*', GLOB_MARK|GLOB_BRACE );

            foreach( $files as $file ){
                $this->deleteDirectory( $file );
            }
            try {
                dd($path);
                rmdir( $path );
            } catch(ErrorException $e) {
                if(Str::endsWith($e->getMessage(), 'No such file or directory')) return;
                throw $e;
            }
        } elseif (is_file($path)) {
            unlink( $path );
        }
    }
}
