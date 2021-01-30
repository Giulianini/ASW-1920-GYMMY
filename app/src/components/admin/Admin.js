import React, {useState} from 'react';
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {ThemeProvider} from "@material-ui/core/styles";
import {appTheme, darkTheme} from "../../appTheme";
import {Box, CssBaseline} from "@material-ui/core";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import routes from "../Routes";
import Dashboard from "../admin/dashboard/Dashboard";
import BottomBar from "./BottomBar";
import Header from "../user/Header";
import Drawer from "../user/Drawer";
import Cards from "./cards/Cards";
import Activities from "./activities/Activities";
import Goals from "./goals/Goals";
import Locations from "./locations/Locations";

function Admin() {
    const location = useLocation()
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const darkMode = useSelector(state => state.userRedux.darkMode)

    return (
        <ThemeProvider theme={darkMode ? darkTheme : appTheme}>
            <CssBaseline/>
            <Header setDrawerIsOpen={setDrawerIsOpen}/>
            <Drawer drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen}/>
            <Box style={{"minHeight": "100vh"}}>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames={"fade"} timeout={300}>
                        <Switch>
                            <Route path={`/${routes.admin.routes.dashboard.value}`} children={<Dashboard/>}/>
                            <Route path={`/${routes.admin.routes.goals.value}`} children={<Goals/>}/>
                            <Route path={`/${routes.admin.routes.cards.value}`} children={<Cards/>}/>
                            <Route path={`/${routes.admin.routes.activities.value}`} children={<Activities/>}/>
                            <Route path={`/${routes.admin.routes.locations.value}`} children={<Locations/>}/>
                            <Redirect from='*' to={`/${routes.admin.routes.dashboard.value}`}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </Box>
            <BottomBar tabs={routes}/>
        </ThemeProvider>
    )
}

export default Admin;