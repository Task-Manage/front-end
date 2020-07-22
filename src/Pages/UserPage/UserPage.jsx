import React from "react";

import TableTaskUser from "../../Components/TableTaskUser/TableTaskUser";
import ModalEditUser from "../../Components/ModalEditUser/ModalEditUser";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TabTask from "../../Components/TabTask/TabTask";

function UserPage() {
  const modalEdit = <ModalEditUser />;
  const tabTasks = <TabTask />;
  const table = <TableTaskUser modalEdit={modalEdit} />;

  return (
    <div>
      <Sidebar tabTasks={tabTasks} table={table} />
    </div>
  );
}

export default UserPage;
