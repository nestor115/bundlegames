<?php
namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use App\Http\Controllers\Controller;
use Exception;

class ApiController extends Controller
{

    public function getBoardGameInfo(int $id)
    {
        $url = 'https://www.boardgamegeek.com/xmlapi2/thing?id=' . $id;

        $headers = [
            'Origin' => 'https://www.boardgamegeek.com/'
        ];

        $client = new Client(['headers' => $headers]);

        try {
            $response = $client->request('GET', $url);

            $statusCode = $response->getStatusCode();

            if ($statusCode === 200) {

                return $response->getBody()->getContents();
            } else {
                return 'La petición no fue exitosa. Código de estado: ' . $statusCode;
            }
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $statusCode = $e->getResponse()->getStatusCode();
                echo 'Error: La petición no fue exitosa. Código de estado: ' . $statusCode;
            } else {
                echo 'Error: ' . $e->getMessage();
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }

    public function searchBoardgame($searchTerm)
    {
        $url = 'https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=' . $searchTerm;

        $headers = [
            'Origin' => 'https://www.boardgamegeek.com/'
        ];

        $client = new Client(['headers' => $headers]);

        try {
            $response = $client->request('GET', $url);

            $statusCode = $response->getStatusCode();

            if ($statusCode === 200) {

                return $response->getBody()->getContents();
            } else {
                return 'La petición no fue exitosa. Código de estado: ' . $statusCode;
            }
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $statusCode = $e->getResponse()->getStatusCode();
                echo 'Error: La petición no fue exitosa. Código de estado: ' . $statusCode;
            } else {
                echo 'Error: ' . $e->getMessage();
            }
        } catch (Exception $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }
}



