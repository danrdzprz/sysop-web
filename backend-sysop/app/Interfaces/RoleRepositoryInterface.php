<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;

interface RoleRepositoryInterface
{
    public function catalog(): Collection;
}
