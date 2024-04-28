<?php
use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/boardgameinfo/{id}',[ApiController::class, 'getBoardGameInfo'])->name('boardgameinfo');
