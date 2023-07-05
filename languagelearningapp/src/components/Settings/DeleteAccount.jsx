import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";

export default function DeleteAccount({
  open,
  handleDeleteOpen,
  handleDeleteClose,
}) {
  const handleDelete = () => {
    console.log("Account deleted");
    handleDeleteClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDeleteOpen}
      classes={{ paperScrollPaper: "custom-dialog" }}
    >
      <motion.div initial="hidden" animate="visible">
        <DialogTitle sx={{ fontSize: "2rem" }}>
          This permanently deletes your account. This change is irreverisble.
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <motion.button
              className="delete-no-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              onClick={handleDeleteClose} //
            >
              No
            </motion.button>
            <motion.button
              className="delete-yes-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              onClick={handleDelete}
            >
              Yes
            </motion.button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
