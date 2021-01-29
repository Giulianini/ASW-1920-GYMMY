import React, {useCallback, useEffect, useState} from 'react';
import {Fab, Grid, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios} from "../../../Api";
import {Delete} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    form: {
        paddingTop: 10,
    },
    autocompleteTitle: {
        fontWeight: 100,
        paddingBottom: 10,
        textAlign: "center"
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
        marginTop: 30,
    },
    autocompleteBlock: {
        marginTop: 20,
    }
})

function CloseChallengeTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [courses, setCourses] = useState([])

    const fetchCourses = useCallback(() => {
        baseAxios.get("courses").then(res => {
            setCourses(res.data)
        }).catch(reason => {
            console.log(reason.response.data)
            enqueueSnackbar("Cannot fetch courses", {variant: "error"})
        })
    }, []);

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])


    const handleSubmit = (e) => {
        if (selectedCourse) {
            baseAxios.delete("/courses/" + selectedCourse._id, {}).then(() => {
                setSelectedCourse(null)
                fetchCourses()
                enqueueSnackbar("Course successfully closed", {variant: "success"})
            }).catch(() => {
                enqueueSnackbar("Error closing the course", {variant: "error"})
            })
        } else {
            enqueueSnackbar("Some field are empty", {variant: "warning"})
        }
        e.preventDefault()
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item container xs={10} md={5} direction={"column"}>
                <Grid item container direction={"column"} alignItems={"flex-start"}
                      className={classes.autocompleteBlock}>
                    <Grid item>
                        <Typography variant={"h6"} className={classes.autocompleteTitle}>Select a course</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            value={selectedCourse}
                            options={courses}
                            onChange={((event, value) => {
                                setSelectedCourse(value)
                            })}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) =>
                                <TextField {...params} label="Select a course..." variant="outlined"/>
                            }
                        />
                        <IconButton>
                            
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container justify={"center"} xs={11} className={classes.gridItem}>
                <Fab color={"primary"}
                     onSubmit={handleSubmit}
                     className={classes.submitButton}
                     type={"submit"}
                     size={"large"}
                     variant={"round"}>
                    <Delete/>
                </Fab>
            </Grid>
        </Grid>
    );
}

export default CloseChallengeTab;