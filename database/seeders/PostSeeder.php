<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use Faker\Factory as Faker;

class PostSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = User::pluck('id')->toArray(); // Get all user IDs

        for ($i = 0; $i < 1000; $i++) {
            Post::create([
                'title' => $faker->sentence(3, true), // 3-word title
                'body' => $faker->paragraphs(3, true), // 3-paragraph body
                'topic' => $faker->optional(0.7)->word, // 70% chance of a topic
                'user_id' => $faker->randomElement($userIds), // Random user
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => $faker->dateTimeBetween('-1 year', 'now'),
            ]);
        }
    }
}