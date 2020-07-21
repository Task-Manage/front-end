import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItemText, ListItem, ListItemIcon } from "@material-ui/core";
import { AssignmentIndRounded } from "@material-ui/icons";

function TabEmployees() {
  return (
    <div>
      <List>
        <NavLink to="/admin/employees" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIndRounded />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
}

export default TabEmployees;
