import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import ButtonGroup from "@material-ui/core/ButtonGroup";

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
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default function TableComponent(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [taskUser, setTaskUser] = useState(null);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: "id", label: "ID", minWidth: 100 },
        { id: "task", label: "Task", minWidth: 170 },
        {
            id: "status",
            label: "Status",
            align: "center",
            minWidth: 170,
        },
    ];

    function createData(id, task, status) {
        return { id, task, status };
    }

    const rows = [
        // createData("Table users", "Agus", "Ongoing"),
        // createData("Login-Register", "Ian", "Ongoing"),
        // createData("Table tasks", "Resha", "Ongoing"),
    ];

    // fetching
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("user")).token;
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/${id}/tasks`;
        const token = JSON.parse(localStorage.getItem("user")).token;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((results) => setTaskUser(results));
    }, []);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell
                                align={columns.align}
                                style={{ minWidth: columns.minWidth }}
                            ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={columns.id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            color="primary"
                                            style={{ padding: "16px" }}
                                        >
                                            {props.modalEdit}
                                            {props.alertDelete}
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
