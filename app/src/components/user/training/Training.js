import React from 'react';
import TrainingBar from "./TrainingBar";
import {Grid} from "@material-ui/core";
import ExerciseCard from "./ExerciseCard";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {trainDarkTheme, trainLightTheme} from "./trainTheme"

const useStyles = makeStyles({
    exercisesGrid: {
        marginTop: 20,
    },
})

function Training() {
    const classes = useStyles()
    const darkMode = useSelector(state => state.userRedux.darkMode)
    const badges = ["Leg", "Upper", "Arm"]
    const trainingTime = 60
    const passedTime = 30
    const trainingCardTitle = "Bodyweight"

    const exercises = [{
        key: 0,
        title: "Push-Up",
        desc: "Train and build your chest so that ",
        image: "/pushUp.jpg",
    }, {
        key: 1,
        title: "Pull-Up",
        desc: "Train and build your chest so that it becomes very very big and you become a big titty man",
        image: "/pullUp.jpg",
    }, {
        key: 2,
        title: "Pull-Up",
        desc: "Train and build your chest so that it becomes very very big and you become a big titty man",
        image: "/pullUp.jpg",
    }, {
        key: 3,
        title: "Pull-Up",
        desc: "Train and build your chest so that it becomes very very big and you become a big titty man",
        image: "/pullUp.jpg",
    },]
    return (
        <ThemeProvider theme={darkMode ? trainDarkTheme : trainLightTheme}>
            <TrainingBar title={trainingCardTitle} badges={badges} trainingTime={trainingTime}
                         passedTime={passedTime}/>
            <Grid container direction={"column"} alignItems={"center"} justify={"flex-start"}
                  className={classes.exercisesGrid}>
                {exercises.map((item, i) => <ExerciseCard key={i} item={item}/>)}
            </Grid>
        </ThemeProvider>
    );
}

export default Training;