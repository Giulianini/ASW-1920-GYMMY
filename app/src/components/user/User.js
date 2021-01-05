import React, {useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
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
                <Header toggleDrawer={toggleDrawer}/>
                <Drawer localDarkMode={localDarkMode} setLocalDarkMode={setLocalDarkMode}
                        drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen}
                        toggleDrawer={toggleDrawer}/>
                <Switch>
                    <Route path={`/${routes.dashboard.value}`} children={<Dashboard/>}/>
                    <Route path={`/${routes.personal.value}`} children={<Personal/>}/>
                    <Route path={`/${routes.statistics.value}`} children={<Statistics/>}/>
                    <Route path={`/${routes.training.value}`} children={<Training/>}/>
                    <Redirect from='*' to={`/${routes.dashboard.value}`} />
                </Switch>
                <BottomBar tabs={routes}/>
        </ThemeProvider>
    );
}

export default User;