import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
// import DialogContentText from "@material-ui/core/DialogContentText";
import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [status, setStatus] = React.useState("todo");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <Add />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Fill form to create a new task
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              margin="dense"
              id="task"
              label="Task"
              placeholder="Task Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="pic"
              label="PIC"
              type="text"
              placeholder="Assign PIC"
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
