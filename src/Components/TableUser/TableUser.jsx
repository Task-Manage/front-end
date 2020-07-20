import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Budi Sudarsono", "Beginner", 6.0, "Edit", "delete"),
    createData("Mictrovic santoso", "Advanced", 9.0, "Edit", "delete"),
    createData("Eclair feyin", "Advanced", 16.0, "Edit", "delete"),
    createData("Raklena", "Beginner", 3.7, "Edit", "delete"),
    createData("Edward Mofin", "Mythic", 16.0, "Edit", "delete"),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function TableUser() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">Role</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Edit</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.calories}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.fat}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.carbs}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.protein}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
