<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBoardgame extends Model
{
    protected $table = 'user_boardgames';
    protected $fillable = ['user_id', 'boardgame_id'];
}
