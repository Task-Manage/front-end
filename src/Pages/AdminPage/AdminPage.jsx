import React from "react";
import TableComponent from "../../Components/TableComponent/TableComponent";
import AlertDelete from "../../Components/AlertDelete/AlertDelete";

function AdminPage() {
  const alertDelete = <AlertDelete />;
  return (
    <div>
      <TableComponent alertDelete={alertDelete} />
    </div>
  );
}

export default AdminPage;
