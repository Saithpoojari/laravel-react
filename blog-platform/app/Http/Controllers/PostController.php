<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller {
    public function index() {
        $posts = Post::all();
        return response()->json($posts); // API endpoint returns JSON
    }

    public function create() {
        return view('create');
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'user_id' => auth()->id() ?? 1, // Default to 1 if no authenticated user
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
    }
}