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
} from '@material-ui/core';

import { Autocomplete } from '@material-ui/lab';
import { Pageview } from '@material-ui/icons';

import ModalEditUser from '../ModalEditUser/ModalEditUser';

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
    const [taskUser, setTaskUser] = useState(null);
    const [input, setinput] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChange = (event) => {
        setinput(event.target.value);
        console.log(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getFilteredTask();
    };
    const getFilteredTask = (urlFilter, options) => {
        fetch(urlFilter, options)
            .then((response) => response.json())
            .then((results) => {
                setTaskUser(results.tasks);
            });
    };

    const getAlltasks = (url, options) => {
        fetch(url, options)
            .then((response) => response.json())
            .then((results) => setTaskUser(results.tasks));
    };
    // fetching
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const id = JSON.parse(localStorage.getItem('user')).userData.id;
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/${id}/tasks`;
        const urlFilter = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/search/${id}/?task=${input}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        };
        if (input !== '') {
            getFilteredTask(urlFilter, options);
        } else {
            getAlltasks(url, options);
        }
        // eslint-disable-next-line
    }, [input]);
    console.log(taskUser);
    // const rows = [];
    return (
        <Paper className={classes.root}>
            {taskUser !== null && (
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
                                options={taskUser !== null && taskUser}
                                getOptionLabel={(option) => option.assignment}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Task Name"
                                        variant="outlined"
                                        onChange={handleChange}
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
                                Status
                            </StyledTableCell>

                            <StyledTableCell
                                style={{ minWidth: '180' }}
                            ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskUser !== null &&
                            taskUser
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

                                            <TableCell>{item.status}</TableCell>
                                            {item.status !== 'done' && (
                                                <ModalEditUser
                                                    userId={item._id}
                                                    status={item.status}
                                                />
                                            )}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={taskUser !== null && taskUser.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
