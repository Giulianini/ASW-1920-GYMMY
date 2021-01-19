import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    exercisesGrid: {
        marginTop: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        backdropFilter: `blur(10px)`,
    },
    backdropText: {
        textAlign: "center",
        fontWeight: 100,
        color: "white"
    }
}))

function FinishedBackdrop(props) {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={props.backDrop} onClick={() => props.setBackDrop(false)}>
            <Typography variant={"h4"} className={classes.backdropText}>
                Workout complete!
                <br/>
                💪
            </Typography>
        </Backdrop>
    )
}

export default FinishedBackdrop