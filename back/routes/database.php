<?php
use App\Http\Controllers\DatabaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

  Route::get('/user/boardgames', [DatabaseController::class, 'getBoardgameIdsByUserId']);

  Route::post('/user/newboardgame/{boardgameId}', [DatabaseController::class, 'addBoardgame']);

  Route::post('/user/deleteboardgame/{boardgameId}', [DatabaseController::class, 'deleteBoardgame']);

  Route::post('/user/addfriend/{friendName}', [DatabaseController::class, 'addFriend']);

  Route::get('/user/friends', [DatabaseController::class, 'getFriendsByUser']);

  Route::post('/user/deletefriend/{friendId}', [DatabaseController::class, 'deleteFriend']);

  Route::post('/user/addplayerfriend/{boardgameId}/{friendId}', [DatabaseController::class, 'addPlayerFriend']);

  Route::get('/user/playerfriends/{boardgameId}', [DatabaseController::class, 'getPlayerFriends']);

  Route::post('/user/deleteplayerfriend/{boardgameId}/{friendId}', [DatabaseController::class, 'deletePlayerFriend']);
  