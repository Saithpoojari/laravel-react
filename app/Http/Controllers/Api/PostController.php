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
        $data = $request->validate([
          'body' => 'required|string',
          'title' => 'required|string',
           'topic' => 'required|string'

        ]);

        $post = Post::create($data);
        

        return response()->json($post, 201);
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
