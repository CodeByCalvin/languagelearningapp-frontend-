import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";
import "../css/review-customisation.css";
import IOSSwitch from "./iosswitch";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomTestCard() {
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

  return (
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

      <Card sx={{ borderRadius: "2rem", padding: "2rem", width: "90vw" }}>
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
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.2 }}
            >
              Start
            </motion.button>
          </Box>
        </CardContent>
      </Card>

      {/* MODAL WINDOW FOR NUMBER OF QUESTIONS */}
      <Dialog
        open={open}
        keepMounted={false}
        onClose={handleClose}
        classes={{ paperScrollPaper: "custom-dialog" }}
        TransitionComponent={({ children }) => (
          <AnimatePresence mode="out-in">
            {open && (
              <motion.div
                variants={{
                  hidden: { y: "100vh", opacity: 0 },
                  visible: {
                    y: "0",
                    opacity: 1,
                    transition: { delay: 0.05 },
                  },
                  exit: {
                    y: "100vh",
                    opacity: 0,
                    transition: { delay: 0.05 },
                  },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ position: "absolute", bottom: "20%", left: "30%" }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        )}
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
      </Dialog>
    </Box>
  );
}
