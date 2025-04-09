<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
})->name('home');
Route::get('/create', [PostController::class, 'create'])->name('create');
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
Route::get('/posts', [PostController::class, 'index']);
Route::get('/login', [AuthController::class, 'login']);