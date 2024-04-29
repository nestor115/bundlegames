import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const DetailsPage = () => {
  const routeLocation = useLocation();
  const { id } = useParams();
  const { name, photo, details } = routeLocation.state;
  return (
    <div>
      <h2>Detalles del Juego</h2>
      <h3>{name}</h3>
      <img
          src={photo}
          className="card-img-top"
          alt={name}
          style={{ height: "200px", objectFit: "contain" }}
        />
      <p>ID del Juego: {id}</p>
      <p>Año de publicacion: {details.year.value}</p>
      <p>Descripcion: {details.description}</p>
      <p>players: {details.minPlayers.value}-{details.maxPlayers.value}</p>
      <p>Publicado por: {details.publisher}</p>
    </div>
  );
};

export default DetailsPage;
