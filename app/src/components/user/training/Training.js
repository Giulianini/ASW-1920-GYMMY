import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {trainDarkTheme, trainLightTheme} from "./trainTheme"
import {userAxios} from "../../../Api";
import ExerciseCard from "./Exercise/ExerciseCard";
import TrainingBar from "./header/TrainingBar";
import ExerciseDialog from "./Exercise/ExerciseDialog";

const useStyles = makeStyles({
    exercisesGrid: {
        marginTop: 20,
    },
})

function Training() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const darkMode = useSelector(state => state.userRedux.darkMode)
    const cards = useCards()
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)

    const exerciseDialogRef = useRef({})

    const handleExerciseOpen = (exercise) => {
        exerciseDialogRef.current.handleClickDialogOpen(exercise)
    }

    if (loading) {
        return (<div>Loading...</div>)
    } else {
        return (
            <ThemeProvider theme={darkMode ? trainDarkTheme : trainLightTheme}>
                <ExerciseDialog ref={exerciseDialogRef}/>
                <TrainingBar cards={cards} selectedCardIndex={selectedCardIndex}
                             setSelectedCardIndex={setSelectedCardIndex}/>
                <Grid container direction={"column"} alignItems={"center"} justify={"flex-start"}
                      className={classes.exercisesGrid}>
                    {cards && cards[selectedCardIndex].exercises.map((item, i) =>
                        <ExerciseCard
                            handleExerciseOpen={handleExerciseOpen}
                            key={`card:${selectedCardIndex}-ex:${i}`}
                            index={i}
                            exercise={item}
                        />)}
                </Grid>
            </ThemeProvider>
        )
    }

    function useCards() {
        const [cards, setCards] = useState(null)
        useEffect(() => {
            userAxios.get("cards").then(res => {
                setCards(res.data)
                setLoading(false)
            }).catch(reason => {
                console.log(reason)
                setLoading(false)
            })
        }, []) // eslint-disable-line react-hooks/exhaustive-deps
        return cards
    }
}


export default Training;
