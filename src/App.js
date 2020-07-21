import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import UserPage from "./Pages/UserPage/UserPage";
import TableComponent from "./Components/TableComponent/TableComponent";
import AlertDelete from "./Components/AlertDelete/AlertDelete";
import ModalEdit from "./Components/ModalEdit/ModalEdit";
import ModalAdd from "./Components/ModalAdd/ModalAdd";
import AdminPage from "./Pages/AdminPage/AdminPage";
// import TableUser from "./Components/TableUser/TableUser";

function App() {
  const alertDelete = <AlertDelete />;
  const modalEdit = <ModalEdit />;
  const taskHead = [
    { id: "task", label: "Task", minWidth: 170 },
    { id: "pic", label: "PIC", minWidth: 100 },
    {
      id: "status",
      label: "Status",
      align: "center",
      minWidth: 170,
    },
  ];
  const tableTaskAdmin = (
    <TableComponent
      modalEdit={modalEdit}
      alertDelete={alertDelete}
      columns={taskHead}
    />
  );
  const employeeHead = [
    { id: "id", label: "ID", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 150 },
  ];
  const tableTaskUser = (
    <TableComponent modalEdit={modalEdit} columns={taskHead} />
  );
  const tableEmployeeAdmin = (
    <TableComponent
      modalEdit={modalEdit}
      alertDelete={alertDelete}
      columns={employeeHead}
    />
  );
  const addButton = <ModalAdd />;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin/tasks">
            <AdminPage
              table={tableTaskAdmin}
              addButton={addButton}
              pageTitle={"Task List"}
            />
          </Route>
          <Route exact path="/admin/employees">
            <AdminPage table={tableEmployeeAdmin} pageTitle={"Employee List"} />
          </Route>
          <Route exact path="/user/tasks">
            <UserPage table={tableTaskUser} />
          </Route>
          <Route path="*">
            <AdminPage table={tableEmployeeAdmin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
