import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Fab, Grid} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {trainDarkTheme, trainLightTheme} from "./trainTheme"
import {socket, userAxios} from "../../../Api";
import ExerciseCard from "./exercise/ExerciseCard";
import TrainingBar from "./header/TrainingBar";
import ExerciseDialog from "./exercise/ExerciseDialog";
import ChooseExerciseBackdrop from "./utils/ChooseExerciseBackdrop";
import FinishedBackdrop from "./utils/FinishedBackdrop";
import LoadingBackdrop from "./utils/LoadingBackdrop";
import {useSnackbar} from "notistack";
import MonitorDialog from "./MonitorDialog";
import {Speed} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    exercisesGrid: {
        marginTop: 20,
    },
    backdropText: {
        textAlign: "center",
        fontWeight: 100,
        color: "white"
    },
    fab: {
        position: "fixed",
        right: 10,
        bottom: 65,
    }

}))

function Training() {
    const classes = useStyles()
    // ----------- ENVIRONMENT -------------
    const {enqueueSnackbar} = useSnackbar()
    const darkMode = useSelector(state => state.userRedux.darkMode)
    // ----------- INTERACTION -------------
    const [backDrop, setBackDrop] = useState(false)
    const [loading, setLoading] = useState(true)
    const [finished, setFinished] = useState(false)
    // ----------- REFS -------------
    const exerciseDialogRef = useRef({})
    const monitorDialogRef = useRef({})
    // ----------- TRAINING -------------
    const [started, setStarted] = useState(false)
    const cards = useCards() //TODO If null error (vedi gioggia)
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const selectedCard = cards && cards[selectedCardIndex]
    const [currentExercise, setCurrentExercise] = useState(null)
    const [completion, setCompletion] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [capacities, setCapacities] = useCapacities()
    const fetchExecutionStatus = useExecutionStatus()

    // ----------- REF HANDLERS -------------
    const
        handleExerciseOpen = (exercise) => {
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
                enqueueSnackbar("We have canceled your workout", {variant: "info"})
            }).catch(() => {
                enqueueSnackbar("Cannot stop training", {variant: "error"})
            })
        } else {
            userAxios.put("execution", {"card": selectedCard._id}).then(() => {
                setStarted(true)
                fetchExecutionStatus()
            }).catch(() => {
                enqueueSnackbar("Cannot start training", {variant: "error"})
            })
        }
    }

    const handleStartExercise = (index) => {
        userAxios.patch("execution", {
            exerciseIndex: index,
            command: "startExercise"
        }).then(() => {
            fetchExecutionStatus()
        }).catch((reason) => {
            if (reason.response.status === 404) {
                enqueueSnackbar("No workouts in progress", {variant: "error"})
            } else {
                enqueueSnackbar("Cannot start exercise", {variant: "error"})
            }
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
        }).catch((reason) => {
            if (reason.response.status === 404) {
                enqueueSnackbar("No workouts in progress", {variant: "error"})
            } else {
                enqueueSnackbar("Cannot complete exercise", {variant: "error"})
            }
        })
    }

    // #################### RENDER #####################
    if (loading) {
        return (
            <LoadingBackdrop backDrop={backDrop}/>
        )
    } else {
        return (
            <ThemeProvider theme={darkMode ? trainDarkTheme : trainLightTheme}>
                {backDrop ? <ChooseExerciseBackdrop backDrop={backDrop} setBackDrop={setBackDrop}/> : null}
                <ExerciseDialog ref={exerciseDialogRef}/>
                <MonitorDialog ref={monitorDialogRef}/>
                <TrainingBar cards={cards} selectedCard={selectedCard} completion={completion}
                             startTime={startTime} handleStartCard={handleStartCard}
                             started={started}
                             selectedCardIndex={selectedCardIndex}
                             setSelectedCardIndex={setSelectedCardIndex}
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
                <Fab
                    className={classes.fab}
                    color={"secondary"}
                    onClick={() => monitorDialogRef.current.handleClickDialogOpen()}
                    disabled={false}
                    icontheme={"Filled"}
                    size={"large"}
                    variant={"round"}>
                    <Speed/>
                </Fab>
                <FinishedBackdrop backDrop={finished} setBackDrop={setFinished}/>
            </ThemeProvider>
        )
    }

    // ----------- CUSTOM HOOKS -------------
    function useCards() {
        const [cards, setCards] = useState(null)
        useEffect(() => {
            userAxios.get("cards").then(res => {
                if (res.data.length > 0) {
                    setCards(res.data)
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

    function useExecutionStatus() {
        // ----------- FETCHING DATA -------------
        const fetchExecutionStatus = useCallback(() => {
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
        }, [])

        useEffect(() => {
            fetchExecutionStatus()
        }, [fetchExecutionStatus])
        return fetchExecutionStatus
    }
}

export default Training;
