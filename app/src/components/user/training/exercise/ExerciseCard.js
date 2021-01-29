import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {Box, Button, Card, CardActionArea, CardActions, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import {Done} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 10,
        [theme.breakpoints.up('lg')]: {
            maxWidth: theme.breakpoints.values.lg / 2
        },
    },
    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.lg / 2
    },
    cardActionButton: {
        padding: 0,
        margin: 0,
    },
    doneIcon: {
        width: "100%",
        textAlign: "center",
    },
    capacityText: {
        fontWeight: 100,
    }
}))

function ExerciseCard(props) {
    const classes = useStyles()
    const available = props.isCurrent || !(props.capacities && props.capacities[props.index] === 0)
    const handleStartClick = () => {
        if (props.isCurrent) {
            props.handleCompleteExercise(props.index)
        } else {
            props.handleStartExercise(props.index)
        }
    }

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    function retrieveImage() {
        return `data:${props.exercise.exercise.image.contentType};base64,${arrayBufferToBase64(props.exercise.exercise.image.data.data)}`
    }
    
    return (
        <Grid item xs={11} lg={6}>
            <Card className={classes.card}>
                <CardActionArea onClick={() => props.handleExerciseOpen(props.exercise)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={'/pushUp.jpg'} //retrieveImage()
                        title={props.exercise.exercise.name}
                    />
                    <CardContent>
                        <Grid container direction={"row"} justify={"space-between"} alignItems={"center"}>
                            <Grid item>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.exercise.exercise.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.exercise.exercise.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" color="textSecondary" component="p"
                                            className={classes.capacityText}>
                                    {props.capacities && props.capacities[props.index]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActionButton}>
                    {
                        (props.complete && props.complete.completed) ?
                            <Box className={classes.doneIcon}><Done/></Box> :
                            <Button fullWidth={true}
                                    disabled={!available}
                                    onClick={handleStartClick}>
                                {props.isCurrent ? "Complete" : "Start"}
                            </Button>
                    }
                </CardActions>
                <div className={classes.pushCardSize}/>
            </Card>
        </Grid>
    );
}

export default ExerciseCard;