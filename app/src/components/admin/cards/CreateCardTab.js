import React, {useCallback, useEffect, useState} from 'react';
import {Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import {baseAxios} from "../../../Api";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 100,
        paddingBottom: 10,
        textAlign: "center"
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
    }
}))

function CreateCardTab(props) {
    const classes = useStyles()

    const users = useUsers()
    const exercises = useExercises()

    const [selectedUsername, setSelectedUsername] = useState(null)
    const [selectedExercise, setSelectedExercise] = useState(null)

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Grid container item xs={12} md={5}>
                <Grid item className={classes.userSelector}>
                    <Typography variant={"h5"} className={classes.title}>Select a user</Typography>
                    <Autocomplete
                        options={users}
                        onChange={((event, value) => {
                            setSelectedUsername(value)
                        })}
                        getOptionLabel={(option) => option.username}
                        renderInput={(params) =>
                            <TextField {...params} label="Type a username..." variant="outlined"/>
                        }
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    <Typography variant={"h5"} className={classes.title}>Select an exercise</Typography>
                    <Autocomplete
                        options={exercises}
                        onChange={((event, value) => {
                            setSelectedExercise(value)
                        })}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) =>
                            <TextField {...params} label="Select an exercise..." variant="outlined"/>
                        }
                    />
                </Grid>
                <Grid container item direction={"row"} alignItems={"center"} justify={"center"}
                      className={classes.exerciseParams}>
                    <Grid item md={4} className={classes.exerciseParam}>
                        <TextField
                            id="standard-number"
                            label="Series"
                            type="number"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={4} className={classes.exerciseParam}>
                        <TextField
                            id="standard-number"
                            label="Reps"
                            type="number"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={4} className={classes.exerciseParam}>
                        <TextField
                            id="standard-number"
                            label="Rest (min)"
                            type="number"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
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