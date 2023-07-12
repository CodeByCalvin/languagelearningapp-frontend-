import React from "react";
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
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "../css/review-results.css";
import chroma from "chroma-js";
import { ReactComponent as ArrowRight } from "../imgs/icons/arrow-right-solid.svg";
import { ReactComponent as RotateRight } from "../imgs/icons/rotate-right-solid.svg";
import "../css/learn-results.css";

export default function LearnResults(props) {
  const { questions } = props;

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
          onClick={() => props.setPage && props.setPage("home")}
        />
      </Container>

      <div className="results-container">
        <div className="results">
          <div className="results-header">Well done!</div>
          <div className="results-progress"></div>
          <div className="results-text">
            You learned{" "}
            <span style={{ color: "var(--main-purple)" }}>
              {props.initialQuestionLength}
            </span>{" "}
            new words today.
          </div>

          {/* List of learned words */}
          <ul className="word-list">
            {questions.map((question, index) => (
              <li key={index}>{question.word}</li>
            ))}
          </ul>

          <div className="results-text"></div>
          <div className="results-footer">
            <RotateRight
              className="results-footer-icon"
              onClick={() => props.setPage && props.setPage("learn")}
            />
            <ArrowRight
              className="results-footer-icon"
              onClick={() => props.setPage && props.setPage("home")}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
