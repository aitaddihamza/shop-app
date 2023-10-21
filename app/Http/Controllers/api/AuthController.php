<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginFormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{

    public function login(LoginFormRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password incorrect ! '
            ], 422);
        }
        $user = Auth::user();
        /** @var User $user  */
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
}
