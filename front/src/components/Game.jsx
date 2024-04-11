import React, { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml2js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const Game = ({ id }) => {
  const [gameName, setGameName] = useState('');
  const [gameImage, setGameImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`
        );
        const dataParser = new xml2js.Parser({ explicitArray: false });
        dataParser.parseString(response.data, (err, result) => {
          if (err) throw err;
          if (result) {
            let game = null;
            if (result.items && result.items.item) {
              game = result.items.item;
            } else if (result.item) {
              game = result.item;
            }

            if (game) {
              let nameValue = '';
              let imageUrl = '';

              // Obtener el nombre del juego
              if (game.name && Array.isArray(game.name)) {
                const primaryName = game.name.find(name => name.$.type === 'primary');
                nameValue = primaryName ? primaryName.$.value : '';
              } else if (game.name && game.name.$ && game.name.$.value) {
                nameValue = game.name.$.value;
              }

              // Obtener la URL de la imagen del juego
              if (game.image ) {
                imageUrl = game.image;
              } 

              setGameName(nameValue);
              setGameImage(imageUrl);
            }
          }
        });
      } catch (error) {
        console.error("Error al obtener detalles del juego:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!gameName) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5">
    <div className="card border-dark" style={{ width: '300px' }}>
      <img src={gameImage} className="card-img-top" alt={gameName} style={{ height: '200px', objectFit: 'contain' }} />
      <div className="card-body">
        <h5 className="card-title">{gameName}</h5>
        {/* Aquí puedes agregar más detalles del juego si lo deseas */}
      </div>
    </div>
  </div>
);
};

export default Game;
