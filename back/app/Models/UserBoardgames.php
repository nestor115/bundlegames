<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBoardgames extends Model
{
    protected $table = 'user_boardgames';

    protected $fillable = [
        'user_id', 'boardgame_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
