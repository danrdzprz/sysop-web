<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected UserRepositoryInterface $userRepository,
    ) {
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $payloadData = $request->validated();
        if (!Auth::attempt($payloadData)) {
            return response()->json([
                'messagge' => __('api.auth.login.failure'),
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $user = $this->userRepository->getUserByEmal($payloadData['email']);

        return response()->json([
            'messagge' => __('api.auth.login.success'),
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
        ], JsonResponse::HTTP_OK);
    }

    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'messagge' => __('api.auth.logout.success'),
        ], JsonResponse::HTTP_OK);
    }

    public function me(): User
    {
        return auth()->user();
    }
}
