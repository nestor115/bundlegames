<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        // '/register2',
        // '/login',
        '/*',
    ];
    
    protected function shouldSkip($request)
    {
        // Obtén la ruta de la solicitud
        $path = $request->path();

        // Verifica si la ruta está en la lista de exclusiones
        return in_array($path, $this->except);
    }

    
}
