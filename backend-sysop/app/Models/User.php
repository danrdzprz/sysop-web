<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'birthdate',
        'phone',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'role_id',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * Get the role associated with the user.
     */
    public function role(): HasOne
    {
        return $this->hasOne(Role::class, 'id');
    }

    /**
     * Get all of the post for the User.
     */
    public function post(): HasMany
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    /**
     * Scope a query to include post related with the user.
     */
    public function scopeIndex(Builder $query): Builder
    {
        return $query->join('roles', 'users.role_id', '=', 'roles.id')
        ->select(
            'users.id',
            'users.name',
            'roles.name as role_name',
            'users.email',
            'users.birthdate',
            'users.phone',
        );
    }
}
