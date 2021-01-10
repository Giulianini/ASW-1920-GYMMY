import React, {useState} from 'react';
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Personal from "./personal/Personal";
import Statistics from "./statistics/Statistics";
import Training from "./training/Training";
import BottomBar from "./BottomBar";
import Header from "./Header";

import {darkMode, theme} from "../../theme";
import {ThemeProvider} from "@material-ui/core/styles";
import Drawer from "./Drawer";
import routes from "../Routes";
import {CssBaseline} from "@material-ui/core";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function User() {
    const location = useLocation()
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const [localDarkMode, setLocalDarkMode] = useState(false)

    return (
        <ThemeProvider theme={localDarkMode ? darkMode : theme}>
            <CssBaseline/>
            <Header setDrawerIsOpen={setDrawerIsOpen}/>
            <Drawer localDarkMode={localDarkMode} setLocalDarkMode={setLocalDarkMode}
                    drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen}/>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Switch>
                        <Route path={`/${routes.dashboard.value}`} children={<Dashboard/>}/>
                        <Route path={`/${routes.personal.value}`} children={<Personal/>}/>
                        <Route path={`/${routes.statistics.value}`} children={<Statistics/>}/>
                        <Route path={`/${routes.training.value}`} children={<Training/>}/>
                        <Redirect from='*' to={`/${routes.dashboard.value}`}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <BottomBar tabs={routes}/>
        </ThemeProvider>
    );
}

export default User;