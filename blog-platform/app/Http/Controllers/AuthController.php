<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        if ($request -> isMethod ('get')){
            return view('login');
        }
        if ($request -> isMethod('post')){
            $credentials = $request->validate([
                'email'=>'required|email',
                'password' => 'required'
            ]);
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                return response()->json(['message' => 'Login successful', 'user' => $user]);
            }
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        
}

    
}
