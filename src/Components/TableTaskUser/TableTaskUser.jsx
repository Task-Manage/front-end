import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // fetching
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const id = JSON.parse(localStorage.getItem('user')).userData.id;
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/${id}/tasks`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((results) => setTaskUser(results.tasks));
    }, []);
    console.log(taskUser);
    const rows = [];
    return (
        <Paper className={classes.root}>
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

                                            <ModalEditUser
                                                userId={item._id}
                                                status={item.status}
                                            />
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
