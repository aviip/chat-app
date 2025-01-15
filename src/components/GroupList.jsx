/* eslint-disable react/prop-types */

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const GroupList = ({ groups, onSelectGroup }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Typography variant="h6" sx={{ px: 2, py: 1 }}>
        Groups
      </Typography>
      {groups?.map((group) => (
        <ListItem key={group.id} disablePadding>
          <ListItemButton onClick={() => onSelectGroup(group)}>
            <ListItemAvatar>
              <Avatar>{group.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={group.name}
              secondary={`${group.members.length} members`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default GroupList;
