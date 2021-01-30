import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/core/styles";
import {baseAxios, socket} from "../../../Api";
import "../styles.css";

const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'username', headerName: 'Username', width: 130},
    {field: 'card', headerName: 'Training card', width: 160},
    {field: 'currentLocation', headerName: 'Current location', width: 160},
];

const useStyles = makeStyles((theme) => ({
    tableTitle: {
        fontWeight: 100,
        paddingBottom: 10
    },
    grid: {
        minHeight: "100vh",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 10
    },
    gridItem: {
        width: "100%",
        minHeight: 400,
    },
}))

function UsersTab(props) {
    const classes = useStyles()

    const executions = useExecutions()
    const executionIds = useRef(new Map())

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Typography variant={"h5"} className={classes.tableTitle}>User Activity</Typography>
            <Grid item xs={12} md={8} className={classes.gridItem}>
                <DataGrid rows={executions} columns={columns} pageSize={8}/>
            </Grid>
        </Grid>
    );

    function useExecutions() {
        const [executions, setExecutions] = useState([])

        const fetchExecutions = useCallback(() => {
            baseAxios.get("executions").then(res => {
                const executions = res.data
                const rows = executions.map((obj, index) => {
                    const username = obj.user.username
                    const card = obj.card.title
                    const location = obj.currentLocation ? obj.currentLocation.description : 'N/A'
                    return {
                        id: index,
                        username: username,
                        card: card,
                        currentLocation: location
                    }
                })
                setExecutions(rows)
            }).catch(reason => {
            })
        }, [])

        useEffect(() => {
            fetchExecutions()
        }, [fetchExecutions]) // eslint-disable-line react-hooks/exhaustive-deps

        const setSocketCallback = useCallback(() => {
            const executionUpdateHandler = (data) => {
                const username = data.username
                const card = data.card
                const currentLocation = data.currentLocation
                const updatedExecutions = executions.map(obj => {
                    if (obj.username === username) {
                        obj.card = card
                        obj.currentLocation = currentLocation
                    }
                    return obj
                })
                setExecutions(updatedExecutions)
            }

            const executionInsertHandler = (data) => {
                const username = data.username
                const card = data.card
                const currentLocation = data.currentLocation
                const lastId = executions[executions.length - 1] ? executions[executions.length - 1].id : 0
                const execution = {
                    id: lastId + 1,
                    username: username,
                    card: card,
                    currentLocation: currentLocation
                }

                executionIds.current.set(data.executionId, username)
                const newExecutions = executions.slice()
                newExecutions.push(execution)
                setExecutions(newExecutions)
            }

            const executionDeleteHandler = (data) => {
                const executionId = data.executionId
                const username = executionIds.current.get(executionId)
                const newExecutions = executions.filter(row => row.username !== username)
                setExecutions(newExecutions)
            }

            socket.on('executionUpdate', executionUpdateHandler)
            socket.on('executionInsert', executionInsertHandler)
            socket.on('executionDelete', executionDeleteHandler)

            return function unsubscribe() {
                socket.off('executionUpdate', executionUpdateHandler)
                socket.off('executionInsert', executionInsertHandler)
                socket.off('executionDelete', executionDeleteHandler)
            }
        }, [executions])

        useEffect(setSocketCallback, [setSocketCallback])
        return executions
    }
}

export default UsersTab;