import React, {useCallback, useEffect, useState} from 'react';
import {baseAxios} from "../../../Api";
import {Fab, Grid, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import {Delete} from "@material-ui/icons";
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
    grid: {
        minHeight: "100vh",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10
    },
}))

function DeleteCardTab(props) {
    const classes = useStyles()
    const {enqueueSnackbar} = useSnackbar()

    const users = useUsers()
    const [cards, fetchCards] = useCards()

    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)

    const handleCardDelete = (e) => {
        e.preventDefault()
        baseAxios.delete(`users/${selectedUser.username}/cards/${selectedCard._id}`).then((res) => {
            enqueueSnackbar("Card successfully deleted", {variant: "success"})
            setSelectedUser(null)
            setSelectedCard(null)
        }).catch((reason => {
            enqueueSnackbar("Error while deleting card", {variant: "error"})
        }))
    }

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Grid container item xs={12} md={5} component={"form"} onSubmit={handleCardDelete}>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Select a user</Typography>*/}
                    <Autocomplete
                        options={users}
                        onChange={((event, value) => {
                            setSelectedUser(value)
                            fetchCards(value.username)
                        })}
                        getOptionLabel={(option) => option.username}
                        renderInput={(params) =>
                            <TextField {...params} label="Select a username..." variant="standard"/>
                        }
                        value={selectedUser}
                    />
                </Grid>
                <Grid item className={classes.userSelector}>
                    {/*<Typography variant={"h6"} className={classes.title}>Select a user</Typography>*/}
                    <Autocomplete
                        options={cards}
                        onChange={((event, value) => {
                            setSelectedCard(value)
                        })}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) =>
                            <TextField {...params} label="Select a card..." variant="standard"/>
                        }
                        value={selectedCard}
                        disabled={selectedUser === null}
                    />
                </Grid>
                <Grid item container justify={"center"} xs={12} className={classes.gridItem}>
                    <Fab color={"primary"}
                         onSubmit={handleCardDelete}
                         className={classes.submitButton}
                         type={"submit"}
                         size={"large"}
                         variant={"round"}
                         disabled={selectedUser === null || selectedCard === null}
                    >
                        <Delete/>
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );

    function useUsers() {
        const [users, setUsers] = useState([])
        const fetchUsers = useCallback(() => {
            baseAxios.get("users").then(res => {
                const foundUsers = res.data.filter(obj => obj.role !== "trainer")
                setUsers(foundUsers)
            }).catch(reason => {
            })
        }, []);
        useEffect(() => {
            fetchUsers()
        }, [fetchUsers])

        return users
    }

    function useCards() {
        const [cards, setCards] = useState([])
        const fetchCards = useCallback((username) => {
            baseAxios.get(`users/${username}/cards`).then(res => {
                const foundCards = res.data
                setCards(foundCards)
            }).catch(reason => {
            })
        }, []);
        return [cards, fetchCards]
    }
}

export default DeleteCardTab;