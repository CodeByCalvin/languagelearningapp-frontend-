import React, { useState } from "react";
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
import IOSSwitch from "./iosswitch";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faHouse } from "@fortawesome/free-solid-svg-icons";

export default function ReviewSettings(props) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState(10);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (typeof newValue === "number") {
      setQuestions(newValue);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 300, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
        {/* CUSTOMISATION OPTIONS */}
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
              width: "90vw",
              boxShadow: "0px 3px 10px 0px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
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
                  Multiple Choice
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
                  True or False
                </Typography>
                <IOSSwitch />
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
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
