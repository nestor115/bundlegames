<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boardgame extends Model
{
    protected $fillable = ['id'];

    // Relación inversa: Un juego de mesa puede tener muchos usuarios
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_boardgames', 'boardgame_id', 'user_id');
    }
    public function friends()
    {
        return $this->belongsToMany(Friend::class, 'boardgame_friend', 'boardgame_id', 'friend_id');
    }
}
