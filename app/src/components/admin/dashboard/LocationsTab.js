import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/core/styles";
import {socket, capacitiesAxios} from "../../../Api";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'location', headerName: 'Location', width: 130},
    { field: 'available', headerName: 'Available', width: 130, type: 'number'},
    { field: 'capacity', headerName: 'Capacity', width: 130, type: 'number'},
]

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

function LocationsTab(props) {
    const classes = useStyles()

    const locations = useLocations()

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Typography variant={"h5"} className={classes.tableTitle}>Locations usage</Typography>
            <Grid item xs={12} md={8} className={classes.gridItem}>
                <DataGrid rows={locations} columns={columns} pageSize={8} autoHeight/>
            </Grid>
        </Grid>
    );

    function useLocations() {
        const [locations, setLocations] = useState([])

        const fetchLocations = useCallback(() => {
            capacitiesAxios.get("").then(res => {
                const locationsData = res.data
                const rows = locationsData.map((obj, index) => {
                    return {
                        id: index,
                        location: obj.location.description,
                        available: obj.capacity,
                        capacity: obj.location.defaultCapacity
                    }
                })
                console.log(rows)
                setLocations(rows)
            }).catch(reason => {
            })
        }, [])

        useEffect(() => {
            fetchLocations()
        }, [fetchLocations]) // eslint-disable-line react-hooks/exhaustive-deps

        const setSocketCallback = useCallback(() => {
            const capacitiesHandler = (data) => {
                const location = data.location
                const capacity = data.capacity
                const updatedLocations = locations.map(obj => {
                    if (obj.location === location) {
                        obj.available = capacity
                        console.log(obj)
                    }
                    return obj
                })
                setLocations(updatedLocations)
            }
            socket.on('capacityUpdate', capacitiesHandler)
            return function unsubscribe() {
                socket.off('capacityUpdate', capacitiesHandler)
            }
        }, [locations])

        useEffect(setSocketCallback, [setSocketCallback])
        return locations
    }
}

export default LocationsTab;