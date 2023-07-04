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

export default function CustomTestCard() {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState(10);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
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
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Customize Your Test
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              alignItems: "center",
              width: "90vw",
            }}
          >
            <Typography variant="body1">Number of Questions:</Typography>
            <Button variant="outlined" onClick={handleClickOpen}>
              {questions} &gt;
            </Button>
          </Box>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Choose the number of questions</DialogTitle>
            <DialogContent>
              <Select
                value={questions}
                onChange={(event) => handleClose(event.target.value)}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
          </Dialog>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">Timer</Typography>
            <Switch />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">Multiple Choice</Typography>
            <Switch />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">True or False</Typography>
            <Switch />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button className="start-btn">Start</button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
