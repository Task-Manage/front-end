import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import PrivateRoute from "./Helpers/PrivateRoute";

import AlertDelete from "./Components/AlertDelete/AlertDelete";
import ModalAdd from "./Components/ModalAdd/ModalAdd";
import AdminPage from "./Pages/AdminPage/AdminPage";
import TableTaskAdmin from "./Components/TableTaskAdmin/TableTaskAdmin";
import TableEmployeeAdmin from "./Components/TableEmployeeAdmin/TableEmployeeAdmin";
import UserPage from "./Pages/UserPage/UserPage";
import ModalEditEmployeeAdmin from "./Components/ModalEditEmployeeAdmin/ModalEditEmployeeAdmin";

function App() {
  const alertDelete = <AlertDelete />;
  const modalEditEmployeeAdmin = <ModalEditEmployeeAdmin />;
  const tableTaskAdmin = <TableTaskAdmin />;
  const tableEmployeeAdmin = (
    <TableEmployeeAdmin
      modalEdit={modalEditEmployeeAdmin}
      alertDelete={alertDelete}
    />
  );
  const addButton = <ModalAdd />;
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/admin/tasks">
            <AdminPage
              table={tableTaskAdmin}
              addButton={addButton}
              pageTitle={"Task List"}
            />
          </PrivateRoute>
          {/* <Redirect from="/admin" to="/admin/employees" /> */}
          <PrivateRoute exact path="/admin/employees">
            <AdminPage table={tableEmployeeAdmin} pageTitle={"Employee List"} />
          </PrivateRoute>
          <PrivateRoute exact path="/user">
            <UserPage />
          </PrivateRoute>
          <Route path="*">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
