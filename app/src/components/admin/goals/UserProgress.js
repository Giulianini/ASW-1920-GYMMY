import React, {useCallback, useEffect, useState} from 'react';
import {Box, Fab, Grid, Slider, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios} from "../../../Api";
import {Done, Info} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    form: {
        paddingTop: 10,
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
    const [values, setValues] = useProgress()

    const handleChange = (prop, value) => {
        setValues({
            ...values,
            [prop]: value,
        })
    }

    const resetForm = () => {
        setValues({
            beginner: 0,
            intermediate: 0,
            advanced: 0,
        })
    }

    const canSubmit = () => {
        if (values.intermediate && values.advanced) {
            if (values.beginner < values.intermediate && values.intermediate < values.advanced) {
                return true
            } else {
                enqueueSnackbar("Check threshold values order", {variant: "warning"})
                return false
            }
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (canSubmit()) {
            baseAxios.patch("/progressThreshold", values).then((res) => {
                enqueueSnackbar("Progress values successfully updated", {variant: "success"})
                resetForm()
            }).catch((reason) => {
                if (reason.response.status === 404) {
                    enqueueSnackbar("Creating progress values for the first time ", {variant: "warning"})
                    baseAxios.put("progressThreshold", values).then((res) => {
                        enqueueSnackbar("Progress values successfully created", {variant: "success"})
                    }).catch((reason) => {
                        console.log(reason.response)
                        enqueueSnackbar("Error adding the progress values", {variant: "error"})
                    })
                } else {
                    enqueueSnackbar("Error updating the progress values", {variant: "error"})
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
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>Beginner threshold</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={10} className={classes.gridItem}>
                            <Slider
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                step={50}
                                marks
                                min={0}
                                max={1000}
                                value={values.beginner}
                                className={classes.slider}
                                onChange={(event, value) => {
                                    handleChange("beginner", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.beginner} pts</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>Intermediate threshold</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={10} className={classes.gridItem}>
                            <Slider
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                step={50}
                                marks
                                min={0}
                                max={1000}
                                value={values.intermediate}
                                className={classes.slider}
                                onChange={(event, value) => {
                                    handleChange("intermediate", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.intermediate} pts</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>Advanced threshold</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={10} className={classes.gridItem}>
                            <Slider
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                step={50}
                                marks
                                min={0}
                                max={1000}
                                value={values.advanced}
                                className={classes.slider}
                                onChange={(event, value) => {
                                    handleChange("advanced", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={2} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.advanced} pts</Typography>
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

    function useProgress() {
        const [values, setValues] = React.useState({
            beginner: 0,
            intermediate: 0,
            advanced: 0,
        })
        const fetchProgress = useCallback(() => {
            baseAxios.get("/progressThreshold").then((res) => {
                setValues(res.data)
            }).catch((reason) => {
                console.log(reason.response.data)
            })
        }, [])
        useEffect(() => {
            fetchProgress()
        }, [fetchProgress])
        return [values,setValues]
    }
}

export default CreateGoalTab;