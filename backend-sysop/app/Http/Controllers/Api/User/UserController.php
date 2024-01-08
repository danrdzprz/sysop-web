<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Mail\UserCreated;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected UserRepositoryInterface $userRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): LengthAwarePaginator
    {
        return $this->userRepository->getAllUsers();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): User
    {
        return $this->userRepository->getUserById($user->id);
    }

    public function store(UserCreateRequest $request): JsonResponse
    {
        $user = $this->userRepository->createUser($request->validated());

        Mail::to($user)->send(new UserCreated($user));

        return response()->json([
            'messagge' => __('api.users.create.success'),
        ], JsonResponse::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserUpdateRequest $request, User $user): JsonResponse
    {
        $this->userRepository->updateUser($user->id, $request->validated());

        return response()->json([
            'messagge' => __('api.users.update.success'),
        ], JsonResponse::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        $this->userRepository->deleteUser($user->id);

        return response()->json([
            'messagge' => __('api.users.delete.success'),
        ], JsonResponse::HTTP_CREATED);
    }
}
