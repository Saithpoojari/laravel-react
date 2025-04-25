<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;

Route::get('/', [PostController::class, 'index'])->name('home')->middleware('auth');
Route::inertia('/about', 'About')->name('about');
Route::inertia('/login', 'Login')->name('login');
Route::inertia('/create', 'Create')->name('create');

// Registration routes
Route::get('/register', [AuthController::class, 'create'])->name('register');
Route::post('/register', [AuthController::class, 'store'])->name('register.store');

// Login routes
Route::get('/login', [AuthController::class, 'createLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::resource('posts', PostController::class)->except('index');


Route::get('/posts/{post}', [PostController::class, 'show'])->middleware('auth')->name('posts.show');
Route::put('/posts/{post}', [PostController::class, 'update'])->middleware('auth');
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->middleware('auth');

Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->middleware('auth')->name('comments.store');
