<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PostController extends Controller {
    public function index() {
        $posts = Post::all();
        return response()->json($posts); // API endpoint returns JSON
    }

    public function create() {
        return view('create');
    }
    public function register() {
        return view('register');
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

    public function storeUser(request  $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), 
        ]);
        auth()->login($user);

        // Return a JSON response
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
}