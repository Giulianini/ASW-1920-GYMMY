import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Personal from "./personal/Personal";
import Statistics from "./statistics/Statistics";
import Training from "./training/Training";
import BottomBar from "./BottomBar";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons'
import Header from "./Header";

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

function User() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path={`/${routes.dashboard.value}`} children={<Dashboard/>}/>
                <Route path={`/${routes.personal.value}`} children={<Personal/>}/>
                <Route path={`/${routes.statistics.value}`} children={<Statistics/>}/>
                <Route path={`/${routes.training.value}`} children={<Training/>}/>
            </Switch>
            <BottomBar tabs={routes}/>
        </Router>
    );
}

export default User;