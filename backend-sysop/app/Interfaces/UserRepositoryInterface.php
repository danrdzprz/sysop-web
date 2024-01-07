<?php

namespace App\Interfaces;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserRepositoryInterface
{
    public function getAllUsers(int $total = 10): LengthAwarePaginator;

    public function getUserById(int $UserId): User;

    public function getUserByEmal(string $UserId): User;

    public function createUser(array $UserDetails): User;
}
