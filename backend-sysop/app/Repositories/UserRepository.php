<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function getAllUsers(int $total = 10): LengthAwarePaginator
    {
        return User::index()->paginate($total);
    }

    public function getUserById(int $UserId): User
    {
        return User::with('role')->findOrFail($UserId);
    }

    public function getUserByEmal(string $UserEmail): User
    {
        return User::where(['email' => $UserEmail])->firstOrFail();
    }

    public function createUser(array $UserDetails): User
    {
        $UserDetails['password'] = Hash::make($UserDetails['password']);

        return User::create($UserDetails);
    }

    public function updateUser(int $UserId, array $newDetails): int
    {
        return User::whereId($UserId)->update($newDetails);
    }

    public function deleteUser(int $UserId): int
    {
        return User::destroy($UserId);
    }
}
