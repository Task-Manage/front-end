import React from 'react';

import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

function AlertDelete(props) {
    const [openDelete, setOpenDelete] = React.useState(false);
    const id = props.id;
    const url = `${props.url}/${id}`;

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((results) => {
                setOpenDelete(false);
                window.location.reload(true);
            });
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpenDelete}
            >
                <DeleteOutlineIcon /> Delete
            </Button>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are You Sure Want to Delete?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Yes, Delete It
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDelete;
