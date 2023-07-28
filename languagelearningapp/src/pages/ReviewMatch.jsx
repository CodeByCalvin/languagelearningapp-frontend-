import React, { useState, useEffect, useContext } from "react";
import Card from "../components/card";
import "../css/Cardcontainer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PlaceholderLoader from "../components/PlaceholderLoader";
import { motion } from "framer-motion";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSliders,
  faVolumeHigh,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReviewTimer from "../components/ReviewTimer";
import ApiServerClient from "../ApiServerClient";
import ReviewContext from "../context/ReviewContext";
import AppContext from "../context/AppContext";
import HomeButtonHeader from "../components/HomeButtonHeader";

const ReviewMatch = (props) => {
  const navigate = useNavigate();

  // context
  const { rVal } = useContext(ReviewContext);
  const { qAmount } = rVal;
  const { timer } = rVal;

  // App context
  const { aVal } = useContext(AppContext);
  const { learnLanguage } = aVal;
  const learnLanguageString = learnLanguage.toString().toLowerCase();

  const languageSelect = {
    german: 0,
    spanish: 1,
    italian: 2,
    french: 3,
    Portuguese: 4,
  };

  const gameData = [
    [
      { id: 1, words: ["House", "Haus"], matched: false },
      { id: 2, words: ["City", "Stadt"], matched: false },
      { id: 3, words: ["School", "Schule"], matched: false },
      { id: 4, words: ["Brother", "Bruder"], matched: false },
      { id: 5, words: ["Clothes", "Kleidung"], matched: false },
      { id: 6, words: ["Sister", "Schwester"], matched: false },
    ],
    [
      { id: 1, words: ["House", "Casa"], matched: false },
      { id: 2, words: ["City", "Ciudad"], matched: false },
      { id: 3, words: ["School", "Escuela"], matched: false },
      { id: 4, words: ["Brother", "Hermano"], matched: false },
      { id: 5, words: ["Clothes", "Ropa"], matched: false },
      { id: 6, words: ["Sister", "Hermana"], matched: false },
    ],
    [
      { id: 1, words: ["House", "Casa"], matched: false },
      { id: 2, words: ["City", "Città"], matched: false },
      { id: 3, words: ["School", "Scuola"], matched: false },
      { id: 4, words: ["Brother", "Fratello"], matched: false },
      { id: 5, words: ["Clothes", "Vestiti"], matched: false },
      { id: 6, words: ["Sister", "Sorella"], matched: false },
    ],
    [
      { id: 1, words: ["House", "Maison"], matched: false },
      { id: 2, words: ["City", "Ville"], matched: false },
      { id: 3, words: ["School", "École"], matched: false },
      { id: 4, words: ["Brother", "Frère"], matched: false },
      { id: 5, words: ["Clothes", "Vêtements"], matched: false },
      { id: 6, words: ["Sister", "Sœur"], matched: false },
    ],
    [
      { id: 1, words: ["House", "Casa"], matched: false },
      { id: 2, words: ["City", "Cidade"], matched: false },
      { id: 3, words: ["School", "Escola"], matched: false },
      { id: 4, words: ["Brother", "Irmão"], matched: false },
      { id: 5, words: ["Clothes", "Roupas"], matched: false },
      { id: 6, words: ["Sister", "Irmã"], matched: false },
    ],
  ];

  const pairs = gameData[languageSelect.italian];

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Initialize the game with shuffled cards
  useEffect(() => {
    console.log(pairs[1].words[1]);
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
        (prevCard.word === pairs[0].words[0] &&
          card.word === pairs[0].words[1]) ||
        (prevCard.word === pairs[0].words[1] &&
          card.word === pairs[0].words[0]) ||
        (prevCard.word === pairs[1].words[0] &&
          card.word === pairs[1].words[1]) ||
        (prevCard.word === pairs[1].words[1] &&
          card.word === pairs[1].words[0]) ||
        (prevCard.word === pairs[2].words[0] &&
          card.word === pairs[2].words[1]) ||
        (prevCard.word === pairs[2].words[1] &&
          card.word === pairs[2].words[0]) ||
        (prevCard.word === pairs[3].words[0] &&
          card.word === pairs[3].words[1]) ||
        (prevCard.word === pairs[3].words[1] &&
          card.word === pairs[3].words[0]) ||
        (prevCard.word === pairs[4].words[0] &&
          card.word === pairs[4].words[1]) ||
        (prevCard.word === pairs[4].words[1] &&
          card.word === pairs[4].words[0]) ||
        (prevCard.word === pairs[5].words[0] &&
          card.word === pairs[5].words[1]) ||
        (prevCard.word === pairs[5].words[1] && card.word === pairs[5].words[0])
      ) {
        setMatchedPairs((prevMatchedPairs) => [
          ...prevMatchedPairs,
          card.id,
          prevCard.id,
        ]);
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === card.id || c.id === prevCard.id
              ? { ...c, matched: true }
              : c
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
      alert("Good job!");
    }
  }, [matchedPairs]);

  return (
    <motion.div
      className="wotd"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="homeContainer justify-content-between">
        <HomeButtonHeader navigateToPage={props.navigateToPage} />
        <div></div>
        <div className="d-flex align-items-center rightBanner">
          {/* {timer && <ReviewTimer />} */}
          <FontAwesomeIcon
            icon={faSliders}
            className="slidersIcon"
            onClick={navigate.bind(this, "/review")}
          />
        </div>
      </Container>
      <Container fluid className="wotd-container">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {cards.map((card) => (
              <div className="col" key={card.id}>
                <Card
                  word={card.word}
                  isMatched={card.matched}
                  isFlipped={card.flipped}
                  onClick={() => handleCardClick(card)}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default ReviewMatch;
