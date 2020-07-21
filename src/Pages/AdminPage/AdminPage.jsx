import React from "react";
import TableTask from "../../Components/TableTask/TableTask";
import AlertDelete from "../../Components/AlertDelete/AlertDelete";

function AdminPage() {
  const alertDelete = <AlertDelete />;
  return (
    <div>
      <TableTask alertDelete={alertDelete} />
    </div>
  );
}

export default AdminPage;
