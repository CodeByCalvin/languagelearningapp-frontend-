import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import "../css/review-customisation.css";
import IOSSwitch from "./iosswitch";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "../css/settings.css";
import LanguageSelector from "./Settings/LanguageSelector";
import DeleteAccount from "./Settings/DeleteAccount";
import TextSize from "./Settings/TextSize";
import DefaultQuestions from "./Settings/DefaultQuestions";

export default function Settings(props) {
  const [selectedLanguage, setSelectedLanguage] = useState("GB");
  const [selectedLearningLanguage, setSelectedLearningLanguage] =
    useState("FR");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleQuestionsOpen = () => {
    setQuestionsOpen(true);
  };

  const handleQuestionsClose = () => {
    setQuestionsOpen(false);
  };

  return (
    <div>
      <Container fluid className="homeContainer">
        <FontAwesomeIcon
          icon={faHouse}
          className="houseIcon"
          onClick={() => props.setPage && props.setPage("home")}
        />
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100vh",
          width: "100vw",
          padding: "1em",
        }}
      >
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              borderRadius: "2rem",
              padding: "2rem",
              height: "auto",
              width: "90vw",
              boxShadow: "0px 3px 10px 0px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <div className="customisation-options">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    I speak
                  </Typography>
                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    setSelectedLanguage={setSelectedLanguage}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    I want to learn
                  </Typography>
                  <LanguageSelector
                    selectedLanguage={selectedLearningLanguage}
                    setSelectedLanguage={setSelectedLearningLanguage}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    Daily reminder
                  </Typography>
                  <IOSSwitch />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    Default questions
                  </Typography>
                  <DefaultQuestions
                    handleQuestionsOpen={handleQuestionsOpen}
                    handleQuestionsClose={handleQuestionsClose}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    Text size
                  </Typography>
                  <TextSize
                    textSize={props.textSize}
                    setTextSize={props.setTextSize}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    In-app sounds
                  </Typography>
                  <IOSSwitch />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    Haptic feedback
                  </Typography>
                  <IOSSwitch />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    High-contrast mode
                  </Typography>
                  <IOSSwitch />
                </Box>
              </div>
              <div className="customisation-options-btns">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <motion.button
                    className="start-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                  >
                    Help center
                  </motion.button>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <motion.button
                    className="delete-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.1 }}
                    onClick={handleDeleteOpen}
                  >
                    Delete account
                  </motion.button>
                  <DeleteAccount
                    open={deleteOpen}
                    handleDeleteOpen={handleDeleteOpen}
                    handleDeleteClose={handleDeleteClose}
                  />
                </Box>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </div>
  );
}
