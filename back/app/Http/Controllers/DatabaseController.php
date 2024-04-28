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
 // Obtener el user_id de la sesión
    $user_id = auth()->id();

    // Buscar en la tabla user_boardgames todos los boardgame_ids para el user_id dado
    $boardgameIds = UserBoardgame::where('user_id', $user_id)->pluck('boardgame_id');

    // Devolver los boardgame_ids como respuesta
    return response()->json(['boardgame_ids' => $boardgameIds]);
    }
    

}



