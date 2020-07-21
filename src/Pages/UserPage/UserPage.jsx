import React from "react";

import TableComponent from "../../Components/TableComponent/TableComponent";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TabTask from "../../Components/TabTask/TabTask";

function UserPage() {
  const modalEdit = <ModalEdit />;
  const tabTasks = <TabTask />;
  const table = <TableComponent modalEdit={modalEdit} />;

  return (
    <div>
      <Sidebar tabTasks={tabTasks} table={table} />
    </div>
  );
}

export default UserPage;
