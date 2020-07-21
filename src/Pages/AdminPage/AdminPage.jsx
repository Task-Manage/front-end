import React from "react";

import TableComponent from "../../Components/TableComponent/TableComponent";
import AlertDelete from "../../Components/AlertDelete/AlertDelete";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TabTask from "../../Components/TabTask/TabTask";
import TabEmployees from "../../Components/TabEmployees/TabEmployees";

function AdminPage() {
  const alertDelete = <AlertDelete />;
  const modalEdit = <ModalEdit />;
  const table = (
    <TableComponent modalEdit={modalEdit} alertDelete={alertDelete} />
  );
  const tabTasks = <TabTask />;
  const tabEmployees = <TabEmployees />;
  return (
    <div>
      <Sidebar tabEmployees={tabEmployees} tabTasks={tabTasks} table={table} />
    </div>
  );
}

export default AdminPage;
