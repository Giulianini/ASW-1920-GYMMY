import React, {useCallback, useEffect, useState} from 'react';
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Fab, Grid, TextField, Typography} from "@material-ui/core";
import {Done} from "@material-ui/icons";
import {DropzoneArea} from "material-ui-dropzone";
import {baseAxios} from "../../../Api";
import {Autocomplete} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    userSelector: {
        width: "100%",
        paddingTop: 14,
    },
    submitButton: {
        marginTop: 30,
        marginBottom: 30,
    },
    gridItem: {
        width: "100%",
    },
    grid: {
        minHeight: "100vh",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10
    },
    uploadZone: {
        marginTop: 20,
    },
    imageUploadTitle: {
        fontWeight: 300,
        textAlign: "center"
    },
}))

function CreateExerciseTab(props) {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()

    const [locations, fetchLocations] = useLocations()

    const [exerciseName, setExerciseName] = useState('')
    const [exerciseDescription, setExerciseDescription] = useState('')
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [file, setFile] = useState([])

    const handleExerciseCreate = (e) => {
        e.preventDefault()
        baseAxios.post('exercises', {
            name: exerciseName,
            description: exerciseDescription,
            location: selectedLocation.description
        }).then(res => {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            let fd = new FormData()
            fd.append("image", file[0])
            baseAxios.put(`/exercises/${exerciseName}/image`, fd, config).then(() => {
                enqueueSnackbar("Exercise successfully added", {variant: "success"})
                setExerciseName('')
                setExerciseDescription('')
                setSelectedLocation(null)
                setFile([])
            }).catch((reason => {
                console.log(reason.response.data)
                enqueueSnackbar("Error adding the exercise image", {variant: "error"})
            }))
        }).catch(reason => {
            console.log(reason.response.data)
            if (reason.response.status === 409) {
                enqueueSnackbar("Exercise already present", {variant: "error"})
            } else {
                enqueueSnackbar("Error adding the exercise", {variant: "error"})
            }
        })
    }

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Grid container item xs={12} md={5} component={"form"} onSubmit={handleExerciseCreate}>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            setExerciseName(event.target.value)
                        }}
                        value={exerciseName}
                        label="Exercise name"
                        variant="standard"/>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            setExerciseDescription(event.target.value)
                        }}
                        value={exerciseDescription}
                        label="Description"
                        variant="standard"/>
                </Grid>
                <Grid item className={classes.gridItem}>
                    {/*<Typography variant={"h6"} className={classes.title}>Select a user</Typography>*/}
                    <Autocomplete
                        options={locations}
                        onChange={((event, value) => {
                            setSelectedLocation(value)
                        })}
                        getOptionLabel={(option) => option.description}
                        renderInput={(params) =>
                            <TextField {...params} onClick={fetchLocations}
                                       label="Select a location..." variant="standard"/>
                        }
                        value={selectedLocation}
                    />
                </Grid>
                <Grid item className={classes.gridItem}>
                    <Box className={classes.uploadZone}>
                        <Typography variant={"h6"} className={classes.imageUploadTitle}>Upload image</Typography>
                        <DropzoneArea onChange={(files) => setFile(files)}/>
                    </Box>
                </Grid>
                <Grid item container justify={"center"} xs={12} className={classes.gridItem}>
                    <Fab color={"primary"}
                         onSubmit={handleExerciseCreate}
                         className={classes.submitButton}
                         type={"submit"}
                         size={"large"}
                         variant={"round"}
                         disabled={exerciseName === '' || exerciseDescription === '' ||
                         selectedLocation === null || file.length === 0}
                    >
                        <Done/>
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );

    function useLocations() {
        const [locations, setLocations] = useState([])
        const fetchLocations = useCallback(() => {
            baseAxios.get("locations").then(res => {
                const foundLocations = res.data
                setLocations(foundLocations)
            }).catch(reason => {
            })
        }, []);
        useEffect(() => {
            fetchLocations()
        }, [fetchLocations])

        return [locations, fetchLocations]
    }
}

export default CreateExerciseTab;