import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ApiServerClient from "../../ApiServerClient";
import "../../css/progress.css";
import ProgressGraph from "./ProgressGraph";
import { Container } from "react-bootstrap";
import CalendarComponent from "./Calendar";

export default function Progress(props) {
  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="progressDiv"
    >
      <Container fluid className="home-header">
        <FontAwesomeIcon
          icon={faHouse}
          className="houseIcon"
          onClick={() => props.navigateToPage("")}
        />
      </Container>
      <h1>Your Progress</h1>
      <div className="chart-card">
        {" "}
        <CalendarComponent onChange={props.onChange} value={props.value} />{" "}
      </div>
      <div className="chart-card">
        <ProgressGraph />
      </div>
      <div className="number-card-container">
        <div className="number-card">
          <h2>Words learned</h2>
          <div className="words-learned">34</div>
        </div>
        <div className="number-card">
          <h2>Words reviewed</h2>
          <div className="words-reviewed">29</div>
        </div>
      </div>
    </motion.div>
  );
}
