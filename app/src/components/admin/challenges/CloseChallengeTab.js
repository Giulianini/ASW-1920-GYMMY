import React, {useCallback, useEffect, useState} from 'react';
import {Fab, Grid, TextField, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios} from "../../../Api";
import {Done} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";

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
        marginTop: 20,
    }
})

function CloseChallengeTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const challenges = useChallenges()
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)

    const resetForm = () => {
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"} component={"form"}
              onSubmit={handleSubmit} className={classes.form}>
            <Grid item container xs={10} md={5} direction={"column"}>
                <Grid item container direction={"column"} alignItems={"center"}>
                    <Grid item>
                        <Typography variant={"h5"} className={classes.autocompleteTitle}>Select a challenge</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            options={challenges}
                            onChange={((event, value) => {
                                setSelectedChallenge(value)
                            })}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) =>
                                <TextField {...params} label="Select a challenge..." variant="outlined"/>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"center"}>
                    <Grid item>
                        <Typography variant={"h5"} className={classes.autocompleteTitle}>Select a
                            participant</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            disabled={!selectedChallenge}
                            options={selectedChallenge && selectedChallenge.participants}
                            onChange={((event, value) => {
                                setSelectedUser(value)
                            })}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) =>
                                <TextField {...params} label="Select a challenge..." variant="outlined"/>
                            }
                        />
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

    function useChallenges() {
        const [challenges, setChallenges] = useState([])
        const fetchChallenges = useCallback(() => {
            baseAxios.get("challenges").then(res => {
                setChallenges(res.data)
                console.log(res.data)
            }).catch(reason => {
            })
        }, []);
        useEffect(() => {
            fetchChallenges()
        }, [fetchChallenges])

        return challenges
    }
}

export default CloseChallengeTab;