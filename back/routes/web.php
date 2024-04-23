<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

    Route::post('/register2', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user/boardgame-ids', [AuthController::class, 'getBoardgameIdsByUserId']);
 Route::middleware(['cors'])->group(function () {
         
 
   });
  

Route::get('/', function () {
        return view('welcome');
    });
