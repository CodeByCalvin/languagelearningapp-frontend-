import React, { useState, useContext, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import "../css/review-customisation.css";
import IOSSwitch from "../components/iosswitch";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "../css/settings.css";
import LanguageSelector from "./settings/LanguageSelector";
import DeleteAccount from "./settings/DeleteAccount";
import TextSize from "./settings/TextSize";
import DefaultQuestions from "./settings/DefaultQuestions";
import AppContext from "../context/AppContext";
import { userContext } from "../context/AuthContext";
import HomeButtonHeader from "../components/HomeButtonHeader";

export default function Settings(props) {
  const { user, setUser } = useContext(userContext);
  // context
  const { aVal, aFunc } = useContext(AppContext);

  const [selectedLanguage, setSelectedLanguage] = useState(
    aVal.selectedLanguageCode
  );
  const [selectedLearningLanguage, setSelectedLearningLanguage] = useState(
    aVal.learnLanguageCode
  );
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const [selectedLanguageName, setSelectedLanguageName] = useState("");
  const [selectedLearnLanguageName, setSelectedLearnLanguageName] =
    useState("");

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

  useEffect(() => {
    aFunc((aVal) => ({ ...aVal, selectedLanguageCode: selectedLanguage }));
    aFunc((aVal) => ({ ...aVal, learnLanguageCode: selectedLearningLanguage }));
  }, [selectedLearningLanguage]);

  useEffect(() => {
    aFunc((aVal) => ({ ...aVal, selectedLanguage: selectedLanguageName }));
    aFunc((aVal) => ({ ...aVal, learnLanguage: selectedLearnLanguageName }));
  }, [selectedLearnLanguageName]);

  useEffect(() => {
    setSelectedLanguage(aVal.selectedLanguageCode);
    setSelectedLearningLanguage(aVal.learnLanguageCode);
    setSelectedLanguageName(aVal.selectedLanguage);
    setSelectedLearnLanguageName(aVal.learnLanguage);
    console.log("select " + aVal.selectedLanguage);
    console.log("learn " + aVal.learnLanguage);
  }, []);

  return (
    <div>
      <Container fluid className="homeContainer"></Container>
      <HomeButtonHeader navigateToPage={props.navigateToPage} />
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
                {!!user && <h2>Settings for {user.name}</h2>}
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
                    setSelectedLanguageName={setSelectedLanguageName}
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
                    setSelectedLanguageName={setSelectedLearnLanguageName}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "2rem" }} variant="body1">
                    Another Setting
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
