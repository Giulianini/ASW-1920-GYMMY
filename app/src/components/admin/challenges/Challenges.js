import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Tabs} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import CreateChallengeTab from "./CreateChallengeTab";
import CloseChallengeTab from "./CloseChallengeTab";

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

function Challenges() {
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
                    <Tab label="Create"/>
                    <Tab label="Close"/>
                </Tabs>
            </Paper>
            <SwipeableViews index={value} onChangeIndex={handleChangeSwipe} className={classes.swipeableView}>
                <CreateChallengeTab/>
                <CloseChallengeTab/>
            </SwipeableViews>
        </>
    )

}

export default Challenges;