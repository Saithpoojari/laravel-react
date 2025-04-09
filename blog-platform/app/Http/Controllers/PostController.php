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
    public function login() {
        return view('login');
    }

    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        Post::create([
            'user_id' => auth()->id() ?? 1,
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return redirect()->route('home')->with('success', 'Post created successfully!');
    }
}