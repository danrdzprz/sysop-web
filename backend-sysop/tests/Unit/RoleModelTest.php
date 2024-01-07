<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use Tests\TestCase;
use App\Models\Role;

class RoleModelTest extends TestCase
{
    /**
     * Unit test for model: cheack if the user created exists on database table.
     */
    public function test_create_role(): void
    {
        $record = Role::factory()->create();
        $this->assertDatabaseHas('roles', [
            'id' => $record->id,
        ]);
    }
}
