import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import UserPage from "./Pages/UserPage/UserPage";
import TableComponent from "./Components/TableComponent/TableComponent";
import AlertDelete from "./Components/AlertDelete/AlertDelete";
import ModalEdit from "./Components/ModalEdit/ModalEdit";
import ModalAdd from "./Components/ModalAdd/ModalAdd";
import AdminPage from "./Pages/AdminPage/AdminPage";
import TableUser from "./Components/TableUser/TableUser";

function App() {
  const alertDelete = <AlertDelete />;
  const modalEdit = <ModalEdit />;
  const tableTaskAdmin = (
    <TableComponent modalEdit={modalEdit} alertDelete={alertDelete} />
  );
  const tableTaskUser = <TableComponent modalEdit={modalEdit} />;
  const tableEmployeeAdmin = <TableUser />;
  const addButton = <ModalAdd />;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/admin/tasks">
            <AdminPage table={tableTaskAdmin} addButton={addButton} />
          </Route>
          <Route exact path="/admin/employees">
            <AdminPage table={tableEmployeeAdmin} />
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
