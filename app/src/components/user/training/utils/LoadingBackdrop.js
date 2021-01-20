import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, CircularProgress} from "@material-ui/core";
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

function LoadingBackdrop(props) {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={props.backDrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    )
}

export default LoadingBackdrop