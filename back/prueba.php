<?php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;


// URL a la que deseas hacer la petición
$url = 'https://www.boardgamegeek.com/xmlapi2/thing?id=402206';

// Encabezado falso de origen (Origin) para falsear la petición
$headers = [
    'Origin' => 'https://www.boardgamegeek.com/'
];

// Configuración del cliente Guzzle con el encabezado falso de origen
$client = new Client(['headers' => $headers]);

try {
    // Realizar la petición GET
    $response = $client->request('GET', $url);

    // Obtener el código de estado de la respuesta
    $statusCode = $response->getStatusCode();

    // Si la petición fue exitosa (código de estado 200)
    if ($statusCode === 200) {
        // Obtener el cuerpo de la respuesta
        $body = $response->getBody()->getContents();

        // Procesar la respuesta (en este caso, imprimir el cuerpo)
        echo $body;
    } else {
        echo 'La petición no fue exitosa. Código de estado: ' . $statusCode;
    }
} catch (RequestException $e) {
    // Manejar errores de conexión u otras excepciones de Guzzle
    if ($e->hasResponse()) {
        // Si la excepción tiene una respuesta, obtener el código de estado
        $statusCode = $e->getResponse()->getStatusCode();
        echo 'Error: La petición no fue exitosa. Código de estado: ' . $statusCode;
    } else {
        // Si no hay respuesta, manejar el error general
        echo 'Error: ' . $e->getMessage();
    }
} catch (Exception $e) {
    // Capturar otras excepciones no relacionadas con la petición
    echo 'Error: ' . $e->getMessage();
}