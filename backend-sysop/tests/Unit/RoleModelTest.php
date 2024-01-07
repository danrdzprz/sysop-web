<?php

namespace Tests\Unit;

// use PHPUnit\Framework\TestCase;
use App\Models\Role;
use Tests\TestCase;

class RoleModelTest extends TestCase
{
    /**
     * Unit test for model: cheack if the user created exists on database table.
     */
    public function testCreateRole(): void
    {
        $record = Role::factory()->create();
        $this->assertDatabaseHas('roles', [
            'id' => $record->id,
        ]);
    }
}
