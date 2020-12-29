import React, {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {Dashboard, BarChart, Receipt, Person} from '@material-ui/icons'
import {useHistory, useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

function BottomBar(props) {
    const [value, setValue] = useState("dashboard")
    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        setValue(location.pathname.toString().split("/")[1])
    }, [location])

    function handleChange(newValue) {
        setValue(newValue)
        history.push(`/${newValue}`)
    }

    return (
        <BottomNavigation
            className={classes.root}
            value={value}
            onChange={(e, newValue) => handleChange(newValue)}
            showLabels
        >
            <BottomNavigationAction label={props.tabs.dashboard.name} value={props.tabs.dashboard.value} icon={<Dashboard/>}/>
            <BottomNavigationAction label={props.tabs.personal.name} value={props.tabs.personal.value} icon={<Person/>}/>
            <BottomNavigationAction label={props.tabs.statistics.name} value={props.tabs.statistics.value} icon={<BarChart/>}/>
            <BottomNavigationAction label={props.tabs.training.name} value={props.tabs.training.value} icon={<Receipt/>}/>
        </BottomNavigation>
    );
}

const useStyles = makeStyles({
    root: {
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
    }
})


export default BottomBar;