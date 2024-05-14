<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boardgame extends Model
{
    protected $fillable = ['id'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'boardgames_user', 'boardgame_id', 'user_id');
    }
    public function friends()
    {
        return $this->belongsToMany(Friend::class, 'boardgame_friend', 'boardgame_id', 'friend_id');
    }
}
