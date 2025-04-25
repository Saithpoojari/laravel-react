<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(10);
        $allPosts = Post::with('user')->latest()->get();
        $user = Auth::user();
        $userId = $user ? $user->id : 'Guest';
        $userName = $user ? $user->name : 'Guest';
       
        Log::info("User ID: {$userId}, Name: {$userName} accessed the homepage.");
        
        return Inertia::render('Home', [
            'posts' => $posts,
            'allPosts' => $allPosts,
            'auth' => auth()->user() ? ['user' => auth()->user()] : null,
        ]);
       
    }

    public function store(Request $request)
    {
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
            'user_id' => auth()->id(),
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $postData['image'] = $path;
        }

        Post::create($postData);

        session()->flash('success', 'Post created successfully!');

        return redirect()->back();
    }

    public function show(Post $post)
    {
        $post->load('comments.user');
        return Inertia::render('Show', ['post' => $post]);
    }

    public function update(Request $request, Post $post)
    {
        if (!auth()->check() || auth()->id() !== $post->user_id) {
            return redirect()->route('posts.show', $post->id)->with('error', 'Unauthorized to update this post.');
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
        ];

        if ($request->hasFile('image')) {
            if ($post->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($post->image);
            }
            $path = $request->file('image')->store('images', 'public');
            $postData['image'] = $path;
        }

        $post->update($postData);

        session()->flash('success', 'Post updated successfully!');

        return redirect()->route('posts.show', $post->id);
    }

    public function destroy(Post $post)
    {
        if (!auth()->check() || auth()->id() !== $post->user_id) {
            return redirect()->route('home')->with('error', 'Unauthorized to delete this post.');
        }

        if ($post->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($post->image);
        }

        $post->delete();
        session()->flash('success', 'Post deleted successfully!');
        return redirect()->route('home');
    }
}