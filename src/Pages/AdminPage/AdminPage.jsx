import React from "react";
import TableComponent from "../../Components/TableComponent/TableComponent";
import AlertDelete from "../../Components/AlertDelete/AlertDelete";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";

function AdminPage() {
  const alertDelete = <AlertDelete />;
  const modalEdit = <ModalEdit />;
  return (
    <div>
      <TableComponent modalEdit={modalEdit} alertDelete={alertDelete} />
    </div>
  );
}

export default AdminPage;
