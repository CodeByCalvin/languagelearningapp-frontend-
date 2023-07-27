import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { render } from "react-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "../components/AnimatedProgressProvider";
import "../css/review-results.css";
import chroma from "chroma-js";
import { ReactComponent as ArrowRight } from "../imgs/icons/arrow-right-solid.svg";
import { ReactComponent as RotateRight } from "../imgs/icons/rotate-right-solid.svg";
import "../css/learn-results.css";
import ApiServerClient from "../ApiServerClient";
import { userContext } from "../context/AuthContext";

export default function LearnResults(props) {
  const { user, setUser } = useContext(userContext);
  // Array of unique learned words
  const uniqueWords = Array.from(
    new Set(props.questions.map((question) => question.word))
  );

  useEffect(() => {
    console.log(user);
    if (uniqueWords.length === 0) {
      return;
    } else {
      const setLearnedWords = async () => {
        try {
          const response = await ApiServerClient.setLearnedWords(
            uniqueWords,
            user
          );
          const data = response.data;
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      setLearnedWords();
    }
  }, []);

  return (
    <motion.div
      className="learn"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="home-header">
        <FontAwesomeIcon
          icon={faHouse}
          className="houseIcon"
          onClick={() => props.navigateToPage("")}
        />
      </Container>

      <div className="results-container">
        <div className="results">
          <div className="results-header">Well done!</div>
          <div className="results-progress"></div>
          <div className="results-text">
            You learned{" "}
            <span style={{ color: "var(--main-purple)" }}>
              {Array.from(
                new Set(props.questions.map((question) => question.word))
              ).length - 1}
            </span>{" "}
            unique words today.
          </div>

          {/* List of unique learned words */}
          <ul className="word-list">
            {Array.from(
              new Set(props.questions.map((question) => question.word))
            ).map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>

          <div className="results-text"></div>
          <div className="results-footer">
            <RotateRight
              className="results-footer-icon"
              onClick={() => props.clearQuestions()}
            />
            <ArrowRight
              className="results-footer-icon"
              onClick={() => props.navigateToPage("")}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
