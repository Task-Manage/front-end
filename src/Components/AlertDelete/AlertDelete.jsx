import React from "react";

import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

function AlertDelete() {
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpenDelete}
      >
        <DeleteOutlineIcon /> Delete
      </Button>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure Want to Delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDelete} color="primary" autoFocus>
            Yes, Delete It
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDelete;
