import React from 'react';
import {Paper, Tabs} from "@material-ui/core";
import Tab from '@material-ui/core/Tab';
import SwipeableViews from "react-swipeable-views";
import {makeStyles} from "@material-ui/core/styles";
import UsersTab from "./UsersTab";
import LocationsTab from "./LocationsTab";

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

function Dashboard(props) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);

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
                    aria-label="disabled tabs example"
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