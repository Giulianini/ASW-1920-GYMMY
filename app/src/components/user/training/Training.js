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
    const [started, setStarted] = useState(false)
    const darkMode = useSelector(state => state.userRedux.darkMode)
    const cards = useCards()
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const selectedCard = cards && cards[selectedCardIndex]
    const [currentExercise, setCurrentExercise] = useState(null)
    const [completion, setCompletion] = useState(null)
    const [startTime, setStartTime] = useState(null)

    const exerciseDialogRef = useRef({})

    const handleExerciseOpen = (exercise) => {
        exerciseDialogRef.current.handleClickDialogOpen(exercise)
    }

    const handleStartCard = () => {
        if (started) {
            userAxios.delete("execution").then(() => {
                setStarted(false)
            }).catch(reason => {
                console.log(reason.response.data) //TODO notification
            })
        } else {
            userAxios.put("execution", {"card": selectedCard._id}).then(() => {
                setStarted(true)
                fetchExecutionStatus()
            }).catch(reason => {
                console.log(reason.response.data) //TODO notification
            })
        }
    }

    function checkCardCompletion() {
        if (completion.filter(c => c.completed).length === completion.length) {
            userAxios.delete("execution").then(() => {
                setStarted(false)
                console.log("YEE FINISHED ALL") //TODO notification
            }).catch(reason => {
                console.log(reason.response.data) //TODO notification
            })
        }
    }

    const handleCompleteExercise = (index) => {
        userAxios.patch("execution", {
            exerciseIndex: index,
            command: "completeExercise"
        }).then(() => {
            const newCompletion = completion.slice()
            newCompletion[index].completed = true
            setCompletion(newCompletion)
            checkCardCompletion()
        }).catch(() => {
            console.log("Error cannot complete exercise") //TODO notification
        })
    }

    const handleStartExercise = (index) => {
        userAxios.patch("execution", {
            exerciseIndex: index,
            command: "startExercise"
        }).then(() => {
            setCurrentExercise(index)
        }).catch(() => {
            console.log("Not started") //TODO notification
        })
    }

    function fetchExecutionStatus() {
        userAxios.get("execution").then(res => {
            setCurrentExercise(res.data.currentExercise)
            setCompletion(res.data.completion)
            setStartTime(res.data.startTime)
            setStarted(true)
        }).catch(reason => {
            setStarted(false)
            console.log("No execution found") //TODO notification
        })
    }

    useEffect(() => {
        fetchExecutionStatus()
    }, [currentExercise])

    if (loading) {
        return (<div>Loading...</div>)
    } else {
        return (
            <ThemeProvider theme={darkMode ? trainDarkTheme : trainLightTheme}>
                <ExerciseDialog ref={exerciseDialogRef}/>
                <TrainingBar cards={cards} selectedCard={selectedCard} completion={completion}
                             startTime={startTime} handleStartCard={handleStartCard}
                             started={started}
                             selectedCardIndex={selectedCardIndex}
                             setSelectedCardIndex={setSelectedCardIndex}/>
                <Grid container direction={"column"} alignItems={"center"} justify={"flex-start"}
                      className={classes.exercisesGrid}>
                    {cards && cards[selectedCardIndex].exercises.map((item, i) =>
                        <ExerciseCard
                            isCurrent={currentExercise === i}
                            complete={completion && completion[i]}
                            handleStartExercise={handleStartExercise}
                            handleCompleteExercise={handleCompleteExercise}
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
