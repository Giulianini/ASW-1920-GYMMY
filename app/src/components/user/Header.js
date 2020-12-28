import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header(props) {
    const classes = useStyles()
    return (
        <AppBar
            position={"sticky"}
        >
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.toggleDrawer(true)}>
                    <Menu/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;