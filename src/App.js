import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";

import "./App.css";

import AlertDelete from "./Components/AlertDelete/AlertDelete";
import ModalEdit from "./Components/ModalEdit/ModalEdit";
import ModalAdd from "./Components/ModalAdd/ModalAdd";
import AdminPage from "./Pages/AdminPage/AdminPage";
import TableTaskAdmin from "./Components/TableTaskAdmin/TableTaskAdmin";
import TableEmployeeAdmin from "./Components/TableEmployeeAdmin/TableEmployeeAdmin";
import UserPage from "./Pages/UserPage/UserPage";

function App() {
  const alertDelete = <AlertDelete />;
  const modalEdit = <ModalEdit />;
  const tableTaskAdmin = (
    <TableTaskAdmin modalEdit={modalEdit} alertDelete={alertDelete} />
  );
  const tableEmployeeAdmin = (
    <TableEmployeeAdmin modalEdit={modalEdit} alertDelete={alertDelete} />
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
          {/* <Redirect from="/admin" to="/admin/employees" /> */}
          <Route exact path="/admin/employees">
            <AdminPage table={tableEmployeeAdmin} pageTitle={"Employee List"} />
          </Route>
          <Route exact path="/user/tasks">
            <UserPage />
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
