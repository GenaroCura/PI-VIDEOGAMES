import React from 'react';
import style from './CardsContainer.module.css';
import Card from '../Card/Card';

const CardsContainer = ({ allGames }) => {
  return (
    <div className={style.CardsContainer}>
      {allGames.map((game) => {
        //Aca voy a verificar si el juego es creado, 
        if (game.created) {
        //Como los creados al relacionarlo con el modelo Genres, tienen la propiedad genres como un arreglo de obj, los voy a convertir a string para mostrar los generos en las tarjetas.
        const genresString = game.genres.map((genre) => genre.name).join(', ');
        // Creo una copia del juego con la propiedad 'genres' actualizada
        const updatedGame = {
            ...game,
            genres: genresString,
          };
          return <Card game={updatedGame} key={game.id} />;
        }
        return <Card game={game} key={game.id} />;
      })}
    </div>
  );
};

export default CardsContainer;
