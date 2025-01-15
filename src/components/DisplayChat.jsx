/* eslint-disable react/prop-types */
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
import { useEffect, useRef, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";

const DisplayChat = ({
  currentUser,
  selectedUser,
  tabValue,
  isGroup,
  selectedChat,
}) => {
  console.log("selectedChat:", selectedChat);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!currentUser?.uid || !selectedUser?.uid) return;
    const chatRoomId = [currentUser?.uid, selectedUser?.uid].sort().join("_");
    let unsubscribe = () => {}; // Default noop unsubscribe function

    try {
      let q;
      if (isGroup) {
        q = query(
          collection(db, "messages"),
          where("groupId", "==", selectedChat.id),
          orderBy("createdAt")
        );
      } else {
        q = query(
          collection(db, "messages"),
          where("chatRoomId", "==", chatRoomId),
          orderBy("createdAt")
        );
      }

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }

    return () => unsubscribe();
  }, [currentUser, selectedUser, isGroup, selectedChat]);

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

    if (isGroup) {
      newMsg.groupId = selectedChat.id;
    } else {
      newMsg.chatRoomId = [currentUser?.uid, selectedUser?.uid]
        .sort()
        .join("_");
    }

    setMessages((prev) => [...prev, newMsg]);

    try {
      await addDoc(collection(db, "messages"), newMsg);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setNewMessage("");
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatDate = (date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM dd, yyyy");
  };

  const groupedMessages = messages.reduce((acc, msg) => {
    const messageDate = msg.createdAt.toDate();
    const formattedDate = formatDate(messageDate);

    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(msg);
    return acc;
  }, {});

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
      {
        <>
          <Paper sx={{ flex: 1, overflow: "auto", p: 2 }} elevation={1}>
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <Box key={date}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "center",
                    my: 1,
                    color: "text.secondary",
                  }}
                >
                  {date}
                </Typography>
                {msgs.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent:
                        msg.uid === auth.currentUser?.uid
                          ? "flex-end"
                          : "flex-start",
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
                      <Typography variant="body1">{msg.text}</Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            ))}
            <div ref={messagesEndRef} />
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
              size="small"
            />
            <Button type="submit" variant="contained" size="small">
              Send
            </Button>
          </Box>
        </>
      }
    </Box>
  );
};

export default DisplayChat;
