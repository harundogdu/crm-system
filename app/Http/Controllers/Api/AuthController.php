<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request)
    {
        try {
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $user->save();

            $credentials = ['email' => $request->email, 'password' => $request->password];

            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Giriş yapılamadı! Bilgileri Konrol Ediniz.',
                ], 401);
            }

            $user = Auth::user();

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->accessToken->token;
            $tokenExpiresAt = Carbon::parse($tokenResult->accessToken->expires_at)->toDateTimeString();

            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }

            $tokenResult->accessToken->save();

            return response()->json([
                'success' => true,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'accesss_token' => $token,
                'expires_at' => $tokenExpiresAt,
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }
}
