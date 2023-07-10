import React, { useState, useEffect } from 'react';
import Card from './card';
import "../css/Cardcontainer.css";

const pairs = [
  { id: 1, words: ['Hello', 'Hola'], matched: false },
  { id: 2, words: ['Goodbye', 'Adiós'], matched: false },
  { id: 3, words: ['School', 'Escuela'], matched: false },
  { id: 4, words: ['Brother', 'Hermano'], matched: false },
  { id: 5, words: ['Clothes', 'Ropa'], matched: false },
  { id: 6, words: ['Sister', 'Hermana'], matched: false },
];

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Initialize the game with shuffled cards
  useEffect(() => {
    const shuffledPairs = pairs.sort(() => 0.5 - Math.random());
  
    // Flatten the words from shuffled pairs
    const words = shuffledPairs.flatMap((pair) => pair.words);
  
    // Make sure correct pairs are not adjacent
    let initialCards = [];
    let usedIndices = [];
  
    for (let i = 0; i < pairs.length * 2; i++) {
      let randomIndex;
  
      do {
        randomIndex = Math.floor(Math.random() * words.length);
      } while (usedIndices.includes(randomIndex));
  
      usedIndices.push(randomIndex);
  
      initialCards.push({
        id: i + 1,
        word: words[randomIndex],
        matched: false,
        flipped: false,
      });
    }
  
    setCards(initialCards);
  }, []);
  

  // Handle card click event
  const handleCardClick = (card) => {
    if (card.matched || flippedCards.length === 2) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : { ...c, flipped: false }
      )
    );
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);

    if (flippedCards.length === 1) {
      const [prevCard] = flippedCards;
      if (
        (prevCard.word === 'Hello' && card.word === 'Hola') ||
        (prevCard.word === 'Hola' && card.word === 'Hello') ||
        (prevCard.word === 'Goodbye' && card.word === 'Adiós') ||
        (prevCard.word === 'Adiós' && card.word === 'Goodbye') ||
        (prevCard.word === 'School' && card.word === 'Escuela') ||
        (prevCard.word === 'Escuela' && card.word === 'School') ||
        (prevCard.word === 'Brother' && card.word === 'Hermano') ||
        (prevCard.word === 'Hermano' && card.word === 'Brother') ||
        (prevCard.word === 'Clothes' && card.word === 'Ropa') ||
        (prevCard.word === 'Ropa' && card.word === 'Clothes') ||
        (prevCard.word === 'Sister' && card.word === 'Hermana') ||
        (prevCard.word === 'Hermana' && card.word === 'Sister')
      ) {
        setMatchedPairs((prevMatchedPairs) => [...prevMatchedPairs, card.id, prevCard.id]);
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === card.id || c.id === prevCard.id ? { ...c, matched: true } : c
          )
        );
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              flippedCards.includes(c) ? { ...c, flipped: false } : c
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  };

  // Check if all pairs are matched
  useEffect(() => {
    if (matchedPairs.length === pairs.length * 2) {
      alert('Congratulations! You have matched all pairs.');
    }
  }, [matchedPairs]);

  return (
    <div className="game">
      <div className="box">
        {cards.map((card) => (
          <Card
            key={card.id}
            word={card.word}
            isMatched={card.matched}
            isFlipped={card.flipped}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
