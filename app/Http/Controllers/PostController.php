<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'posts' => Post::latest()->paginate(10),
            'auth' => auth()->user() ? ['user' => auth()->user()] : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required|string',
        ]);
    
        Post::create([
            'body' => $validated['body'],
            'user_id' => auth()->id(),
        ]);
    
        session()->flash('success', 'Post created successfully!');
        \Log::info('Flash message set:', session()->all());
    
        return redirect()->back();
    }

    public function show(Post $post)
    {
        return Inertia::render('Show', ['post' => $post]);
    }

}