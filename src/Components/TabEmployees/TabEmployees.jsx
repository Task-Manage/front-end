import React from "react";
import { List, ListItemText, ListItem, ListItemIcon } from "@material-ui/core";
import { AssignmentIndRounded } from "@material-ui/icons";

function TabEmployees() {
  return (
    <div>
      <List>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIndRounded />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
      </List>
    </div>
  );
}

export default TabEmployees;
