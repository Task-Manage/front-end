import React from "react";
import { List, ListItemText } from "@material-ui/core";
import { ListAltRounded } from "@material-ui/icons";

import TableComponent from "../../Components/TableComponent/TableComponent";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import Sidebar from "../../Components/Sidebar/Sidebar";

function UserPage() {
  const modalEdit = <ModalEdit />;
  const tabTasks = (
    <List>
      <ListAltRounded /> <ListItemText primary="Tasks" />
    </List>
  );
  const table = <TableComponent modalEdit={modalEdit} />;

  return (
    <div>
      <Sidebar tabTasks={tabTasks} table={table} />
    </div>
  );
}

export default UserPage;
