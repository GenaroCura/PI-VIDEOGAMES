import React from 'react';
import style from './CardsContainer.module.css';
import Card from '../Card/Card';

const CardsContainer = ({ allGames }) => {
  return (
    <div className={style.CardsContainer}>
      {allGames.map((game) => {
        if(game.created){
          return <Card name={game.name} genres={game.genres} image={game.image} id={game.id} key={game.id} created={game.created} rating={game.rating}/>
        }
        return <Card key={game.id} name={game.name} genres={game.genres} image={game.image} id={game.id} rating={game.rating} />
      }
      )}
    </div>
  );
};

export default CardsContainer;
