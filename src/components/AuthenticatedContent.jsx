// eslint-disable-next-line react/prop-types

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DisplayChat from "./DisplayChat";
import UserList from "./UserList";

const AuthenticatedContent = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "!=", user?.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <Box
      component="div"
      sx={{ width: "100%", maxWidth: 700, mx: "auto", textAlign: "center" }}
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <UserList
              users={users}
              onSelectUser={setSelectedUser}
              selectedUser={selectedUser}
            />
          </Grid>
          <Grid item xs={8}>
            {selectedUser ? (
              <DisplayChat currentUser={user} selectedUser={selectedUser} />
            ) : (
              <Typography variant="h6" align="center">
                Select a user to start chatting
              </Typography>
            )}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          color="secondary"
          size="small"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default AuthenticatedContent;
