import React from 'react';
import {Button, Chip, Grid, LinearProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Grade} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        margin: 0,
        padding: 0,
    },
    titleText: {
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
    playButton: {},
})


function TrainingBar(props) {
    const classes = useStyles()
    return (
        <Grid container className={classes.root}>
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
            <Grid item container direction={"row"} justify={"space-between"} alignItems={"center"}>
                <Grid item>
                    <Typography className={classes.timerText}>
                        Time: {props.trainingTime}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant={"outlined"} className={classes.playButton}>Start</Button>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item xs={12}>
                    <LinearProgress variant="determinate" value={50}
                                    color="secondary"/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default TrainingBar;

