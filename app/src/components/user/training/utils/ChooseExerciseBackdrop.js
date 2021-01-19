import React from 'react';
import {Backdrop, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    exercisesGrid: {
        marginTop: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: `blur(10px)`,
    },
    backdropText: {
        textAlign: "center",
        fontWeight: 100,
        color: "white"
    }
}))

function ChooseExerciseBackdrop(props) {
    const classes = useStyles()
    return (<Backdrop className={classes.backdrop} open={props.backDrop} onClick={() => props.setBackDrop(false)}>
        <Grid container direction={"column"} justify={"flex-start"}>
            <Grid item>
                <Typography variant={"h4"} className={classes.backdropText}>
                    Hey!
                    <br/>
                    Start a workout
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h6"} className={classes.backdropText}>
                    Choose a training card on the top right
                </Typography>
            </Grid>
        </Grid>
    </Backdrop>)
}

export default ChooseExerciseBackdrop;