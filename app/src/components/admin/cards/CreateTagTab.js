import React, {useState} from 'react';
import {Fab, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Done} from "@material-ui/icons";
import {baseAxios} from "../../../Api";
import {useSnackbar} from "notistack";

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
}))

function CreateTagTab(props) {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()

    const [tagName, setTagName] = useState('')

    const handleTagCreate = (e) => {
        e.preventDefault()
        baseAxios.post('tags', {
            name: tagName
        }).then(res => {
            enqueueSnackbar("Tag successfully created", {variant: "success"})
            setTagName('')
        }).catch(reason => {
            enqueueSnackbar("Error while creating tag", {variant: "error"})
        })
    }

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Grid container item xs={12} md={5} component={"form"} onSubmit={handleTagCreate}>
                <Grid item className={classes.gridItem}>
                    <TextField
                        required
                        fullWidth
                        onChange={(event) => {
                            setTagName(event.target.value)
                        }}
                        value={tagName}
                        id="outlined-search"
                        label="Tag name"
                        variant="standard"/>
                </Grid>
                <Grid item container justify={"center"} xs={12} className={classes.gridItem}>
                    <Fab color={"primary"}
                         onSubmit={handleTagCreate}
                         className={classes.submitButton}
                         type={"submit"}
                         size={"large"}
                         variant={"round"}
                         disabled={tagName === ''}
                    >
                        <Done/>
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default CreateTagTab;