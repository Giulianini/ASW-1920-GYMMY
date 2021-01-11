import React from 'react';
import TrainingBar from "./TrainingBar";
import {Grid} from "@material-ui/core";
import ExerciseCard from "./ExerciseCard";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    exercisesGrid: {
        marginTop: 20,
    },
}));

function Training() {
    const classes = useStyles()
    const badges = ["Leg", "Upper", "Arm"]
    const trainingTime = 60
    const passedTime = 30
    const trainingCardTitle = "Bodyweight"

    const exercises = [{
        "title": "Push-Up",
        "desc": "Train and build your chest so that ",
        "image": "/pushUp.jpg",
    }, {
        "title": "Pull-Up",
        "desc": "Train and build your chest so that it becomes very very big and you become a big titty man",
        "image": "/pullUp.jpg",
    }, {
        "title": "Pull-Up",
        "desc": "Train and build your chest so that it becomes very very big and you become a big titty man",
        "image": "/pullUp.jpg",
    }, {
        "title": "Pull-Up",
        "desc": "Train and build your chest so that it becomes very very big and you become a big titty man",
        "image": "/pullUp.jpg",
    },]
    return (
        <>
            <TrainingBar title={trainingCardTitle} badges={badges} trainingTime={trainingTime}
                         passedTime={passedTime}/>
            <Grid container direction={"column"} alignItems={"center"} justify={"flex-start"}
                  className={classes.exercisesGrid}>
                {exercises.map((item, i) => <ExerciseCard key={i} item={item}/>)}
            </Grid>
        </>
    );
}

export default Training;