/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const DisplayChat = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!currentUser?.uid || !selectedUser?.uid) return;
    const chatRoomId = [currentUser?.uid, selectedUser?.uid].sort().join("_");

    try {
      const q = query(
        collection(db, "messages"),
        where("chatRoomId", "==", chatRoomId),
        orderBy("createdAt")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setMessages(messagesData);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [currentUser, selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewMessage("");
    if (newMessage.trim() === "") return;

    const newMsg = {
      text: newMessage,
      createdAt: Timestamp.now(),
      uid: auth?.currentUser.uid,
      displayName: auth?.currentUser.displayName,
      chatRoomId: [currentUser?.uid, selectedUser?.uid].sort().join("_"),
    };

    setMessages((prev) => [...prev, newMsg]);

    try {
      await addDoc(collection(db, "messages"), newMsg);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: 500,
        bgcolor: "background.paper",
      }}
    >
      <Paper sx={{ flex: 1, overflow: "auto", p: 2 }} elevation={1}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent:
                msg.uid === auth.currentUser?.uid ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1,
                bgcolor:
                  msg.uid === auth.currentUser?.uid
                    ? "primary.light"
                    : "grey.200",
                maxWidth: "70%",
              }}
            >
              <Typography variant="caption">
                {msg?.displayName.split(" ")[0] || "user"}
              </Typography>
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Paper>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", p: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default DisplayChat;
