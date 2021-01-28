import React, {useState} from 'react';
import {Box, Fab, Grid, Slider, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {DropzoneArea} from "material-ui-dropzone";
import {userAxios} from "../../../Api";
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

function Challenges() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [values, setValues] = React.useState({
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
    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.description && file[0]) {
            userAxios.post("/challenges", values).then(() => {
                enqueueSnackbar("Success", {variant: "success"})
            }).catch(() => {
                enqueueSnackbar("Error adding the challenge", {variant: "error"})
            })
        } else {
            enqueueSnackbar("Some field are empty", {variant: "error"})
        }
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item>
                <Typography variant={"h5"} className={classes.title}>
                    Insert challenge
                </Typography>
            </Grid>
            <Grid item container xs={11} direction={"column"} alignItems={"flex-start"}>
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
            <Grid item container xs={11} direction={"column"} alignItems={"flex-start"}>
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
            <Grid item container xs={11} direction={"column"} alignItems={"flex-start"}>
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
            <Grid item xs={11} className={classes.gridItem}>
                <TextField
                    required
                    fullWidth
                    onChange={(event) => {
                        handleChange("description", event.target.value)
                    }}
                    id="outlined-search"
                    label="Challenge name"
                    variant="standard"/>
            </Grid>
            <Grid item xs={11} className={classes.gridItem}>
                <Box className={classes.uploadZone}>
                    <Typography variant={"h6"} className={classes.sliderTitle}>Upload image</Typography>
                    <DropzoneArea onChange={(files) => setFile(files)}/>
                </Box>
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

export default Challenges;