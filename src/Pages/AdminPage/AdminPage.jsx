import React from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import TabTask from "../../Components/TabTask/TabTask";
import TabEmployees from "../../Components/TabEmployees/TabEmployees";

function AdminPage(props) {
  const addButton = props.addButton;
  const table = props.table;
  const tabTasks = <TabTask />;
  const tabEmployees = <TabEmployees />;
  return (
    <div>
      <Sidebar
        tabEmployees={tabEmployees}
        tabTasks={tabTasks}
        table={table}
        addButton={addButton}
      />
    </div>
  );
}

export default AdminPage;
