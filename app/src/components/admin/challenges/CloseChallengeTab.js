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
        marginTop: 30,
    },
    autocompleteBlock: {
        marginTop: 20,
    }
})

function CloseChallengeTab() {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()
    const challenges = useChallenges()
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    const [awards, setAwards] = useState({
        firstPlace: '',
        secondPlace: '',
        thirdPlace: ''
    })

    const handleAwardChange = (prop, value) => {
        setAwards({
            ...awards,
            [prop]: value,
        })
    }

    const handleSubmit = (e) => {
        console.log(awards)
        if (awards.firstPlace && awards.secondPlace && awards.thirdPlace && selectedChallenge) {
            baseAxios.delete("/challenges/" + selectedChallenge._id, {
                data: awards
            }).then(res => {
                enqueueSnackbar("Challenge successfully closed", {variant: "success"})
                console.log(res.data)
            }).catch(reason => {
                enqueueSnackbar("Error closing the challenge", {variant: "error"})
                console.log(reason.response.data)
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
                        <Typography variant={"h6"} className={classes.autocompleteTitle}>Select a challenge</Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            options={challenges}
                            onChange={((event, value) => {
                                setSelectedChallenge(value)
                                console.log(value)
                            })}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) =>
                                <TextField {...params} label="Select a challenge..." variant="outlined"/>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}
                      className={classes.autocompleteBlock}>
                    <Grid item>
                        <Typography variant={"h6"} className={classes.autocompleteTitle}>
                            Winner: {selectedChallenge ? selectedChallenge.expRewards.firstPlace : 0} points
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            disabled={!selectedChallenge}
                            options={selectedChallenge ? selectedChallenge.participants : []}
                            onChange={((_, value) => {
                                handleAwardChange("firstPlace", value)
                            })}
                            getOptionLabel={(option) => option}
                            renderInput={(params) =>
                                <TextField {...params} label="Select the winner..." variant="outlined"/>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}
                      className={classes.autocompleteBlock}>
                    <Grid item>
                        <Typography variant={"h6"} className={classes.autocompleteTitle}>
                            Second place: {selectedChallenge ? selectedChallenge.expRewards.secondPlace : 0} points
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            disabled={!selectedChallenge}
                            options={selectedChallenge ? selectedChallenge.participants : []}
                            onChange={((_, value) => {
                                handleAwardChange("secondPlace", value)
                            })}
                            getOptionLabel={(option) => option}
                            renderInput={(params) =>
                                <TextField {...params} label="Select 2° place..." variant="outlined"/>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} alignItems={"flex-start"}
                      className={classes.autocompleteBlock}>
                    <Grid item>
                        <Typography variant={"h6"} className={classes.autocompleteTitle}>
                            Third place: {selectedChallenge ? selectedChallenge.expRewards.thirdPlace : 0} points
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Autocomplete
                            disabled={!selectedChallenge}
                            options={selectedChallenge ? selectedChallenge.participants : []}
                            onChange={((_, value) => {
                                handleAwardChange("thirdPlace", value)
                            })}
                            getOptionLabel={(option) => option}
                            renderInput={(params) =>
                                <TextField {...params} label="Select 3° place..." variant="outlined"/>
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
            }).catch(reason => {
                console.log(reason.response.data)
                enqueueSnackbar("Cannot fetch challenges", {variant: "error"})
            })
        }, []);
        useEffect(() => {
            fetchChallenges()
        }, [fetchChallenges])

        return challenges
    }
}

export default CloseChallengeTab;