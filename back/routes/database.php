<?php
use App\Http\Controllers\DatabaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

  Route::get('/user/boardgames', [DatabaseController::class, 'getBoardgameIdsByUserId']);

  Route::post('/user/newboardgame/{boardgameId}', [DatabaseController::class, 'addBoardgame']);

  Route::post('/user/deleteboardgame/{boardgameId}', [DatabaseController::class, 'deleteBoardgame']);
