import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
    AppBar,
    Dialog,
    DialogContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Slide,
    Tooltip
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import Image from "material-ui-image";
import {Receipt} from "@material-ui/icons";
import BottomTimer from "./BottomTimer";

const useStyles = makeStyles({
    appBar: {
        position: 'sticky',
    },
    titleText: {
        padding: 10,
        fontWeight: 100,
        fontSize: 40,
        textAlign: "center",
    },
    textDescription: {
        fontWeight: 100,
        fontSize: 20,
        textAlign: "center",
    },
    dropDown: {
        margin: "auto"
    },
    dialogContent: {
        margin: 0,
        padding: 0,
    },
    image: {}
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const ExerciseDialog = forwardRef((props, ref) => {
    function MyExerciseDialog() {
        const classes = useStyles();
        const [open, setOpen] = React.useState(false)
        const [exercise, setExercise] = useState(null)

        const handleClickDialogOpen = (exercise) => {
            setExercise(exercise)
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        useImperativeHandle(ref, () => {
            return {
                handleClickDialogOpen: handleClickDialogOpen
            };
        });

        function arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            return window.btoa(binary);
        }

        function retrieveImage() {
            return `data:${exercise && exercise.exercise.image.contentType};base64,${arrayBufferToBase64(exercise && exercise.exercise.image.data.data)}`
        }

        return (
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar elevation={0} className={classes.appBar}>
                    <Image
                        src={retrieveImage()}
                        aspectRatio={(16 / 9)}
                        disableSpinner
                        className={classes.image}
                    />
                </AppBar>
                <DialogContent className={classes.dialogContent}>
                    <Grid container direction={"column"} justify={"center"} alignItems={"stretch"}>
                        <Grid item>
                            <Typography variant="h1" className={classes.titleText}>
                                {exercise && exercise.exercise.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={"body1"} className={classes.textDescription}>
                                {exercise && exercise.exercise.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <List className={classes.list}>
                                <ListItem button
                                          divider={true}
                                >
                                    <ListItemIcon>
                                        <Receipt/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Location"}
                                                  secondary={exercise && exercise.exercise.location.description}/>
                                </ListItem>
                                <ListItem button
                                          divider={true}
                                >
                                    <ListItemIcon>
                                        <Receipt/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Series"}
                                                  secondary={exercise && exercise.series}/>
                                </ListItem>
                                <ListItem button
                                          divider={true}
                                >
                                    <ListItemIcon>
                                        <Receipt/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Reps"}
                                                  secondary={exercise && exercise.reps}/>
                                </ListItem>
                                <ListItem button
                                          divider={true}
                                >
                                    <ListItemIcon>
                                        <Receipt/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Rest"}
                                                  secondary={`${exercise && exercise.rest.minutes} min ${exercise && exercise.rest.seconds} sec`}/>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item container direction={"row"} justify={"center"}>
                            <Grid item>
                                <Tooltip title={"Close dialog"} className={classes.dropDown}>
                                    <IconButton edge="start" onClick={handleClose}
                                                aria-label="close">
                                        <ArrowDropDownIcon fontSize={"large"}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <BottomTimer restTime={exercise}/>
                </DialogContent>
            </Dialog>
        );
    }

    return <MyExerciseDialog {...props}/>
})

export default ExerciseDialog;