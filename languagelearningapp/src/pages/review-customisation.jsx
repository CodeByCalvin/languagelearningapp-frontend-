import React, { useEffect, useState, useContext } from "react";
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
} from "@mui/material";
import "../css/review-customisation.css";
import IOSSwitch from "../components/iosswitch";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import HomeButtonHeader from "../components/HomeButtonHeader";
import ReviewContext from "../context/ReviewContext";
import { useNavigate } from "react-router-dom";

export default function ReviewSettings(props) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState(10);

  // IOSSwitch states
  const [checkedTimer, setCheckedTimer] = useState(false);
  const [checkedChoice, setCheckedChoice] = useState(false);
  const [checkedTrueFalse, setCheckedTrueFalse] = useState(false);
  const [checkedMatch, setCheckedMatch] = useState(false);

  // context
  const { rVal, rFunc } = useContext(ReviewContext);

  const navigate = useNavigate();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 300, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    // if true/false is checked, disable multiple choice
    if (checkedTrueFalse) {
      setCheckedChoice(false);
      setCheckedMatch(false);
    }
    if (checkedChoice) {
      setCheckedTrueFalse(false);
      setCheckedMatch(false);
    }
    if (checkedMatch) {
      setCheckedTrueFalse(false);
      setCheckedChoice(false);
    }
  }, [checkedTrueFalse, checkedChoice, checkedMatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (typeof newValue === "number") {
      setQuestions(newValue);
    }
  };

  const startReview = () => {
    rFunc((rVal) => ({ ...rVal, qAmount: questions }));
    rFunc((rVal) => ({ ...rVal, timer: checkedTimer }));

    if (checkedChoice) {
      navigate("/review/choice");
    } else if (checkedTrueFalse) {
      navigate("/review/truefalse");
    } else if (checkedMatch) {
      navigate("/review/match");
    }
  };

  return (
    <div>
      <HomeButtonHeader navigateToPage={props.navigateToPage} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          padding: "1em",
        }}
      >
        {/* CUSTOMISATION OPTIONS */}
        <motion.div
          className="review-custom"
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className="col-12 col-md-6 col-lg-4"
            sx={{
              borderRadius: "2rem",
              padding: "2rem",
              boxShadow: "0px 3px 10px 0px rgba(0,0,0,0.1)",
            }}
          >
            <div className="reviewCustomTop">
              <h3>Review Customisation</h3>
            </div>
            <CardContent className="p-0">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "2rem" }} variant="body1">
                  Number of Questions
                </Typography>
                <Typography
                  sx={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: "var(--main-purple)",
                    "&:hover": { color: "#3f51b5" },
                  }}
                  variant="body1"
                  onClick={handleClickOpen}
                >
                  <span
                    style={{
                      color: "var(--main-purple)",
                      fontWeight: "600",
                      marginRight: "0.7rem",
                    }}
                  >
                    {questions}
                  </span>
                  <span style={{ color: "black" }}>&gt;</span>
                </Typography>
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
                  Timer
                </Typography>
                <IOSSwitch
                  checked={checkedTimer}
                  setChecked={setCheckedTimer}
                />
              </Box>

              <hr />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "2rem" }} variant="body1">
                  Multiple Choice
                </Typography>
                <IOSSwitch
                  checked={checkedChoice}
                  setChecked={setCheckedChoice}
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
                  True or False
                </Typography>
                <IOSSwitch
                  checked={checkedTrueFalse}
                  setChecked={setCheckedTrueFalse}
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
                  Match
                </Typography>
                <IOSSwitch
                  checked={checkedMatch}
                  setChecked={setCheckedMatch}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <motion.button
                  className="start-btn"
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startReview}
                >
                  Start
                </motion.button>
              </Box>
            </CardContent>
          </Card>
          {/* MODAL WINDOW FOR NUMBER OF QUESTIONS */}
          <Dialog
            open={open}
            onClose={handleClose}
            classes={{ paperScrollPaper: "custom-dialog" }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
            >
              <DialogTitle sx={{ marginBottom: "3rem" }}>
                <button className="close-btn" onClick={() => handleClose()}>
                  X
                </button>
              </DialogTitle>

              <DialogContent>
                <Select
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "500",
                    color: "var(--main-purple)",
                  }}
                  value={questions}
                  onChange={(event) => handleClose(Number(event.target.value))}
                >
                  <MenuItem
                    sx={{
                      fontSize: "1.8rem",
                      fontWeight: "500",
                      color: "var(--main-purple)",
                    }}
                    value={5}
                  >
                    5
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: "1.8rem",
                      fontWeight: "500",
                      color: "var(--main-purple)",
                    }}
                    value={10}
                  >
                    10
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: "1.8rem",
                      fontWeight: "500",
                      color: "var(--main-purple)",
                    }}
                    value={15}
                  >
                    15
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: "1.8rem",
                      fontWeight: "500",
                      color: "var(--main-purple)",
                    }}
                    value={20}
                  >
                    20
                  </MenuItem>
                </Select>
              </DialogContent>
            </motion.div>
          </Dialog>
        </motion.div>
      </Box>
    </div>
  );
}
