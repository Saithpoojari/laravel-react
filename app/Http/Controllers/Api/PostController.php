<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::latest()->paginate(5));
    }

    public function show($id)
    {
        return response()->json(Post::findOrFail($id));
    }

    public function store(Request $request)
    {
        // Ensure the user is authenticated
        if (!auth()->check()) {
            return redirect()->route('login')->with('error', 'You must be logged in to create a post.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'topic' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $postData = [
            'title' => $validated['title'],
            'body' => $validated['body'],
            'topic' => $validated['topic'],
            'user_id' => auth()->id(), // Set user_id to the authenticated user's ID
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $postData['image'] = $path;
        }

        Post::create($postData);
        return $postData;

    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->only('body'));

        return response()->json($post);
    }

    public function destroy($id)
    {
        Post::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
