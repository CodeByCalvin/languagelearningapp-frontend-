import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { Box, Select, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function TextSize({ textSize, setTextSize }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextSizeChange = (event) => {
    const size = event.target.value;
    setTextSize(size);
    handleClose();
  };
  return (
    <div>
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
        {textSize}
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <motion.div initial="hidden" animate="visible">
          <DialogTitle sx={{ marginBottom: "2rem" }}>
            <button className="close-btn" onClick={handleClose}>
              X
            </button>
          </DialogTitle>
          <DialogContent>
            <Select
              value={textSize}
              onChange={handleTextSizeChange}
              sx={{
                fontSize: "2rem",
                fontWeight: "500",
                color: "var(--main-purple)",
              }}
            >
              <MenuItem
                sx={{
                  fontSize: "2rem",
                  color: "var(--main-purple)",
                  minWidth: "auto",
                }}
                value="small"
              >
                small
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "2rem",
                  color: "var(--main-purple)",
                  minWidth: "auto",
                }}
                value="medium"
              >
                medium
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "2rem",
                  color: "var(--main-purple)",
                  minWidth: "auto",
                }}
                value="large"
              >
                large
              </MenuItem>
            </Select>
          </DialogContent>
        </motion.div>
      </Dialog>
    </div>
  );
}
