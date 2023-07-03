import React, { useEffect, useState } from "react";
import ApiServerClient from "../ApiServerClient";
import { Container, Row, Col } from "react-bootstrap";

const WordOfTheDay = () => {
  const [word, setWord] = useState("");

  useEffect(() => {
    getRandomWord();
  }, []);

  const getRandomWord = async () => {
    const response = await ApiServerClient.getRandomWord();
    const data = response.data;
    setWord(data.language.english.word);
  };

  return (
    <div className="word-of-the-day">
      <Container fluid>
        <h1>Word of the Day</h1>
        <h2>{word}</h2>
        <h2>{word}</h2>
      </Container>
    </div>
  );
};

export default WordOfTheDay;
