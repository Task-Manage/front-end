import React from 'react';
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
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

export default function ModalEditTaskAdmin(props) {
    const taskId = props.taskId;
    const assignment = props.assignment;
    const status = props.status;

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

    const [open, setOpen] = React.useState(false);
    const [data, setdata] = React.useState({
        assignment: assignment,
        status: status,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks/editAdmin/${taskId}`;
        const token = JSON.parse(localStorage.getItem('user')).token;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((results) => {
                setOpen(false);
                window.location.reload(true);
                console.log(results);
            });
    };

    // Select
    const handleChange = (event) => {
        setdata({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
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
                    <form>
                        <FormControl className={classes.formControl}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="assignment"
                                name="assignment"
                                label="Task"
                                placeholder="Edit Task Name"
                                type="text"
                                onChange={handleChange}
                                value={data.assignment}
                                fullWidth
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.status}
                                name="status"
                                onChange={handleChange}
                            >
                                <MenuItem value={'start'}>Start</MenuItem>
                                <MenuItem value={'in progress'}>
                                    In Progress
                                </MenuItem>
                                <MenuItem value={'need review'}>
                                    Need Review
                                </MenuItem>
                                <MenuItem value={'done'}>Done</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                    {/* <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              margin="dense"
              id="pic"
              label="PIC"
              type="text"
              placeholder="Edit PIC"

              fullWidth
            />
          </FormControl> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
