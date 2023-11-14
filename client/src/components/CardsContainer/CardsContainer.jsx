import React from 'react';
import style from './CardsContainer.module.css';
import Card from '../Card/Card';

const CardsContainer = ({ allGames }) => {
  return (
    <div className={style.CardsContainer}>
      {allGames.map((game) => (
        <Card key={game.id} game={game} />
      ))}
    </div>
  );
};

export default CardsContainer;
