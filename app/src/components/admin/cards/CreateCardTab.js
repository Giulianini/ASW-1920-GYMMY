import React, {useCallback, useEffect, useState} from 'react';
import {Button, Fab, Grid, Slider, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import {baseAxios} from "../../../Api";
import {DataGrid} from "@material-ui/data-grid";
import {Done} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 100,
        paddingBottom: 0,
        // textAlign: "center"
    },
    grid: {
        minHeight: "100vh",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10
    },
    gridItem: {
        width: "100%"
    },
    sliderGrid: {},
    sliderText: {
        fontWeight: 100,
        textAlign: "center"
    },
    sliderTitle: {
        fontWeight: 300,
        textAlign: "center",
    },
    userSelector: {
        width: "100%",
        paddingTop: 14,
        // minHeight: 400,
    },
    exerciseParams: {
        width: "100%",
        marginTop: 15
    },
    exerciseParam: {
        paddingTop: 14,
        marginLeft: 2,
        marginRight: 2,
    },
    dataGrid: {
        width: "100%",
        minHeight: 400,
    },
    submitButtons: {
        paddingTop: 14,
        paddingBottom: 14,
    },
    submitButton: {
        marginTop: 30,
        marginBottom: 30,
    }
}))

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'exerciseName', headerName: 'Exercise', width: 100},
    {field: 'series', headerName: 'Series', width: 100, type: 'number'},
    {field: 'reps', headerName: 'Reps', width: 90, type: 'number'},
    {field: 'rest', headerName: 'Rest time', width: 130, type: 'number'},
]

function CreateCardTab(props) {
    const classes = useStyles()

    const users = useUsers()
    const exercises = useExercises()
    const [tags, fetchTags] = useTags()

    const [selectedTitle, setSelectedTitle] = useState('')
    const [selectedUsername, setSelectedUsername] = useState(null)
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])

    const [workoutDuration, setWorkoutDuration] = useState('')
    const [series, setSeries] = useState(0)
    const [reps, setReps] = useState(0)
    const [rest, setRest] = useState(0)

    const [cardEntries, setCardEntries] = useState([])

    const handleExerciseSubmit = e => {
        e.preventDefault()
        const index = cardEntries.length
        setCardEntries([
            ...cardEntries,
            {
                id: index,
                exerciseName: selectedExercise.name,
                series: series,
                reps: reps,
                rest: rest
            }
        ])
        setSelectedExercise(null)
        setSeries(0)
        setReps(0)
        setRest(0)
    }

    const handleCardSubmit = e => {
        e.preventDefault()
        baseAxios.post(`users/${selectedUsername.username}/cards`, {
            title: selectedTitle,
            trainer: localStorage.getItem('username'),
            tags: selectedTags.map(tag => tag.name),
            minutes: parseInt(workoutDuration),
            exercises: cardEntries.map(entry => {
                return {
                    exercise: entry.exerciseName,
                    series: entry.series,
                    reps: entry.reps,
                    rest: {
                        minutes: Math.floor(entry.rest / 60),
                        seconds: entry.rest % 60
                    }
                }
            })
        }).then(res => {
            setSelectedUsername(null)
            setSelectedTitle('')
            setSelectedTags([])
            setWorkoutDuration('')
            setSelectedExercise(null)
            setSeries(0)
            setReps(0)
            setRest(0)
            setCardEntries([])
        })
    }

    const isPositive = (field) => {
        return field !== '' && field > 0
    }

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Grid container item xs={12} md={5}>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Select a user</Typography>*/}
                    <Autocomplete
                        options={users}
                        onChange={((event, value) => {
                            setSelectedUsername(value)
                        })}
                        getOptionLabel={(option) => option.username}
                        renderInput={(params) =>
                            <TextField {...params} label="Type a username..." variant="standard"/>
                        }
                        value={selectedUsername}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Insert card title</Typography>*/}
                    <TextField
                        id="card-title-insertion"
                        label="Card title"
                        variant="standard"
                        fullWidth
                        onChange={e => setSelectedTitle(e.target.value)}
                        value={selectedTitle}
                        error={selectedTitle === ''}
                        helperText={'Card title cannot be empty'}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Select tags</Typography>*/}
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        options={tags}
                        onChange={((event, values) => {
                            setSelectedTags(values)
                        })}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) =>
                            <TextField {...params} label="Select tags..." variant="standard"
                                       onClick={fetchTags}/>
                        }
                        value={selectedTags}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Insert workout duration</Typography>*/}
                    <TextField
                        id="series-selector"
                        label="Duration (min)"
                        type="number"
                        variant="standard"
                        fullWidth
                        onChange={e => setWorkoutDuration(e.target.value)}
                        value={workoutDuration}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Select an exercise</Typography>*/}
                    <Autocomplete
                        options={exercises}
                        onChange={((event, value) => {
                            setSelectedExercise(value)
                        })}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) =>
                            <TextField {...params} label="Select an exercise..." variant="standard"/>
                        }
                        value={selectedExercise}
                    />
                </Grid>
                <Grid container item direction={"column"} alignItems={"center"} justify={"center"}
                      className={classes.exerciseParams} component={"form"} onSubmit={handleExerciseSubmit}>
                    <Grid container direction={"column"} alignItems={"center"} justify={"center"}>
                        <Grid item container direction={"column"} alignItems={"flex-start"}
                              className={classes.sliderGrid}>
                            <Grid item>
                                <Typography className={classes.sliderTitle}>Series</Typography>
                            </Grid>
                            <Grid container item alignItems={"center"}>
                                <Grid item xs={11} className={classes.gridItem}>
                                    <Slider
                                        defaultValue={0}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                        value={series}
                                        onChange={(event, value) => {
                                            setSeries(value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sliderText}>{series}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container direction={"column"} alignItems={"flex-start"}
                              className={classes.sliderGrid}>
                            <Grid item>
                                <Typography className={classes.sliderTitle}>Reps</Typography>
                            </Grid>
                            <Grid container item alignItems={"center"}>
                                <Grid item xs={11} className={classes.gridItem}>
                                    <Slider
                                        defaultValue={0}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={30}
                                        value={reps}
                                        onChange={(event, value) => {
                                            setReps(value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={1} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sliderText}>{reps}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container direction={"column"} alignItems={"flex-start"}
                              className={classes.sliderGrid}>
                            <Grid item>
                                <Typography className={classes.sliderTitle}>Rest (sec)</Typography>
                            </Grid>
                            <Grid container item alignItems={"center"}>
                                <Grid item xs={10} className={classes.gridItem}>
                                    <Slider
                                        defaultValue={0}
                                        valueLabelDisplay="auto"
                                        step={30}
                                        marks
                                        min={0}
                                        max={5 * 30}
                                        value={rest}
                                        onChange={(event, value) => {
                                            setRest(value)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} className={classes.gridItem}>
                                    <Typography
                                        className={classes.sliderText}>{`${Math.floor(rest / 60)}' ${rest % 60}''`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.submitButtons}>
                        <Button
                            onClick={handleExerciseSubmit}
                            disabled={!selectedExercise || !isPositive(series) || !isPositive(reps) || !isPositive(rest)}
                            variant={"contained"}
                            color={"primary"}
                        >
                            Add exercise
                        </Button>
                    </Grid>
                </Grid>
                <Grid item className={classes.dataGrid}>
                    <DataGrid rows={cardEntries} columns={columns}/>
                </Grid>
                <Grid item container justify={"center"} xs={12} className={classes.gridItem}>
                    <Fab color={"primary"}
                         onSubmit={handleCardSubmit}
                         className={classes.submitButton}
                         type={"submit"}
                         size={"large"}
                         variant={"round"}>
                        <Done/>
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );

    function useUsers() {
        const [users, setUsers] = useState([])
        const fetchUsers = useCallback(() => {
            baseAxios.get("users").then(res => {
                const foundUsers = res.data.filter(obj => obj.role !== "trainer")
                setUsers(foundUsers)
            }).catch(reason => {
            })
        }, []);
        useEffect(() => {
            fetchUsers()
        }, [fetchUsers])

        return users
    }

    function useTags() {
        const [tags, setTags] = useState([])
        const fetchTags = useCallback(() => {
            baseAxios.get("tags").then(res => {
                const foundTags = res.data
                setTags(foundTags)
            }).catch(reason => {
            })
        }, []);
        useEffect(() => {
            fetchTags()
        }, [fetchTags])

        return [tags, fetchTags]
    }

    function useExercises() {
        const [exercises, setExercises] = useState([])

        const fetchExercises = useCallback(() => {
            baseAxios.get("exercises").then(res => {
                const foundExercises = res.data
                setExercises(foundExercises)
            })
        }, [])
        useEffect(() => {
            fetchExercises()
        }, [fetchExercises])

        return exercises
    }
}

export default CreateCardTab;