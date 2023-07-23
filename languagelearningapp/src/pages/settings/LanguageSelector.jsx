import React, { useState } from "react";
import { motion } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import { Dialog, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import { Box, Select, Typography } from "@mui/material";

export default function LanguageSelector({
  selectedLanguage,
  setSelectedLanguage,
  setSelectedLanguageName,
}) {
  const [open, setOpen] = useState(false);

  const countryFlags = [
    { name: "English", code: "GB" },
    { name: "French", code: "FR" },
    { name: "German", code: "DE" },
    { name: "Italian", code: "IT" },
    { name: "Spanish", code: "ES" },
    { name: "Portuguese", code: "PT" },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);

    const selectedCode = event.target.value;
    const selectedLanguage = countryFlags.find((language) => language.code === selectedCode);

    setSelectedLanguageName(selectedLanguage.name);

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
        {countryFlags.find((flag) => flag.code === selectedLanguage)?.name}{" "}
        {"  "}
        <ReactCountryFlag
          countryCode={
            countryFlags.find((flag) => flag.code === selectedLanguage)?.code
          }
          svg
          style={{
            width: "2em",
            height: "2em",
            marginRight: "10px",
          }}
        />
      </Typography>

      {/* MODAL WINDOW */}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paperScrollPaper: "custom-dialog" }}
      >
        <motion.div initial="hidden" animate="visible">
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
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {countryFlags.map((flag, index) => {
                return (
                  <MenuItem
                    sx={{ minWidth: "auto" }}
                    key={index}
                    value={flag.code}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "2rem", marginRight: "1rem" }}
                        variant="body1"
                      >
                        {flag.name}
                      </Typography>
                      <ReactCountryFlag
                        countryCode={flag.code}
                        svg
                        style={{
                          width: "2em",
                          height: "2em",
                          marginRight: "10px",
                        }}
                      />
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </DialogContent>
        </motion.div>
      </Dialog>
    </div>
  );
}
