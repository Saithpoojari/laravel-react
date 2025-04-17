<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Post;
use Carbon\Carbon;

class CleanOldPosts extends Command
{
    protected $signature = 'posts:clean-old';

    protected $description = 'Delete posts older than 30 days';

    public function handle()
    {
        $deleted = Post::where('created_at', '<', Carbon::now()->subDays(30))->delete();

        $this->info("Deleted {$deleted} old posts.");
    }
}
