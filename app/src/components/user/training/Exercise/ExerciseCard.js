import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {Button, Card, CardActionArea, CardActions, Grid, Typography} from "@material-ui/core";
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
        //width: '100%',
        //padding: '27%', // 16:9
        paddingTop: '56.25%', // 16:9,
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.lg / 2
    },
    cardActionButton: {
        padding: 0,
        margin: 0,
    }
}))

function ExerciseCard(props) {
    const classes = useStyles()
    const handleStartClick = () => {
        if (props.isCurrent) {
            props.handleCompleteExercise(props.index)
        } else {
            props.handleStartExercise(props.index)
        }
    }
    return (
        <Grid item xs={11} lg={6}>
            <Card className={classes.card}>
                <CardActionArea onClick={() => props.handleExerciseOpen(props.exercise)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={"/pushUp.jpg"}
                        title={props.exercise.exercise.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.exercise.exercise.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.exercise.exercise.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActionButton}>
                    {
                        props.complete.completed ? <Done/> :
                            <Button fullWidth={true} onClick={handleStartClick}>
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