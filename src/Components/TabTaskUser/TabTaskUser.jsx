import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
import { ListAltRounded } from '@material-ui/icons';

function TabTaskUser() {
    return (
        <div>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <ListAltRounded />
                    </ListItemIcon>
                    <ListItemText primary="Tasks" />
                </ListItem>
            </List>
        </div>
    );
}

export default TabTaskUser;
