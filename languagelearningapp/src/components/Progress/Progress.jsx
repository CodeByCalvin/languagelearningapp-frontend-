import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import ApiServerClient from "../../ApiServerClient";
import "../../css/progress.css";
import ProgressGraph from "./ProgressGraph";
import { Container, Modal, Button } from "react-bootstrap";
import CalendarComponent from "./Calendar";

export default function Progress(props) {
  const [activeModal, setActiveModal] = useState("");

  const [modalContent, setModalContent] = useState({
    learned: [],
    reviewed: [],
  });

  const [learnedWordsLength, setLearnedWordsLength] = useState(0);

  const hideModal = () => setActiveModal("");

  const getLearnedWords = async () => {
    const res = await ApiServerClient.getLearnedWords();
    console.log(res);
    return res.data.words_learned;
  };

  // Fetch learned words when activeModal becomes "learned"
  useEffect(() => {
    getLearnedWords()
      .then((words) => {
        setModalContent((prevContent) => ({ ...prevContent, learned: words }));
        setLearnedWordsLength(words.length);
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
        <FontAwesomeIcon
          icon={faHouse}
          className="houseIcon"
          onClick={() => props.navigateToPage("")}
        />
      </Container>
      <div className="calendar-card">
        {" "}
        <CalendarComponent onChange={props.onChange} value={props.value} />{" "}
      </div>
      <div className="graph-card">
        <ProgressGraph
          className="progress-graph"
          learnedWordsData={modalContent.learned.map((word) => word.length)}
        />
      </div>
      <div className="number-card-container">
        <div className="number-card" onClick={() => setActiveModal("learned")}>
          <h2>Words learned</h2>
          <div className="words-learned">{learnedWordsLength}</div>
        </div>
        <div className="number-card" onClick={() => setActiveModal("reviewed")}>
          <h2>Words reviewed</h2>
          <div className="words-reviewed">29</div>
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
            {modalContent[activeModal]?.map((word, index) => (
              <motion.li
                key={index}
                style={{
                  color: activeModal === "learned" ? "#7950f2" : "#60A7A8",
                }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {word}
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
