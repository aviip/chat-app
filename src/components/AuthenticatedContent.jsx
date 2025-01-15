// eslint-disable-next-line react/prop-types

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import DisplayChat from "./DisplayChat";
import UserList from "./UserList";
import CreateGroup from "./CreateTable";
import GroupList from "./GroupList";

const AuthenticatedContent = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [tabValue, setTabValue] = useState(0);
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
    const usersQuery = query(
      collection(db, "users"),
      where("uid", "!=", user?.uid)
    );
    const unsubscribeUsers = onSnapshot(usersQuery, (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    const groupsQuery = query(
      collection(db, "groups"),
      where("members", "array-contains", user?.uid)
    );
    const unsubscribeGroups = onSnapshot(groupsQuery, (querySnapshot) => {
      const groupsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroups(groupsData);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeGroups();
    };
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedChat(null);
    setSelectedUser(null);
  };

  return (
    <Box
      component="div"
      sx={{ width: "100%", maxWidth: 700, mx: "auto", textAlign: "center" }}
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="chat tabs"
              >
                <Tab label="Contacts" />
                <Tab label="Groups" />
              </Tabs>
              {tabValue === 0 && (
                <UserList
                  users={users}
                  onSelectUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              )}
              {tabValue === 1 && (
                <>
                  <GroupList groups={groups} onSelectGroup={setSelectedChat} />
                  <CreateGroup currentUser={user} />
                </>
              )}
            </Grid>
          </Grid>

          <Grid item xs={8}>
            {selectedUser || selectedChat ? (
              <DisplayChat
                currentUser={user}
                selectedUser={selectedUser}
                tabValue={tabValue}
                isGroup={tabValue === 1}
                selectedChat={selectedChat}
              />
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
