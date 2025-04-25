<?php
namespace App\Http\Controllers;
use App\Models\Post;
use app\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $post->comments()->create([
            'content' => $request->content,
            'user_id' => auth()->id(),
        ]);

        session()->flash('success', 'Comment added successfully!');
        Log::info("comment added");
        return redirect()->back();
    }
}