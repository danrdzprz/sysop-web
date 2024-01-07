<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Role extends Model
{
    use HasFactory;
    protected $fillable = ['name','permissions'];
    protected $hidden = ['id','updated_at', 'created_at'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'permissions' => 'array'
    ];

    public function setNameAttribute($value){
        $this->attributes['name'] = mb_strtoupper($value);
    }
    
    // public function setPermissionsAttribute($value){
    //     $this->attributes['permissions'] = json_encode($value ? $value : []);
    // }

    /**
     * Get all of the users for the Role
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'role_id');
    }
}
