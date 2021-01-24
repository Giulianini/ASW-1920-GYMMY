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

    const [rows, setRows] = useState([])

    const fetchLocations = useCallback(() => {
        capacitiesAxios.get("").then(res => {
            const locationsData = res.data
            console.log(locationsData)
            const rows = locationsData.map((obj, index) => {
                return {
                    id: index,
                    location: obj.location.description,
                    available: obj.capacity,
                    capacity: obj.location.defaultCapacity
                }
            })
            console.log(rows)
            setRows(rows)
        }).catch(reason => {
        })
    }, [])

    useEffect(() => {
        fetchLocations()
    }, [fetchLocations]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid container direction={"column"} justify={"flex-start"} alignItems={"center"} className={classes.grid}>
            <Typography variant={"h5"} className={classes.tableTitle}>Locations usage</Typography>
            <Grid item xs={12} md={8} className={classes.gridItem}>
                <DataGrid rows={rows} columns={columns} pageSize={8} autoHeight/>
            </Grid>
        </Grid>
    );
}

export default LocationsTab;