<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserBoardgame;
use Exception;

class DatabaseController extends Controller
{
    public function getBoardgameIdsByUserId(Request $request)
    {
        $user_id = auth()->id();
        $boardgameIds = UserBoardgame::where('user_id', $user_id)->pluck('boardgame_id');
        return response()->json(['boardgame_ids' => $boardgameIds]);
    }

    public function addBoardgame($boardgameId)
    {
        $user_id = auth()->id();

        $existingBoardgame = UserBoardgame::where('user_id', $user_id)
            ->where('boardgame_id', $boardgameId)->exists();

        if (!$existingBoardgame) {
            UserBoardgame::create([
                'user_id' => $user_id,
                'boardgame_id' => $boardgameId
            ]);
        }
        return response()->json(['message' => 'Juego de mesa añadido correctamente']);

    }

    public function deleteBoardgame($boardgameId)
    {
        $user_id = auth()->id();

        $boardgame = UserBoardgame::where('user_id', $user_id)
            ->where('boardgame_id', $boardgameId)
            ->first();

        if ($boardgame) {
            $boardgame->delete();
            return response()->json(['message' => 'Juego de mesa eliminado correctamente']);
        } else {
            return response()->json(['error' => 'El juego de mesa no encontrado'], 404);
        }
    }


}



