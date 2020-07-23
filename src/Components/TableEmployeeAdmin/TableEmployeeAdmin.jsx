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

export default function TableEmployeeAdmin(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [employeeData, setEmployeeData] = useState(null);
    const urlDelete = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users`;
    const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/users/getAllUserAdminPage`;

    const columns = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'name', label: 'Name', minWidth: 100 },

        {
            id: 'email',
            label: 'Email',
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'options',
            label: 'Options',
            minWidth: 170,
            align: 'right',
        },
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((results) => {
                setEmployeeData(results.result);
            });

        // eslint-disable-next-line
    }, []);

    console.log(employeeData);

    return (
        <Paper className={classes.root}>
            {employeeData !== null && (
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
                        <Autocomplete
                            id="combo-box-demo"
                            options={employeeData !== null && employeeData}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search Employee Name"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Box>
                </Box>
            )}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    style={{ minWidth: '170' }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeData !== null &&
                            employeeData
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((employee) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                        >
                                            <TableCell>
                                                {employee._id}
                                            </TableCell>
                                            <TableCell>
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>
                                                {employee.email}
                                            </TableCell>
                                            <AlertDelete
                                                id={employee._id}
                                                url={urlDelete}
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
                count={employeeData !== null && employeeData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
