import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    DialogTitle,
    Fab,
    MenuItem,
    Select,
} from '@material-ui/core';
// import DialogContentText from "@material-ui/core/DialogContentText";
import Add from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

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
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    // const [assignee, setAssignee] = useState('');
    const [employee, setEmployee] = useState([]);
    const [assignment, setAssignment] = useState({
        assignment: '',
        assignee: '',
    });

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/getAllUserAdminPage`;

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((results) => setEmployee(results.result));
    }, []);

    const handleChange = (event) => {
        setAssignment({
            ...assignment,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAssignment({
            assignment: '',
            assignee: '',
        });
    };

    const handleConfirm = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks`;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(assignment),
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((result) => {
                alert(result.message);
                window.location.reload(true);
            })
            .catch((error) => console.error(error));

        setOpen(false);
    };

    return (
        <div>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
                style={{ margin: '1em' }}
            >
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
                    <form className={classes.formControl}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="assignment"
                                label="Assignment"
                                placeholder="Assignment Description"
                                type="text"
                                fullWidth
                                name="assignment"
                                onChange={handleChange}
                                value={assignment.assignment}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">
                                Person
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={assignment.assignee}
                                onChange={handleChange}
                                name="assignee"
                                placeholder="Assignee"
                            >
                                {employee.map((person) => (
                                    <MenuItem
                                        key={person._id}
                                        value={person._id}
                                    >
                                        {person.name}
                                    </MenuItem>
                                ))}

                                {/* <MenuItem value={'ongoing'}>Ongoing</MenuItem>
                            <MenuItem value={'done'}>Done</MenuItem> */}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
