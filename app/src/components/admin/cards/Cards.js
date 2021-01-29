import React from 'react';
import {Paper, Tabs} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import {makeStyles} from "@material-ui/core/styles";
import CreateCardTab from "./CreateCardTab";
import DeleteCardTab from "./DeleteCardTab";
import CreateTagTab from "./CreateTagTab";
import CreateExerciseTab from "./CreateExerciseTab";

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

function Cards(props) {
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
                    aria-label="Tabs"
                    className={classes.tabs}
                    centered
                    variant={"fullWidth"}
                >
                    <Tab label="Create card"/>
                    <Tab label="Delete card"/>
                    <Tab label="Create exercise"/>
                    <Tab label="Add tag"/>
                </Tabs>
            </Paper>
            <SwipeableViews index={value} onChangeIndex={handleChangeSwipe} className={classes.swipeableView}>
                <CreateCardTab/>
                <DeleteCardTab/>
                <CreateExerciseTab/>
                <CreateTagTab/>
            </SwipeableViews>
        </>
    );
}

export default Cards;
