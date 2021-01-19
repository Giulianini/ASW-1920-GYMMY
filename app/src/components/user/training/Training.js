import React, {useEffect, useRef, useState} from 'react';
import {Backdrop, CircularProgress, Grid} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {trainDarkTheme, trainLightTheme} from "./trainTheme"
import {socket, userAxios} from "../../../Api";
import ExerciseCard from "./Exercise/ExerciseCard";
import TrainingBar from "./header/TrainingBar";
import ExerciseDialog from "./Exercise/ExerciseDialog";
import ChooseExerciseBackdrop from "./utils/ChooseExerciseBackdrop";
import FinishedBackdrop from "./utils/FinishedBackdrop";
import SnackBar from "../utils/Snackbar";

const useStyles = makeStyles((theme) => ({
    exercisesGrid: {
        marginTop: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        backdropFilter: `blur(10px)`,
    },
    backdropText: {
        textAlign: "center",
        fontWeight: 100,
        color: "white"
    }
}))

function Training() {
    const classes = useStyles()
    // ----------- ENVIRONMENT -------------
    const darkMode = useSelector(state => state.userRedux.darkMode)
    // ----------- INTERACTION -------------
    const [backDrop, setBackDrop] = useState(false)
    const [loading, setLoading] = useState(true)
    const [finished, setFinished] = useState(false)
    // ----------- REFS -------------
    const exerciseDialogRef = useRef({})
    const snackRef = useRef({})
    // ----------- TRAINING -------------
    const [started, setStarted] = useState(false)
    const cards = useCards() //TODO If null error (vedi gioggia)
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const selectedCard = cards && cards[selectedCardIndex]
    const [currentExercise, setCurrentExercise] = useState(null)
    const [completion, setCompletion] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [capacities, setCapacities] = useCapacities()

    // ----------- REF HANDLERS -------------
    const handleSnackOpen = (msg, severity) => {
        try {
            snackRef.current.handleMessage(msg, severity)
        } catch (error) {
        }
    }
    const handleExerciseOpen = (exercise) => {
        try {
            exerciseDialogRef.current.handleClickDialogOpen(exercise)
        } catch (error) {
        }
    }

    // ----------- HANDLERS: CARD/START EX/COMPLETE EX -------------
    const handleStartCard = () => {
        if (started) {
            userAxios.delete("execution").then(() => {
                setStarted(false)
                handleSnackOpen("We have canceled your workout", "info")
            }).catch(() => {
                console.log("Cannot stop training")
                handleSnackOpen("Cannot stop training", "error")
            })
        } else {
            userAxios.put("execution", {"card": selectedCard._id}).then(() => {
                setStarted(true)
                fetchExecutionStatus()
            }).catch(() => {
                console.log("Cannot start training")
                handleSnackOpen("Cannot start training", "error")
            })
        }
    }

    const handleStartExercise = (index) => {
        userAxios.patch("execution", {
            exerciseIndex: index,
            command: "startExercise"
        }).then(() => {
            setCurrentExercise(index)
        }).catch(() => {
            console.log("No workouts in progress")
            handleSnackOpen("No workouts in progress", "info")
        })
    }

    const handleCompleteExercise = (index) => {
        userAxios.patch("execution", {
            exerciseIndex: index,
            command: "completeExercise"
        }).then(res => {
            const newCompletion = completion.slice()
            newCompletion[index].completed = true
            setCompletion(newCompletion)
            if (res.data.finished) {
                setStarted(false)
                setCapacities(null)
                setFinished(true)
            }
        }).catch(() => {
            handleSnackOpen("Cannot complete exercise", "error")
            console.log("Error cannot complete exercise")
        })
    }

    // ----------- FETCHING DATA -------------

    useEffect(() => {
        fetchExecutionStatus()
    }, [currentExercise])

    function fetchExecutionStatus() {
        userAxios.get("execution").then(res => {
            setCurrentExercise(res.data.currentExercise)
            setCompletion(res.data.completion)
            setStartTime(res.data.startTime)
            setStarted(true)
            setFinished(false)
            setCapacities(res.data.completion.map(c => c.locationCapacity.capacity))
        }).catch(() => {
            setStarted(false)
            setBackDrop(true)
        })
    }

    // #################### RENDER #####################
    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={backDrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    } else {
        return (
            <ThemeProvider theme={darkMode ? trainDarkTheme : trainLightTheme}>
                {backDrop ? <ChooseExerciseBackdrop backDrop={backDrop} setBackDrop={setBackDrop}/> : null}
                <SnackBar ref={snackRef}/>
                <ExerciseDialog ref={exerciseDialogRef}/>
                <TrainingBar cards={cards} selectedCard={selectedCard} completion={completion}
                             startTime={startTime} handleStartCard={handleStartCard}
                             started={started}
                             selectedCardIndex={selectedCardIndex}
                             setSelectedCardIndex={setSelectedCardIndex}
                             handleSnackOpen={handleSnackOpen()}
                />
                <Grid container direction={"column"} alignItems={"center"} justify={"flex-start"}
                      className={classes.exercisesGrid}>
                    {cards && cards[selectedCardIndex].exercises.map((item, i) =>
                        <ExerciseCard
                            capacities={capacities}
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
                <FinishedBackdrop backDrop={finished} setBackDrop={setFinished}/>
            </ThemeProvider>
        )
    }

    // ----------- CUSTOM HOOKS -------------
    function useCards() {
        const [cards, setCards] = useState(null)
        useEffect(() => {
            userAxios.get("cards").then(res => {
                if (res.data.length > 1) {
                    setCards(res.data)
                    //TODO when click popover with no cards -> warning
                }
                setLoading(false)
            }).catch(() => {
                setLoading(true)
            })
        }, []) // eslint-disable-line react-hooks/exhaustive-deps
        return cards
    }

    function useCapacities() {
        const [capacities, setCapacities] = useState(null)
        useEffect(() => {
            const capacitiesHandler = (data) => {
                setCapacities(data)
            }
            socket.on('capacities', capacitiesHandler)
            return function unsubscribe() {
                socket.off('capacities', capacitiesHandler)
            }
        }, [])
        return [capacities, setCapacities]
    }
}

export default Training;
