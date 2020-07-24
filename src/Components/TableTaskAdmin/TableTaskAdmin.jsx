import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Box,
    Avatar,
    TextField,
    ButtonGroup,
} from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab';
import { Pageview } from '@material-ui/icons';

import ModalEditTaskAdmin from '../ModalEditTaskAdmin/ModalEditTaskAdmin';
import AlertDelete from '../AlertDelete/AlertDelete';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function TableTaskAdmin(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [task, setTask] = useState(null);
    const [input, setinput] = useState('');
    const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/tasks`;

    const token = JSON.parse(localStorage.getItem('user')).token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event) => {
        setinput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getFilteredTask();
    };

    const getFilteredTask = () => {
        const urlFilter = `${url}/search/?task=${input}`;
        fetch(urlFilter, options)
            .then((response) => response.json())
            .then((results) => {
                setTask(results);
            });
    };

    const getAlltasks = () => {
        fetch(url, options)
            .then((response) => response.json())
            .then((results) => {
                setTask(results);
            });
    };
    useEffect(() => {
        if (input !== '') {
            getFilteredTask();
        } else {
            getAlltasks();
        }
        // eslint-disable-next-line
    }, [input]);
    return (
        <Paper className={classes.root}>
            {task !== null && (
                <Box
                    component="div"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <Box component="div" style={{ marginTop: '20px' }}>
                        <Avatar style={{ background: '#e7305b' }}>
                            <Pageview />
                        </Avatar>
                    </Box>
                    <Box component="div" style={{ margin: '1em' }}>
                        <form onSubmit={handleSubmit}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={task !== null && task}
                                getOptionLabel={(option) => option.assignment}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Task Name"
                                        variant="outlined"
                                        onSelect={handleChange}
                                        value={input}
                                    />
                                )}
                            />
                        </form>
                    </Box>
                </Box>
            )}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ minWidth: '170' }}>
                                ID
                            </StyledTableCell>
                            <StyledTableCell style={{ minWidth: '170' }}>
                                Task
                            </StyledTableCell>
                            <StyledTableCell style={{ minWidth: '100' }}>
                                PIC
                            </StyledTableCell>
                            <StyledTableCell style={{ minWidth: '170' }}>
                                Status
                            </StyledTableCell>
                            <StyledTableCell
                                style={{ minWidth: '180' }}
                            ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {task !== null &&
                            task
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((item) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={item._id}
                                        >
                                            <TableCell>{item._id}</TableCell>
                                            <TableCell>
                                                {item.assignment}
                                            </TableCell>
                                            <TableCell>
                                                {item.assignee.name}
                                            </TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <ButtonGroup
                                                disableElevation
                                                variant="contained"
                                                color="primary"
                                                style={{ padding: '16px' }}
                                            >
                                                <ModalEditTaskAdmin
                                                    taskId={item._id}
                                                    assignment={item.assignment}
                                                    status={item.status}
                                                />
                                                <AlertDelete
                                                    id={item._id}
                                                    url={url}
                                                />
                                            </ButtonGroup>
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={task !== null && task.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
