import React, {useState} from 'react';
import {Box, Fab, Grid, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {DropzoneArea} from "material-ui-dropzone";
import {baseAxios} from "../../../../Api";
import {Done} from "@material-ui/icons";

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

function CreateCourseTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const [values, setValues] = React.useState({
        title: '',
        description: '',
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
        })
        setFile([])
    }

    const canSubmit = () => {
        return values.description && values.title && file[0]
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (canSubmit()) {
            baseAxios.post("/courses", values).then((res) => {
                const challengeId = res.data._id
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
                let fd = new FormData()
                fd.append("image", file[0])
                baseAxios.put(`/courses/${challengeId}/image`, fd, config).then(() => {
                    enqueueSnackbar("Course successfully added", {variant: "success"})
                    resetForm()
                }).catch((reason => {
                    console.log(reason.response.data)
                    enqueueSnackbar("Error adding the course image", {variant: "error"})
                }))
            }).catch((reason) => {
                console.log(reason.response.data)
                if (reason.response.status === 409) {
                    enqueueSnackbar("Course already present", {variant: "error"})
                } else {
                    enqueueSnackbar("Error adding the course", {variant: "error"})
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
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            handleChange("title", event.target.value)
                        }}
                        value={values.mainGoal}
                        label="Course title"
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
                        label="Course description"
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
}

export default CreateCourseTab;