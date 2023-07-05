import React from "react";
import { motion } from "framer-motion";
import { Container, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faSliders, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "../css/ReviewChoice.css";

const ReviewChoice = (props) => {
  const { setPage } = props;
  return (
    <motion.div
      className="wotd"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container fluid className="homeContainer justify-content-between">
        <div>
          <FontAwesomeIcon
            icon={faHouse}
            className="houseIcon"
            onClick={() => setPage && setPage("home")}
          />
        </div>
        <div className="d-flex align-items-center rightBanner">
          <h1>0:13</h1>
          <FontAwesomeIcon icon={faSliders} className="slidersIcon" />
        </div>
      </Container>

      <Container fluid className="wotd-container">
        <div className="reviewMain">
          <h1>translation</h1>
          <FontAwesomeIcon className="i" icon={faVolumeHigh} />
        </div>
        <h2 className="correctText">Correct!</h2>
        <br />
        <h2>example</h2>
        <br />
        <br />
        <br />
        <div className="tfContainer">
          <div className="true">
            <h2>True</h2>
          </div>
          <div className="false">
            <h2>False</h2>
          </div>
        </div>
      </Container>

      <Container fluid className="descContainer">
        <div className="progBarContainer">
          <ProgressBar now={60} className="progBar" variant="custom-color" />
        </div>
      </Container>
    </motion.div>
  );
};

export default ReviewChoice;
