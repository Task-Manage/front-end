import React from "react";
import { List, ListItemText } from "@material-ui/core";
import { AssignmentIndRounded, ListAltRounded } from "@material-ui/icons";

import TableComponent from "../../Components/TableComponent/TableComponent";
import AlertDelete from "../../Components/AlertDelete/AlertDelete";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import Sidebar from "../../Components/Sidebar/Sidebar";

function AdminPage() {
  const alertDelete = <AlertDelete />;
  const modalEdit = <ModalEdit />;
  const table = (
    <TableComponent modalEdit={modalEdit} alertDelete={alertDelete} />
  );
  const tabTasks = (
    <List>
      <ListAltRounded /> <ListItemText primary="Tasks" />
    </List>
  );
  const tabEmployees = (
    <List>
      <AssignmentIndRounded /> <ListItemText primary="Employees" />
    </List>
  );
  return (
    <div>
      <Sidebar tabEmployees={tabEmployees} tabTasks={tabTasks} table={table} />
    </div>
  );
}

export default AdminPage;
