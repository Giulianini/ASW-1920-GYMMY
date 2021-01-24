import React, {useCallback, useEffect} from 'react';
import {Grid, LinearProgress, makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Pause, PlayArrow, Stop} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import useSound from "use-sound";

const useStyles = makeStyles({
    bottomBar: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
    },
    timerText: {
        padding: 10,
        fontWeight: 100,
        textAlign: "center",
    },
})

function BottomTimer(props) {
    const classes = useStyles()
    const [play] = useSound("/timeout.mp3");
    const [secs, setSecs] = React.useState(0)
    const [started, setStarted] = React.useState(false)
    const [timerId, setTimerID] = React.useState(0)
    const totalSeconds = props.restTime.rest.minutes * 60 + props.restTime.rest.seconds
    const remainSeconds = totalSeconds - secs

    const toggleStart = () => {
        clearInterval(timerId)
        setStarted(!started)
    }
    const toggleStop = () => {
        clearInterval(timerId)
        setStarted(false)
        setSecs(0)
    }

    const updateTimerCallback = useCallback(() => {
        if (started) {
            if (remainSeconds <= 0) {
                toggleStop()
                play()
            } else {
                const id = setTimeout(() => {
                    setSecs(secs + 1)
                }, 1000)
                setTimerID(id)
            }
        }
    }, [secs, started]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        updateTimerCallback()
    }, [updateTimerCallback])

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"stretch"} className={classes.bottomBar}>
            <Grid item>
                <Grid item>
                    <LinearProgress variant="determinate" value={(secs / totalSeconds) * 100} color="secondary"/>
                </Grid>
                <Grid item container direction={"row"} justify={"space-between"} alignItems={"center"}>
                    <Grid item>
                        <Typography variant={"h5"} className={classes.timerText}>
                            {`${(remainSeconds / 60) | 0}' ${remainSeconds % 60}''`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={toggleStart}>
                            {started ? <Pause/> : <PlayArrow/>}
                        </IconButton>
                        <IconButton onClick={toggleStop}>
                            <Stop/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default BottomTimer;