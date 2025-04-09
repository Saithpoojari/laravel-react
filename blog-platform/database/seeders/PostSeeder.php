<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder {
    public function run() {
        Post::create([
            'user_id' => 1, // Default user ID (adjust if authenticated)
            'title' => 'Welcome to My Blog',
            'content' => 'This is the first post to test the blog platform.',
        ]);

        Post::create([
            'user_id' => 1,
            'title' => 'Second Post',
            'content' => 'This is another test post with some content.',
        ]);
    }
}
