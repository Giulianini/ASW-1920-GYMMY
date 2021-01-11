import React from 'react';
import {AppBar, Button, Chip, Grid, LinearProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Grade} from "@material-ui/icons";

const useStyles = makeStyles({
    headerBar: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 5,
    },
    timeGrid: {
        marginTop: 20,
    },
    root: {
        margin: 0,
        padding: 0,
    },
    titleText: {
        paddingLeft: 10,
        fontWeight: 100,
        fontSize: 30,
    },
    timerText: {
        fontWeight: 100,
        fontSize: 25,
    },
    chips: {
        marginRight: 5,
        marginBottom: 5,
    },
    playButton: {
        borderRadius: 5,
    },
})


function TrainingBar(props) {
    const classes = useStyles()
    return (
        <AppBar
            color={"white"}
            position={"sticky"}
        >
            <Grid container direction={"column"} className={classes.root}>
                <Grid container item className={classes.headerBar}>
                    <Grid item>
                        <Typography className={classes.titleText}> {props.title}</Typography>
                    </Grid>
                    <Grid container item direction={"row"} justify={"flex-start"} alignItems={"center"} wrap={"wrap"}>
                        {props.badges.map(chip => {
                            return (
                                <Grid item>
                                    <Chip
                                        className={classes.chips}
                                        icon={<Grade/>}
                                        label={chip}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item className={classes.timeGrid} container direction={"row"} justify={"space-between"}
                          alignItems={"center"}>
                        <Grid item>
                            <Typography className={classes.timerText}>
                                Time: {props.trainingTime}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant={"outlined"} className={classes.playButton}>Start</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item xs={12}>
                        <LinearProgress variant="buffer" value={10} valueBuffer={30} color="secondary"/>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default TrainingBar;

