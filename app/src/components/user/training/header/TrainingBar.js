import React, {useEffect} from 'react';
import {AppBar, Button, Chip, Grid, IconButton, LinearProgress, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExpandMore, Grade} from "@material-ui/icons";
import CardPopover from "./CardPopover";
import {useDispatch, useSelector} from "react-redux";
import {setStarted} from "../../../../redux/ducks/training/training";
import {userAxios} from "../../../../Api";

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
    const [anchorEl, setAnchorEl] = React.useState(null)
    const dispatcher = useDispatch()
    const started = useSelector(state => state.trainingRedux.started)
    const completed = 10
    const percentage = props.cards ? (completed / props.selectedCard.minutes).toFixed(1) * 100 : 0

    const handleExpandCardClick = (event) => setAnchorEl(event.currentTarget)

    useEffect(() => {
        userAxios.get("execution").then(res => {

        }).catch(reason => {
            if (reason.response.status === 404) {
                dispatcher(setStarted(false))
            }
        })
    }, [])

    const handleStartButton = () => {
        if (started) {
            dispatcher(setStarted(false))
        } else {
            userAxios.put("execution", {"card": props.selectedCard._id}).then(res => {
                console.log(res.status)
                dispatcher(setStarted(true))
            }).catch(reason => {
                console.log(reason.response.data) //TODO notification
            })
        }
    }

    const handleClose = () => setAnchorEl(null)

    return (
        <AppBar
            color={"primary"}
            position={"sticky"}
        >
            <Grid container direction={"column"} className={classes.root}>
                <Grid container item className={classes.headerBar}>
                    <Grid item container direction={"row"} justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <Typography
                                className={classes.titleText}> {props.selectedCard && props.selectedCard.title}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={started ? () => {
                            } : handleExpandCardClick}>
                                <ExpandMore/>
                            </IconButton>
                            <CardPopover anchorEl={anchorEl} handleClose={handleClose} {...props}/>
                        </Grid>
                    </Grid>
                    <Grid container item direction={"row"} justify={"flex-start"} alignItems={"center"} wrap={"wrap"}>
                        {props.selectedCard && props.selectedCard.tags.map(chip => {
                            return (
                                <Grid key={chip.name} item>
                                    <Chip
                                        className={classes.chips}
                                        icon={<Grade/>}
                                        label={chip.name}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item className={classes.timeGrid} container direction={"row"} justify={"space-between"}
                          alignItems={"center"}>
                        <Grid item>
                            <Typography className={classes.timerText}>
                                Time: {completed}'
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant={"outlined"} className={classes.playButton}
                                    onClick={handleStartButton}>
                                {started ? "Cancel" : "Start"}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item xs={12}>
                        <LinearProgress variant="buffer" value={percentage} valueBuffer={percentage} color="secondary"/>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default TrainingBar;

