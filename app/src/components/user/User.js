import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Personal from "./personal/Personal";
import Statistics from "./statistics/Statistics";
import Training from "./training/Training";
import BottomBar from "./BottomBar";
import Header from "./Header";
import {Divider, Switch as SwitchUI} from '@material-ui/core';
import {PowerSettingsNew, Brightness3} from '@material-ui/icons'

import {
    Button,
    CssBaseline,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon, ListItemSecondaryAction, ListItemText,
    ListSubheader, makeStyles,
    SwipeableDrawer
} from "@material-ui/core";
import {darkMode, theme} from "../../theme";
import {ThemeProvider} from "@material-ui/core/styles";

const routes = {
    dashboard: {
        name: "Dashboard",
        value: "dashboard",
    },
    personal: {
        name: "Personal",
        value: "personal",
    },
    statistics: {
        name: "Statistics",
        value: "statistics",
    },
    training: {
        name: "Training",
        value: "training",
    },
}

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

function User() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [localDarkMode, setLocalDarkMode] = useState(false)
    const classes = useStyles()

    const toggleDrawer = (state) => {
        setDrawerIsOpen(state)
    }

    return (
        <ThemeProvider theme={localDarkMode ? darkMode : theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            <Router>
                <Header toggleDrawer={toggleDrawer}/>
                <SwipeableDrawer
                    anchor={'left'}
                    open={drawerIsOpen}
                    onClose={() => {toggleDrawer(false)}}
                    onOpen={() => {toggleDrawer(true)}}
                >
                    <List component={"nav"} subheader={<ListSubheader>Settings</ListSubheader>} className={classes.list}>
                        <ListItem divider={true} alignItems={"center"}>
                            <ListItemIcon>
                                <Brightness3 />
                            </ListItemIcon>
                            <ListItemText id="switch-dark-mode" primary="Dark Mode" />
                            <ListItemSecondaryAction>
                                <SwitchUI
                                    edge="end"
                                    onChange={() => setLocalDarkMode(! localDarkMode)}
                                    checked={localDarkMode}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem button divider={true}>
                            <ListItemIcon>
                                <PowerSettingsNew />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-bluetooth" primary="Logout" />
                        </ListItem>
                    </List>
                </SwipeableDrawer>
                <Switch>
                    <Route path={`/${routes.dashboard.value}`} children={<Dashboard/>}/>
                    <Route path={`/${routes.personal.value}`} children={<Personal/>}/>
                    <Route path={`/${routes.statistics.value}`} children={<Statistics/>}/>
                    <Route path={`/${routes.training.value}`} children={<Training/>}/>
                </Switch>
                <BottomBar tabs={routes}/>
            </Router>
        </ThemeProvider>
    );
}

export default User;