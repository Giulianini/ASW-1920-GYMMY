import React, {useEffect, useRef, useState} from 'react';
import {Backdrop, CircularProgress, Grid, Typography} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {trainDarkTheme, trainLightTheme} from "./trainTheme"
import {socket, userAxios} from "../../../Api";
import ExerciseCard from "./Exercise/ExerciseCard";
import TrainingBar from "./header/TrainingBar";
import ExerciseDialog from "./Exercise/ExerciseDialog";

const useStyles = makeStyles((theme) => ({
    exercisesGrid: {
        marginTop: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    backdropText: {
        textAlign: "center",
        fontWeight: 100,
    }
}))

function Training() {
    const classes = useStyles()
    const [backDrop, setBackDrop] = useState(false)
    const [loading, setLoading] = useState(true)
    const [started, setStarted] = useState(false)
    const darkMode = useSelector(state => state.userRedux.darkMode)
    const cards = useCards()
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const selectedCard = cards && cards[selectedCardIndex]
    const [currentExercise, setCurrentExercise] = useState(null)
    const [completion, setCompletion] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [capacities, setCapacities] = useCapacities()
    const [finished, setFinished] = useState(false)

    const exerciseDialogRef = useRef({})

    const handleExerciseOpen = (exercise) => {
        exerciseDialogRef.current.handleClickDialogOpen(exercise)
    }

    const handleStartCard = () => {
        if (started) {
            userAxios.delete("execution").then(() => {
                console.log("deleting")
                setStarted(false)
            }).catch(reason => {
                // console.log(reason.response.data) //TODO notification
            })
        } else {
            userAxios.put("execution", {"card": selectedCard._id}).then(() => {
                setStarted(true)
                fetchExecutionStatus()
            }).catch(reason => {
                // console.log(reason.response.data) //TODO notification
            })
        }
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
            console.log("Error cannot complete exercise") //TODO notification
        })
    }

    const handleStartExercise = (index) => {
        userAxios.patch("execution", {
            exerciseIndex: index,
            command: "startExercise"
        }).then(() => {
            setCurrentExercise(index)
        }).catch(reason => {
            // console.log(reason.response) //TODO notification
        })
    }

    function fetchExecutionStatus() {
        userAxios.get("execution").then(res => {
            setCurrentExercise(res.data.currentExercise)
            setCompletion(res.data.completion)
            setStartTime(res.data.startTime)
            setStarted(true)
            setFinished(false)
            setCapacities(res.data.completion.map(c => c.locationCapacity.capacity))
        }).catch(reason => {
            setStarted(false)
            setBackDrop(true)
            // console.log("No execution found") //TODO notification
        })
    }

    useEffect(() => {
        fetchExecutionStatus()
    }, [currentExercise])

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={backDrop}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    } else if (!started && backDrop && !loading) {
        return (
            <Backdrop className={classes.backdrop} open={backDrop} onClick={() => setBackDrop(false)}>
                <Grid container direction={"column"} justify={"flex-start"}>
                    <Grid item>
                        <Typography variant={"h4"} className={classes.backdropText}>
                            Hey!
                            <br/>
                            Start a workout
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h6"} className={classes.backdropText}>
                            Select a training card on the top right
                        </Typography>
                    </Grid>
                </Grid>
            </Backdrop>
        )
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
                <Backdrop className={classes.backdrop} open={finished} onClick={() => setFinished(false)}>
                    <Typography variant={"h4"} className={classes.backdropText}>
                        Yee!
                        <br/>
                        Workout complete!
                    </Typography>
                </Backdrop>
            </ThemeProvider>
        )
    }

    function useCards() {
        const [cards, setCards] = useState(null)
        useEffect(() => {
            userAxios.get("cards").then(res => {
                setCards(res.data)
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
                // console.log('in unsubscribe')
                socket.off('capacities', capacitiesHandler)
            }
        }, [])
        return [capacities, setCapacities]
    }
}


export default Training;
