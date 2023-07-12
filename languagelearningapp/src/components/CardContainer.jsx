import React from 'react';

const CardContainer = () => {
    const cardData = [
        'Card 1',
        'Card 2',
        'Card 3',
        'Card 4',
        'Card 5',
        'Card 6',
        'Card 7',
        'Card 8',
        'Card 9',
        'Card 10',
        'Card 11',
        'Card 12',
      ];
  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          {card}
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
