import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

export default function DefaultQuestions(props) {
  const [open, setOpen] = useState(false);
  const [defaultQuestions, setDefaultQuestions] = useState(10);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (typeof newValue === "number") {
      setDefaultQuestions(newValue);
      props.handleQuestionsClose();
    }
  };

  return (
    <div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}>
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: "2rem",
            color: "var(--main-purple)",
            "&:hover": { color: "#3f51b5" },
          }}
          variant="body1"
          onClick={handleOpen}
        >
          {" "}
          <span
            style={{
              color: "var(--main-purple)",
              fontWeight: "600",
              marginRight: "0.7rem",
            }}
          >
            {defaultQuestions}
          </span>
          <span style={{ color: "black" }}>&gt;</span>
        </Typography>
      </motion.div>

      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paperScrollPaper: "custom-dialog" }}
      >
        <motion.div initial="hidden" animate="visible">
          <DialogTitle sx={{ marginBottom: "3rem" }}>
            <button className="close-btn" onClick={handleClose}>
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
              value={defaultQuestions}
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
    </div>
  );
}
