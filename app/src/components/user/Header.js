import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";

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
    const appbarTitle = useSelector(state => state.appUIReducer.appbarTitle)
    return (
        <AppBar
            position={"sticky"}
        >
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                            onClick={() => props.setDrawerIsOpen(true)}>
                    <Menu/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {appbarTitle}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;