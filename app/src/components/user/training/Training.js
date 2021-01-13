import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {trainDarkTheme, trainLightTheme} from "./trainTheme"
import {userAxios} from "../../../Api";
import ExerciseCard from "./ExerciseCard";
import TrainingBar from "./header/TrainingBar";

const useStyles = makeStyles({
    exercisesGrid: {
        marginTop: 20,
    },
})

function Training() {
    const classes = useStyles()
    const darkMode = useSelector(state => state.userRedux.darkMode)
    const cards = useCards()
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const time = 0
    const [passedTime, setPassedTime] = useState()
    useEffect(() => {
        let startTrainTime = localStorage.getItem("startTrainTime") || new Date().getMinutes()
        let passed = startTrainTime - new Date().getMinutes()
        setPassedTime(passed)
    }, [])
    return (
        <ThemeProvider theme={darkMode ? trainDarkTheme : trainLightTheme}>
            {<TrainingBar cards={cards} selectedCardIndex={selectedCardIndex}
                          setSelectedCardIndex={setSelectedCardIndex} passedTime={passedTime}/>}
            <Grid container direction={"column"} alignItems={"center"} justify={"flex-start"}
                  className={classes.exercisesGrid}>
                {cards && cards[selectedCardIndex].exercises.map((item, i) => <ExerciseCard
                    key={`card:${selectedCardIndex}ex:${i}`}
                    exercise={item.exercise}/>)}
            </Grid>
        </ThemeProvider>
    );

}

function useCards() {
    const [cards, setCards] = useState(null)
    useEffect(() => {
        userAxios.get("cards").then(res => {
            setCards(res.data)
        }).catch(reason => {
            console.log(reason)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return cards
}

export default Training;
