import React, {useCallback, useEffect, useState} from 'react';
import {Button, ButtonGroup, Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import {baseAxios} from "../../../Api";
import {DataGrid} from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 100,
        paddingBottom: 10,
        // textAlign: "center"
    },
    grid: {
        minHeight: "100vh",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10
    },
    userSelector: {
        width: "100%",
        paddingTop: 14,
        // minHeight: 400,
    },
    exerciseParams: {
        width: "100%",
        // paddingTop: 14,
        // minHeight: 400,
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
    const tags = useTags()

    const [selectedTitle, setSelectedTitle] = useState('')
    const [selectedUsername, setSelectedUsername] = useState(null)
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])

    const [workoutDuration, setWorkoutDuration] = useState('')
    const [series, setSeries] = useState('')
    const [reps, setReps] = useState('')
    const [rest, setRest] = useState('')

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
        setSeries('')
        setReps('')
        setRest('')
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
                    series: parseInt(entry.series),
                    reps: parseInt(entry.reps),
                    rest: {
                        minutes: parseInt(entry.rest),
                        seconds: 0
                    }
                }
            })
        }).then(res => {
            setSelectedUsername(null)
            setSelectedTitle('')
            setSelectedTags([])
            setWorkoutDuration('')
            setSelectedExercise(null)
            setSeries('')
            setReps('')
            setRest('')
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
                    <Typography variant={"h6"} className={classes.title}>Select a user</Typography>
                    <Autocomplete
                        options={users}
                        onChange={((event, value) => {
                            setSelectedUsername(value)
                        })}
                        getOptionLabel={(option) => option.username}
                        renderInput={(params) =>
                            <TextField {...params} label="Type a username..." variant="outlined"/>
                        }
                        value={selectedUsername}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    <Typography variant={"h6"} className={classes.title}>Insert card title</Typography>
                    <TextField
                        id="card-title-insertion"
                        label="Card title"
                        variant="outlined"
                        fullWidth
                        onChange={e => setSelectedTitle(e.target.value)}
                        value={selectedTitle}
                        error={selectedTitle === ''}
                        helperText={'Card title cannot be empty'}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    <Typography variant={"h6"} className={classes.title}>Select tags</Typography>
                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        options={tags}
                        onChange={((event, values) => {
                            setSelectedTags(values)
                        })}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) =>
                            <TextField {...params} label="Select tags..." variant="outlined"/>
                        }
                        value={selectedTags}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    <Typography variant={"h6"} className={classes.title}>Insert workout duration</Typography>
                    <TextField
                        id="series-selector"
                        label="Duration (min)"
                        type="number"
                        variant="outlined"
                        fullWidth
                        onChange={e => setWorkoutDuration(e.target.value)}
                        value={workoutDuration}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    <Typography variant={"h6"} className={classes.title}>Select an exercise</Typography>
                    <Autocomplete
                        options={exercises}
                        onChange={((event, value) => {
                            setSelectedExercise(value)
                        })}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) =>
                            <TextField {...params} label="Select an exercise..." variant="outlined"/>
                        }
                        value={selectedExercise}
                    />
                </Grid>
                <Grid container item direction={"column"} alignItems={"center"} justify={"center"}
                      className={classes.exerciseParams} component={"form"} onSubmit={handleExerciseSubmit}>
                    <Grid container direction={"row"} alignItems={"center"} justify={"center"}
                          className={classes.exerciseParams}>
                        <Grid item md={4} className={classes.exerciseParam}>
                            <TextField
                                id="series-selector"
                                label="Series"
                                type="number"
                                variant="outlined"
                                fullWidth
                                onChange={e => setSeries(e.target.value)}
                                value={series}
                                error={!isPositive(series)}
                                helperText={'Insert a positive value'}
                            />
                        </Grid>
                        <Grid item md={4} className={classes.exerciseParam}>
                            <TextField
                                id="reps-selector"
                                label="Reps"
                                type="number"
                                variant="outlined"
                                fullWidth
                                onChange={e => setReps(e.target.value)}
                                value={reps}
                                error={!isPositive(reps)}
                                helperText={'Insert a positive value'}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={4} className={classes.exerciseParam}>
                        <TextField
                            id="rest-selector"
                            label="Rest (min)"
                            type="number"
                            variant="outlined"
                            fullWidth
                            onChange={e => setRest(e.target.value)}
                            value={rest}
                            error={!isPositive(rest)}
                            helperText={'Insert a positive value'}
                        />
                    </Grid>
                    <Grid item className={classes.submitButtons}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button
                                onClick={handleExerciseSubmit}
                                disabled={!selectedExercise || !isPositive(series) || !isPositive(reps) || !isPositive(rest)}>
                                Add exercise
                            </Button>
                            <Button
                                onClick={handleCardSubmit}
                                disabled={
                                    selectedTitle === '' || !selectedUsername || !workoutDuration || cardEntries.length === 0
                                }
                            >
                                Submit card
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid item className={classes.dataGrid}>
                    <DataGrid rows={cardEntries} columns={columns} pageSize={8} autoHeight/>
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

        return tags
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