<?php

namespace App\Http\Controllers\Api\Role;

use App\Http\Controllers\Controller;
use App\Interfaces\RoleRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class RoleController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(
        protected RoleRepositoryInterface $roleRepository,
    ) {
    }

    /**
     * Display a listing of the post by pair of keys value and id.
     */
    public function catalog(): Collection
    {
        return $this->roleRepository->catalog();
    }
}
