import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/AuthContext";
import { logoutUser } from "../../utils/auth";
import { toast } from "react-hot-toast";
import ApiServerClient from "../../ApiServerClient";

export default function DeleteAccount({
  open,
  handleDeleteOpen,
  handleDeleteClose,
}) {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log(id);
    if (user.name !== 'Guest') {
      try {
        await ApiServerClient.authDelete(`user/${id}`);
        setUser(null);
        navigate('/login');
        toast.success('User deleted');
        handleDeleteClose();
        console.log('User deleted');
      } catch (error) {
        console.log('error');
        console.log(error);
      }
    } else {
      toast.error('You must be logged in to delete a user');
    }
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
              onClick={() => {handleDelete(user._id)}}
            >
              Yes
            </motion.button>
          </Box>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
