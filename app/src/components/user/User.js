import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Personal from "./personal/Personal";
import Statistics from "./statistics/Statistics";
import Training from "./training/Training";
import BottomBar from "./BottomBar";
import Header from "./Header";

import {CssBaseline} from "@material-ui/core";
import {darkMode, theme} from "../../theme";
import {ThemeProvider} from "@material-ui/core/styles";
import Drawer from "./Drawer";
import routes from "../Routes";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";

function User() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [localDarkMode, setLocalDarkMode] = useState(false)


    const toggleDrawer = (state) => {
        setDrawerIsOpen(state)
    }

    return (
        <ThemeProvider theme={localDarkMode ? darkMode : theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            <Router>
                <Header toggleDrawer={toggleDrawer}/>
                <Drawer localDarkMode={localDarkMode} setLocalDarkMode={setLocalDarkMode}
                        drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen}
                        toggleDrawer={toggleDrawer}/>
                <Switch>
                    <Route path={`/${routes.dashboard.value}`} children={<Dashboard/>}/>
                    <Route path={`/${routes.personal.value}`} children={<Personal/>}/>
                    <Route path={`/${routes.statistics.value}`} children={<Statistics/>}/>
                    <Route path={`/${routes.training.value}`} children={<Training/>}/>
                    <Route path={`/${routes.login.value}`} children={<Login/>}/>
                    <Route path={`/${routes.signup.value}`} children={<Signup/>}/>
                    <Redirect from='*' to={`/${routes.dashboard.value}`} />
                </Switch>
                <BottomBar tabs={routes}/>
            </Router>
        </ThemeProvider>
    );
}

export default User;