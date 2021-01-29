import React from 'react';
import {Fab, Grid, Slider, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
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

function Locations() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [values, setValues] = React.useState({
        description: '',
        defaultCapacity: 0,
    })

    const handleChange = (prop, value) => {
        setValues({
            ...values,
            [prop]: value,
        })
    }

    const resetForm = () => {
        setValues({
            defaultCapacity: 0,
            description: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.description && values.defaultCapacity) {
            baseAxios.post("/locations", values).then(() => {
                enqueueSnackbar("Location successfully added", {variant: "success"})
                resetForm()
            }).catch((reason => {
                console.log(reason.response.data)
                enqueueSnackbar("Error adding the location", {variant: "error"})
            }))
        } else {
            enqueueSnackbar("Some field are empty", {variant: "warning"})
        }
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item>
                <Typography variant={"h5"} className={classes.title}>
                    Insert location
                </Typography>
            </Grid>
            <Grid item container xs={10} md={5} direction={"column"}>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            handleChange("description", event.target.value)
                        }}
                        value={values.description}
                        id="outlined-search"
                        label="Location name"
                        variant="standard"/>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}>
                    <Grid item>
                        <Typography className={classes.sliderTitle}>Default capacity</Typography>
                    </Grid>
                    <Grid container item alignItems={"center"}>
                        <Grid item xs={11} className={classes.gridItem}>
                            <Slider
                                defaultValue={30}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={100}
                                value={values.secondPlaceReward}
                                onChange={(event, value) => {
                                    handleChange("defaultCapacity", value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} className={classes.gridItem}>
                            <Typography className={classes.sliderText}>{values.defaultCapacity}</Typography>
                        </Grid>
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
                    <Add/>
                </Fab>
            </Grid>
        </Grid>
    );
}

export default Locations;