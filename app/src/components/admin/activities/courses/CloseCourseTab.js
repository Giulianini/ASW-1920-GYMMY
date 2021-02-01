import React, {useCallback, useEffect, useState} from 'react';
import {Fab, Grid, TextField} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios} from "../../../../Api";
import {Delete} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles({
    form: {
        paddingTop: 10,
        paddingBottom: 20,
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

function CloseCourseTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [courses, fetchCourses] = useCourses()

    const canSubmit = () => {
        return selectedCourse
    }

    const handleSubmit = (e) => {
        if (canSubmit()) {
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
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            value={selectedCourse}
                            options={courses}
                            onChange={((event, value) => {
                                setSelectedCourse(value)
                            })}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) =>
                                <TextField {...params}
                                           onClick={fetchCourses} label="Select a course..." variant="standard"
                                />
                            }
                        />
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
                    <Delete/>
                </Fab>
            </Grid>
        </Grid>
    );

    function useCourses() {
        const [courses, setCourses] = useState([])
        const fetchCourses = useCallback(() => {
            baseAxios.get("courses").then(res => {
                setCourses(res.data)
            }).catch(() => {
                enqueueSnackbar("Cannot fetch courses", {variant: "error"})
            })
        }, []);

        useEffect(() => {
            fetchCourses()
        }, [fetchCourses])
        return [courses, fetchCourses]
    }
}

export default CloseCourseTab;