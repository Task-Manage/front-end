import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

export default function ModalEditTaskAdmin() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Select
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [status, setStatus] = React.useState("todo");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <EditIcon />
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              margin="dense"
              id="task"
              label="Task"
              placeholder="Edit Task Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="pic"
              label="PIC"
              type="text"
              placeholder="Edit PIC"
              fullWidth
            />
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value={"todo"}>Todo</MenuItem>
              <MenuItem value={"ongoing"}>Ongoing</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
