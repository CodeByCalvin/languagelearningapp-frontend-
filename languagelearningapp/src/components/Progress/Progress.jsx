import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ApiServerClient from "../../ApiServerClient";
import "../../css/progress.css";
import ProgressGraph from "./ProgressGraph";
import { Container, Modal, Button } from "react-bootstrap";
import CalendarComponent from "./Calendar";
import HomeButtonHeader from "../HomeButtonHeader";
import { userContext } from "../../context/AuthContext";

export default function Progress(props) {
  const { user, setUser } = useContext(userContext);
  const [activeModal, setActiveModal] = useState("");

  const [modalContent, setModalContent] = useState({
    learned: [],
    reviewed: [],
  });

  // Learned words
  const [learnedWordsLength, setLearnedWordsLength] = useState(0);
  const [learnedWordsDates, setLearnedWordsDates] = useState([]);
  const [learnedWordsCounts, setLearnedWordsCounts] = useState([]);

  // Reviewed words
  const [reviewedWordsLength, setReviewedWordsLength] = useState(0);
  const [reviewedWordsDates, setReviewedWordsDates] = useState([]);
  const [reviewedWordsCounts, setReviewedWordsCounts] = useState([]);

  const hideModal = () => setActiveModal("");

  const getLearnedWords = async () => {
    try {
      const res = await ApiServerClient.getLearnedWords(user);
      console.log("Response:", res);
      if (!res.data.words_learned || !Array.isArray(res.data.words_learned)) {
        console.error("Unexpected format from API:", res.data);
        return [];
      }
      return res.data.words_learned;
    } catch (error) {
      console.error("Error fetching learned words:", error);
      return [];
    }
  };

  const getReviewedWords = async () => {
    try {
      const res = await ApiServerClient.getReviewedWords(user);
      console.log("Response:", res);
      if (!res.data.words_reviewed || !Array.isArray(res.data.words_reviewed)) {
        console.error("Unexpected format from API:", res.data);
        return [];
      }
      return res.data.words_reviewed;
    } catch (error) {
      console.error("Error fetching learned words:", error);
      return [];
    }
  };

  // Fetch both learned and reviewed words initially
  useEffect(() => {
    getLearnedWords()
      .then((words) => {
        setModalContent((prevContent) => ({ ...prevContent, learned: words }));
        setLearnedWordsLength(words.length);

        // Group by date and count words per day
        let dateCounts = words.reduce((acc, wordObject) => {
          let date = new Date(wordObject.learned_date);
          // Format date as "DD-MM-YYYY"
          let formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          acc[formattedDate] = (acc[formattedDate] || 0) + 1;
          return acc;
        }, {});

        // Split the object into separate arrays for dates and counts
        let dates = Object.keys(dateCounts);
        let counts = Object.values(dateCounts);

        setLearnedWordsDates(dates);
        setLearnedWordsCounts(counts);
      })
      .catch((error) => console.error(error));

    getReviewedWords()
      .then((words) => {
        setModalContent((prevContent) => ({ ...prevContent, reviewed: words }));
        setReviewedWordsLength(words.length);

        let dateCounts = words.reduce((acc, wordObject) => {
          let date = new Date(wordObject.reviewed_date);
          let formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          acc[formattedDate] = (acc[formattedDate] || 0) + 1;
          return acc;
        }, {});

        let dates = Object.keys(dateCounts);
        let counts = Object.values(dateCounts);

        setReviewedWordsDates(dates);
        setReviewedWordsCounts(counts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="progressDiv"
    >
      <Container fluid className="home-header">
        <HomeButtonHeader navigateToPage={props.navigateToPage} />
      </Container>
      <div className="calendar-card">
        {" "}
        <CalendarComponent
          onChange={props.onChange}
          value={props.value}
          learnedWordsDates={learnedWordsDates}
          reviewedWordsDates={reviewedWordsDates}
        />{" "}
      </div>
      <div className="graph-card">
        <ProgressGraph
          className="progress-graph"
          learnedWordsDates={learnedWordsDates}
          learnedWordsData={learnedWordsCounts}
          reviewedWordsDates={reviewedWordsDates}
          reviewedWordsData={reviewedWordsCounts}
        />
      </div>
      <div className="number-card-container">
        <div className="number-card" onClick={() => setActiveModal("learned")}>
          <h2>Words learned</h2>
          <div className="words-learned">{learnedWordsLength}</div>
        </div>
        <div className="number-card" onClick={() => setActiveModal("reviewed")}>
          <h2>Words reviewed</h2>
          <div className="words-reviewed">{reviewedWordsLength}</div>
        </div>
      </div>

      {/* Modal (Learned) */}
      <Modal
        show={activeModal === "learned" || activeModal === "reviewed"}
        onHide={hideModal}
        className="learned-modal"
      >
        <Modal.Header className="modal-title">
          {activeModal === "learned" ? "Words Learned" : "Words Reviewed"}
        </Modal.Header>
        <Modal.Body className="modal-body">
          <ul>
            {modalContent[activeModal]?.map((wordObject, index) => (
              <motion.li
                key={index}
                style={{
                  color: activeModal === "learned" ? "#7950f2" : "#60A7A8",
                }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {wordObject.word}
              </motion.li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="modal-button"
            style={{
              backgroundColor:
                activeModal === "learned" ? "#7950f2" : "#60A7A8",
            }}
            onClick={() => hideModal()}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
}
