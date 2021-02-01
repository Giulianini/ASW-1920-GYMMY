import React, {useCallback, useEffect, useState} from 'react';
import {Fab, Grid, Slider, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios} from "../../../Api";
import {Done} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import {createGoalsTabNotification} from "./Goals";

const useStyles = makeStyles(theme => ({
    form: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    title: {
        fontWeight: 300
    },
    gridItem: {
        width: "100%",
    },
    sliderText: {
        fontWeight: 100,
        textAlign: "center"
    },
    sliderTitle: {
        fontWeight: 300,
        textAlign: "center"
    },
    uploadZone: {
        marginTop: 20,
    },
    submitButton: {
        marginTop: 20,
    },
    slidersGrid: {
        marginTop: 40,
    },
    userSelector: {
        marginBottom: 20,
    },
    slider: {
        zIndex: theme.zIndex.drawer + 1,
    }
}))

function CreateGoalTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const users = useUsers()
    const [selectedUsername, setSelectedUsername] = useState(null)
    const [values, setValues] = React.useState({
        mainGoal: '',
        description: '',
        targetWeight: 0,
        targetBMI: 0,
        targetCalories: 0,
        targetMinWorkouts: 0,
    })

    const handleChange = (prop, value) => {
        setValues({
            ...values,
            [prop]: value,
        })
    }

    const resetForm = () => {
        setValues({
            mainGoal: '',
            description: '',
            targetWeight: 0,
            targetBMI: 0,
            targetCalories: 0,
            targetMinWorkouts: 0
        })
    }

    const fetchObjectives = (usernameData) => {
        if (usernameData) {
            baseAxios.get(`users/${usernameData.username}/objective`).then((res) => {
                setValues(res.data)
            }).catch(() => {
                enqueueSnackbar("Objective is not specified yet", {variant: "info"})
            })
        } else {
            resetForm()
        }
    }
    useEffect(() => {
        enqueueSnackbar(createGoalsTabNotification, {variant: "info"})
    }, [enqueueSnackbar])

    const canSubmit = () => {
        return selectedUsername && values.targetBMI && values.targetWeight && values.targetCalories && values.targetMinWorkouts
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (canSubmit()) {
            baseAxios.patch(`users/${selectedUsername.username}/objective`, values).then(() => {
                enqueueSnackbar("Goal successfully updated", {variant: "success"})
                resetForm()
            }).catch((reason) => {
                if (reason.response.status === 404) {
                    enqueueSnackbar("Creating goals for the first time ", {variant: "warning"})
                    baseAxios.put(`users/${selectedUsername.username}/objective`, values).then(() => {
                        enqueueSnackbar("Goal successfully created", {variant: "success"})
                        resetForm()
                    }).catch(() => {
                        enqueueSnackbar("Error adding the goals", {variant: "error"})
                    })
                } else if (reason.response.status === 409) {
                    enqueueSnackbar("User already present", {variant: "error"})
                } else {
                    enqueueSnackbar("Error updating the goals", {variant: "error"})
                }
            })
        } else {
            enqueueSnackbar("Some field are empty", {variant: "warning"})
        }
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item container xs={10} md={5} direction={"column"}>
                <Grid item className={classes.userSelector}>
                    <Autocomplete
                        options={users}
                        onChange={((event, value) => {
                            setSelectedUsername(value)
                            fetchObjectives(value)
                        })}
                        getOptionLabel={(option) => option.username}
                        renderInput={(params) =>
                            <TextField {...params} label="Select a username..." variant="standard"/>
                        }
                        value={selectedUsername}
                    />
                </Grid>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            handleChange("mainGoal", event.target.value)
                        }}
                        value={values.mainGoal}
                        label="Main goal"
                        variant="standard"/>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            handleChange("description", event.target.value)
                        }}
                        value={values.description}
                        id="outlined-search"
                        label="Goal description"
                        variant="standard"/>
                </Grid>
                <Grid item container direction={"column"} alignItems={"center"} className={classes.slidersGrid}>
                    <Grid item container direction={"column"} alignItems={"flex-start"}>
                        <Grid item>
                            <Typography className={classes.sliderTitle}>Target weight</Typography>
                        </Grid>
                        <Grid container item alignItems={"center"}>
                            <Grid item xs={10} className={classes.gridItem}>
                                <Slider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={30}
                                    max={150}
                                    value={values.targetWeight}
                                    className={classes.slider}
                                    onChange={(event, value) => {
                                        handleChange("targetWeight", value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} className={classes.gridItem}>
                                <Typography className={classes.sliderText}>{values.targetWeight} kg</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction={"column"} alignItems={"flex-start"}>
                        <Grid item>
                            <Typography className={classes.sliderTitle}>Target BMI</Typography>
                        </Grid>
                        <Grid container item alignItems={"center"}>
                            <Grid item xs={10} className={classes.gridItem}>
                                <Slider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={50}
                                    value={values.targetBMI}
                                    className={classes.slider}
                                    onChange={(event, value) => {
                                        handleChange("targetBMI", value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} className={classes.gridItem}>
                                <Typography className={classes.sliderText}>{values.targetBMI} %</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction={"column"} alignItems={"flex-start"}>
                        <Grid item>
                            <Typography className={classes.sliderTitle}>Target calories</Typography>
                        </Grid>
                        <Grid container item alignItems={"center"}>
                            <Grid item xs={10} className={classes.gridItem}>
                                <Slider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={100}
                                    marks
                                    min={0}
                                    max={3500}
                                    value={values.targetCalories}
                                    className={classes.slider}
                                    onChange={(event, value) => {
                                        handleChange("targetCalories", value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} className={classes.gridItem}>
                                <Typography className={classes.sliderText}>{values.targetCalories} kcal</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container direction={"column"} alignItems={"flex-start"}>
                        <Grid item>
                            <Typography className={classes.sliderTitle}>Target workout frequency (week)</Typography>
                        </Grid>
                        <Grid container item alignItems={"center"}>
                            <Grid item xs={10} className={classes.gridItem}>
                                <Slider
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={7}
                                    value={values.targetMinWorkouts}
                                    className={classes.slider}
                                    onChange={(event, value) => {
                                        handleChange("targetMinWorkouts", value)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} className={classes.gridItem}>
                                <Typography className={classes.sliderText}>{values.targetMinWorkouts} days</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container justify={"center"} xs={11} className={classes.gridItem}>
                <Fab disabled={!canSubmit()}
                     color={"primary"}
                     onSubmit={handleSubmit}
                     className={classes.submitButton}
                     type={"submit"}
                     size={"large"}
                     variant={"round"}>
                    <Done/>
                </Fab>
            </Grid>
        </Grid>
    );

    function useUsers() {
        const [users, setUsers] = useState([])
        const fetchUsers = useCallback(() => {
            baseAxios.get("users").then(res => {
                const foundUsers = res.data.filter(obj => obj.role !== "trainer")
                setUsers(foundUsers)
            }).catch(() => {
                enqueueSnackbar('Cannot fetch users', {variant: "error"})
            })
        }, []);
        useEffect(() => {
            fetchUsers()
        }, [fetchUsers])
        return users
    }
}

export default CreateGoalTab;