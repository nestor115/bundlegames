<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

 Route::group(['middleware' => 'web'], function () {
    Route::post('/register2', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user/boardgame-ids', [AuthController::class, 'getBoardgameIdsByUserId']);
         
 });

  

Route::get('/', function () {
        return view('welcome');
    });
