import React, {useEffect} from 'react';
import {Fab, Grid, Popover, Slider, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios} from "../../../Api";
import {Done, Info} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
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
    gridBlock: {
        marginTop: 20
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
    const createLocationNotification = "Here you can create a location 📌"
    const {enqueueSnackbar} = useSnackbar()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [values, setValues] = React.useState({
        description: '',
        defaultCapacity: 0,
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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

    useEffect(() => {
        enqueueSnackbar(createLocationNotification, {variant: "info"})
    }, [enqueueSnackbar])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.defaultCapacity) {
            baseAxios.post("/locations", values).then(() => {
                enqueueSnackbar("Location successfully added", {variant: "success"})
                resetForm()
            }).catch((reason => {
                if (reason.response.status === 409) {
                    enqueueSnackbar("Location already present", {variant: "error"})
                } else {
                    enqueueSnackbar("Error adding the location", {variant: "error"})
                }
            }))
        } else {
            enqueueSnackbar("Capacity cannot be zero", {variant: "warning"})
        }
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item>
                <Typography variant={"h5"} className={classes.title}>
                    Insert location
                    <IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                        <Info/>
                    </IconButton>
                </Typography>
            </Grid>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    A location is considered as a place, a room or a machine where a single or more users can train.
                    Example of location are: Chest-Press machine, Stretching Area and Body-Weight Room.
                </Typography>
            </Popover>
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
                <Grid item container direction={"column"} alignItems={"flex-start"} className={classes.gridBlock}>
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
                                max={20}
                                value={values.defaultCapacity}
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
                    <Done/>
                </Fab>
            </Grid>
        </Grid>
    );
}

export default Locations;