import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Tabs} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import {useSnackbar} from "notistack";
import CreateGoalTab from "./CreateGoalTab";

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
export const createGoalsTabNotification = "Here you can manage your pupils goals 🧘"
export const stepperTabNotification = "Here you can set the stepper thresholds"

function Goals() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const {enqueueSnackbar} = useSnackbar()

    const triggerMessageOnSwitch = (index) => {
        switch (index) {
            case 0:
                enqueueSnackbar(createGoalsTabNotification, {variant: "info"})
                break
            case 1:
                enqueueSnackbar(stepperTabNotification, {variant: "info"})
                break
            default:
                enqueueSnackbar(createGoalsTabNotification, {variant: "info"})
                break
        }
    }

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue)
        triggerMessageOnSwitch(newValue)
    }

    const handleChangeSwipe = (index) => {
        setValue(index)
        triggerMessageOnSwitch(index)
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
                <CreateGoalTab/>
            </SwipeableViews>
        </>
    )

}

export default Goals;