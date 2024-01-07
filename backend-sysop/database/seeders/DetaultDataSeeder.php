<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DetaultDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_role = Role::create(['name' => 'admin', 'permissions' => ['root' => true]]);

        $employee_role = Role::create([
            'name' => 'employee',
            'permissions' => [
                'root' => false,
                'posts' => [
                    'create' => true,
                    'update' => true,
                    'read' => true,
                    'delete' => true,
                ],
            ],
        ]);
        $admin_user = User::factory()->create([
            'email' => 'admin@sysop.com',
            'password' => Hash::make('secret'),
            'role_id' => $admin_role,
        ]);

        $employee_user = User::factory()->create([
            'email' => 'employee@sysop.com',
            'password' => Hash::make('secret'),
            'role_id' => $employee_role,
        ]);
    }
}
