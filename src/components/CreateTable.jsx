/* eslint-disable react/prop-types */
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CreateGroup = ({ currentUser }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (groupName.trim() === "") return;

    try {
      await addDoc(collection(db, "groups"), {
        name: groupName,
        createdBy: currentUser.uid,
        members: [currentUser.uid],
        createdAt: new Date(),
      });
      setGroupName("");
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleCreateGroup} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Create New Group
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
        sx={{ mb: 1 }}
      />
      <Button type="submit" variant="contained" fullWidth>
        Create Group
      </Button>
    </Box>
  );
};

export default CreateGroup;
