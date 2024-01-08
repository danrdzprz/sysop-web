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

    /**
     * function to login and response with a token.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $payloadData = $request->validated();
        if (!Auth::attempt($payloadData)) {
            return response()->json([
                'message' => __('api.auth.login.failure'),
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $user = $this->userRepository->getUserByEmal($payloadData['email']);

        return response()->json([
            'message' => __('api.auth.login.success'),
            'token' => $user->createToken('API_TOKEN')->plainTextToken,
        ], JsonResponse::HTTP_OK);
    }

    /**
     * function to logout and delete the token.
     */
    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => __('api.auth.logout.success'),
        ], JsonResponse::HTTP_OK);
    }

    /**
     * Show the current user with role and permissions.
     */
    public function me(): User
    {
        return $this->userRepository->getUserById(auth()->user()->id);
    }
}
