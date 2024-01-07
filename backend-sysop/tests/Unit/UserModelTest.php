<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class UserModelTest extends TestCase
{
    /**
     * Unit test for model: cheack if the user created exists on database table.
     */
    public function testCreateUser(): void
    {
        $record = User::factory()->create();
        $this->assertDatabaseHas('users', [
            'id' => $record->id,
        ]);
    }
}
