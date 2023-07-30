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
import AnimatedProgressProvider from "../components/AnimatedProgressProvider";
import "../css/review-results.css";
import chroma from "chroma-js";
import { ReactComponent as ArrowRight } from "../imgs/icons/arrow-right-solid.svg";
import { ReactComponent as RotateRight } from "../imgs/icons/rotate-right-solid.svg";
import HomeButtonHeader from "../components/HomeButtonHeader";

export default function ReviewResults(props) {
  const [correctPercent, setCorrectPercent] = React.useState(0);
  const [correctInteger, setCorrectInteger] = React.useState(9);
  const [total, setTotal] = React.useState(10);
  const [currentPercent, setCurrentPercent] = React.useState(0);

  // Smooth colour transition
  const startColour = chroma("#E8E0FD");
  const endColour = chroma("#7950f2");

  // Create a chroma colour scale
  const colourScale = chroma.scale([startColour, endColour]);

  // Colour scale for current progress
  const currentColour = colourScale(currentPercent / 80).hex();

  // Incrementally increase the % until it reaches correctPercent (smooth animation)
  React.useEffect(() => {
    const percent = (correctInteger / total) * 100;
    setCorrectPercent(percent);

    const incrementInterval = setInterval(() => {
      setCurrentPercent((prevPercent) => {
        if (prevPercent < percent) {
          return prevPercent + 5;
        }
        clearInterval(incrementInterval);
        return prevPercent;
      });
    }, percent);

    return () => clearInterval(incrementInterval); //
  }, []);

  // Change the results header based on the % correct
  const setMessage = () => {
    if (correctPercent >= 80) {
      return "Well done!";
    } else if (correctPercent >= 60) {
      return "Good job!";
    } else if (correctPercent >= 40) {
      return "Not bad!";
    } else {
      return "Keep trying!";
    }
  };

  return (
    <motion.div
      className="learn"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="home-header">
        <HomeButtonHeader navigateToPage={props.navigateToPage} />
      </Container>

      <div className="results-container">
        <div className="results">
          <div className="results-header"> {setMessage(currentPercent)}</div>
          <div className="results-progress">
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={correctPercent}
              duration={1}
              easingFunction={easeQuadInOut}
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <CircularProgressbar
                    value={currentPercent}
                    className="results-progress-bar"
                    text={`${currentPercent}%`}
                    styles={buildStyles({
                      pathColor: currentColour,
                      textColor: "var(--main-purple)",
                      trailColor: "#d9d9d9",
                    })}
                  />
                );
              }}
            </AnimatedProgressProvider>
          </div>
          <div className="results-text">
            You answered{" "}
            <span style={{ color: "var(--main-purple)" }}>
              {correctInteger}
            </span>{" "}
            out of <span style={{ color: "var(--main-purple)" }}>{total}</span>{" "}
            questions correctly.
          </div>
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
