import React from 'react';
import {Paper, Tabs} from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import {makeStyles} from "@material-ui/core/styles";
import CreateCardTab from "./CreateCardTab";
import DeleteCardTab from "./DeleteCardTab";
import CreateTagTab from "./CreateTagTab";
import CreateExerciseTab from "./CreateExerciseTab";
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

const createCardInfo = "Here you can create a new training card. Select a user and a title, add the exercises and submit 💪"
const deleteCardInfo = "Here you can remove a card from a user."
const createExerciseInfo = "Here you can create a brand new exercise. Don't forget to upload an image! 😉"
const addTagInfo = "Here you can create a new tag to be used in training cards."

function Cards(props) {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);
    const {enqueueSnackbar} = useSnackbar()

    const triggerMessageOnSwitch = index => {
        switch (index) {
            case 0:
                enqueueSnackbar(createCardInfo, {variant: "info"})
                break
            case 1:
                enqueueSnackbar(deleteCardInfo, {variant: "info"})
                break
            case 2:
                enqueueSnackbar(createExerciseInfo, {variant: "info"})
                break
            case 3:
                enqueueSnackbar(addTagInfo, {variant: "info"})
                break
        }
    }

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
        triggerMessageOnSwitch(newValue)
    };

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
