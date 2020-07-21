import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItemText, ListItem, ListItemIcon } from "@material-ui/core";
import { ListAltRounded } from "@material-ui/icons";

function TabTask() {
  return (
    <div>
      <List>
        <NavLink to="/admin/tasks" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <ListAltRounded />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}

export default TabTask;
