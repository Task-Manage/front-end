import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const columns = [
  { id: "task", label: "Task", minWidth: 170 },
  { id: "pic", label: "PIC", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
  {
    id: "act",
    label: "",
    minWidth: 170,
  },
];

function createData(task, pic, status, act) {
  return { task, pic, status, act };
}

const rows = [
  createData("Table users", "Agus", "Ongoing", "button"),
  createData("Login-Register", "Ian", "Ongoing", "button"),
  createData("Table tasks", "Resha", "Ongoing", "button"),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableTask() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.task}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "act") {
                        return (
                          <ButtonGroup
                            disableElevation
                            variant="contained"
                            color="primary"
                          >
                            <Button onClick={handleClickOpenEdit}>
                              <EditIcon /> Edit
                            </Button>
                            <Dialog
                              open={openEdit}
                              onClose={handleCloseEdit}
                              aria-labelledby="form-dialog-title"
                            >
                              <DialogTitle id="form-dialog-title">
                                Subscribe
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Edit status
                                </DialogContentText>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="status"
                                  label="Status"
                                  type="text"
                                  fullWidth
                                />
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseEdit}
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleCloseEdit}
                                  color="primary"
                                >
                                  Save Change
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <Button
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
                                <Button
                                  onClick={handleCloseDelete}
                                  color="primary"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleCloseDelete}
                                  color="primary"
                                  autoFocus
                                >
                                  Yes, Delete It
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </ButtonGroup>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
