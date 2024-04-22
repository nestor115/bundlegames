<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class AuthController extends Controller
{
   
public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
    ]);

    $user = new User([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $user->save();

    return response()->json(['message' => 'User registered successfully'], 201);
}

public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $userId = Auth::id();
            \Log::info("User authenticated successfully. User ID: {$userId}");
            return response()->json(['message' => "Authenticated {$userId}"], 200);
        }
        \Log::error('Authentication failed. Invalid credentials provided.');
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
{
    // Obtén el ID de usuario actual
    $userId = Auth::id();

    // Cierra la sesión del usuario
    Auth::logout();

    // Invalida la sesión actual
    $request->session()->invalidate();

    // Regenera el token de sesión
    $request->session()->regenerateToken();

    // Elimina el registro de sesión de la base de datos
    if ($userId) {
        // Elimina la sesión de usuario de la base de datos
        DB::table('sessions')->where('user_id', $userId)->delete();
    }

    // Envía una respuesta JSON indicando que se ha cerrado la sesión correctamente
    return response()->json(['message' => 'Logged out'], 200);
}

public function assignBoardgameToUser(Request $request, $boardgameId)
{
    $userId = Auth::id();
    dd($userId);

    $user = User::findOrFail($userId);

    $user->boardgames()->create([
        'boardgame_id' =>$boardgameId
    ]);

    return response()->json(['message' => 'Boardgame assigned to user successfully'], 201);
}

public function getBoardgameIdsByUserId(Request $request)
{
   //$userId = Auth::id();
   $userId = 2;
   $user = User::findOrFail($userId,"id");
    $boardgamesIds = $user->boardgames()->pluck('boardgame_id')->toArray();
    return response()->json(['boardgame_ids' => $boardgamesIds], 200);
}

}
