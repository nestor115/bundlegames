<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserBoardgame;
use App\Models\Boardgame;
use App\Models\Friend;

use Exception;

class DatabaseController extends Controller
{
    public function getBoardgameIdsByUserId(Request $request)
    {
        $user = auth()->user();
        $boardgameIds = $user->boardgames()->pluck('id');
        return response()->json(['boardgame_ids' => $boardgameIds]);
    }

    public function addBoardgame($boardgameId)
    {
        $user = auth()->user();

        // Verificar si el juego de mesa ya existe en la tabla boardgames
        $boardgame = Boardgame::find($boardgameId);
        if (!$boardgame) {
            $boardgame = Boardgame::create(['id' => $boardgameId]);
        }

        // Verificar si el juego de mesa ya está asociado al usuario
        if (!$user->boardgames()->where('id', $boardgameId)->exists()) {
            $user->boardgames()->attach($boardgameId);
            return response()->json(['message' => 'Juego de mesa añadido correctamente']);
        }

        // Si el juego de mesa ya está asociado al usuario, se devuelve un mensaje indicándolo
        return response()->json(['message' => 'El juego de mesa ya está asociado al usuario'], 422);
    }


    public function deleteBoardgame($boardgameId)
    {
        $user = auth()->user();

        // Verificar si el juego de mesa está asociado al usuario
        if (!$user->boardgames()->where('id', $boardgameId)->exists()) {
            return response()->json(['error' => 'El juego de mesa no está asociado al usuario'], 404);
        }

        // Eliminar la asociación entre el usuario y el juego de mesa
        $user->boardgames()->detach($boardgameId);
        return response()->json(['message' => 'Juego de mesa eliminado correctamente']);
    }


    public function addFriend($friendName)
    {
        $user = auth()->user();

        $existingFriend = $user->friends()->where('name', $friendName)->exists();

        if ($existingFriend) {
            return response()->json(['error' => 'El amigo ya existe para este usuario'], 422);
        }

        $friend = $user->friends()->create([
            'name' => $friendName,
        ]);

        return response()->json(['message' => 'Amigo añadido correctamente', 'friend' => $friend]);
    }
    public function getFriendsByUser()
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    $friends = $user->friends()->get();

    return response()->json(['friends' => $friends]);
}

public function deleteFriend($friendId)
{
    $user = auth()->user();

    $friend = Friend::where('id', $friendId)
                    ->where('user_id', $user->id)
                    ->first();

    if (!$friend) {
        return response()->json(['error' => 'El amigo no pertenece al usuario actual'], 404);
    }

    $deleted = Friend::destroy($friendId);

    if ($deleted) {
        return response()->json(['message' => 'Amigo eliminado correctamente']);
    } else {
        return response()->json(['error' => 'No se pudo eliminar el amigo'], 404);
    }
}
public function addPlayerFriend($boardgameId, $friendId)
{
    $boardgame = Boardgame::findOrFail($boardgameId);
    $friend = Friend::findOrFail($friendId);

    // Verificar si la relación ya existe para evitar duplicados
    if ($boardgame->friends()->where('friend_id', $friendId)->exists()) {
        return response()->json(['error' => 'El amigo ya está asociado a este juego.'], 422);
    }

    // Agregar la relación
    $boardgame->friends()->attach($friend);

    return response()->json(['message' => 'Amigo agregado al juego correctamente.']);
}

public function getPlayerFriends($boardgameId)
{
    // Obtener el juego de mesa por su ID
    $boardgame = Boardgame::findOrFail($boardgameId);

    // Obtener los amigos asociados con el juego de mesa
    $friends = $boardgame->friends;

    return response()->json(['friends' => $friends]);
}
public function deletePlayerFriend($boardgameId, $friendId)
{
    // Buscar el juego de mesa por su ID
    $boardgame = Boardgame::findOrFail($boardgameId);

    // Verificar si el juego de mesa tiene al amigo asociado
    if (!$boardgame->friends()->where('friend_id', $friendId)->exists()) {
        return response()->json(['error' => 'El amigo no está asociado a este juego.'], 422);
    }

    // Eliminar la relación entre el juego de mesa y el amigo
    $boardgame->friends()->detach($friendId);

    return response()->json(['message' => 'Amigo eliminado del juego correctamente.']);
}


}






