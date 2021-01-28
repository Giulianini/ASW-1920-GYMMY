import React, {useState} from 'react';
import {Box, Fab, Grid, Slider, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {DropzoneArea} from "material-ui-dropzone";
import {baseAxios} from "../../../Api";
import {Add} from "@material-ui/icons";

const useStyles = makeStyles({
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
    }
})

function CreateChallengeTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [values, setValues] = React.useState({
        title: '',
        description: '',
        firstPlaceReward: 0,
        secondPlaceReward: 0,
        thirdPlaceReward: 0,
    })
    const [file, setFile] = useState([])

    const handleChange = (prop, value) => {
        setValues({
            ...values,
            [prop]: value,
        })
    }

    const resetForm = () => {
        setValues({
            title: '',
            description: '',
            firstPlaceReward: 0,
            secondPlaceReward: 0,
            thirdPlaceReward: 0,
        })
        setFile([])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.description && values.title && file[0]) {
            baseAxios.post("/challenges", values).then((res) => {
                const challengeId = res.data._id
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
                let fd = new FormData()
                fd.append("image", file[0])
                baseAxios.put(`/challenges/${challengeId}/image`, fd, config).then(() => {
                    enqueueSnackbar("Challenge successfully added", {variant: "success"})
                    resetForm()
                }).catch((reason => {
                    console.log(reason.response.data)
                    enqueueSnackbar("Error adding the challenge image", {variant: "error"})
                }))
            }).catch((reason) => {
                console.log(reason.response.data)
                enqueueSnackbar("Error adding the challenge", {variant: "error"})
            })
        } else {
            enqueueSnackbar("Some field are empty", {variant: "error"})
        }
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item container xs={10} md={5} direction={"column"}>
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>1° place points</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={11} className={classes.gridItem}>
                            <Slider
                                defaultValue={30}
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                                value={values.firstPlaceReward}
                                onChange={(event, value) => {
                                    handleChange("firstPlaceReward", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.firstPlaceReward} pt</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>1° place points</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={11} className={classes.gridItem}>
                            <Slider
                                defaultValue={30}
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                                value={values.secondPlaceReward}
                                onChange={(event, value) => {
                                    handleChange("secondPlaceReward", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.secondPlaceReward} pt</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>1° place points</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={11} className={classes.gridItem}>
                            <Slider
                                defaultValue={30}
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                                value={values.thirdPlaceReward}
                                onChange={(event, value) => {
                                    handleChange("thirdPlaceReward", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.thirdPlaceReward} pt</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            handleChange("title", event.target.value)
                        }}
                        value={values.title}
                        id="outlined-search"
                        label="Challenge title"
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
                        label="Challenge description"
                        variant="standard"/>
                </Grid>
                <Grid item className={classes.gridItem}>
                    <Box className={classes.uploadZone}>
                        <Typography variant={"h6"} className={classes.sliderTitle}>Upload image</Typography>
                        <DropzoneArea onChange={(files) => setFile(files)}/>
                    </Box>
                </Grid>
            </Grid>
            <Grid item container justify={"center"} xs={11} className={classes.gridItem}>
                <Fab color={"primary"}
                     onSubmit={handleSubmit}
                     className={classes.submitButton}
                     type={"submit"}
                     size={"large"}
                     variant={"round"}>
                    <Add/>
                </Fab>
            </Grid>
        </Grid>
    );
}

export default CreateChallengeTab;