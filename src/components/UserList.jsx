/* eslint-disable react/prop-types */
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const UserList = ({ users, onSelectUser }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6" sx={{ px: 2, py: 1 }}>
        Contacts
      </Typography>
      {users?.map((user) => (
        <ListItem key={user.id} disablePadding>
          <ListItemButton onClick={() => onSelectUser(user)}>
            <ListItemAvatar>
              <Avatar>{user.displayName[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.displayName} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;