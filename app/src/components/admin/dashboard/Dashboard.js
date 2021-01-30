import React, {useCallback, useEffect} from 'react';
import {Paper, Tabs} from "@material-ui/core";
import Tab from '@material-ui/core/Tab';
import SwipeableViews from "react-swipeable-views";
import {makeStyles} from "@material-ui/core/styles";
import UsersTab from "./UsersTab";
import LocationsTab from "./LocationsTab";
import {useLocation} from "react-router-dom";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    tabs: {
        position: "fixed",
        backgroundColor: theme.palette.background.paper,
        minWidth: "100%",
        zIndex: theme.zIndex.appBar,
    },
    swipeableView: {
        paddingTop: 50,
        minWidth: "100%",
    },
    tabsPaper: {},
}))

function Dashboard() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);
    const location = useLocation()
    const {enqueueSnackbar} = useSnackbar()

    const welcomeFromRegistration = useCallback(() => {
        if (location.state && location.state.username) {
            enqueueSnackbar(`Hello! ${location.state.username} Welcome to the Gymmy app.`, {variant: "success"})
        }
    }, [location.state, enqueueSnackbar])

    useEffect(() => {
        welcomeFromRegistration()
    }, [welcomeFromRegistration])

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeSwipe = (index) => {
        setValue(index)
    }

    return (
        <>
            <Paper square className={classes.tabsPaper}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChangeTabs}
                    aria-label="Tabs"
                    className={classes.tabs}
                    centered
                    variant={"fullWidth"}
                >
                    <Tab label="Users"/>
                    <Tab label="Locations"/>
                </Tabs>
            </Paper>
            <SwipeableViews index={value} onChangeIndex={handleChangeSwipe} className={classes.swipeableView}>
                <UsersTab/>
                <LocationsTab/>
            </SwipeableViews>
        </>
    );
}

export default Dashboard;