import React, {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {BarChart, Dashboard, Person, Receipt} from '@material-ui/icons'
import {useHistory, useLocation} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch} from "react-redux";
import {setAppbarHidden, setAppbarTitle} from "../../redux/ducks/user/user";

function BottomBar(props) {
    const [value, setValue] = useState("user/dashboard")
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        setValue(location.pathname.toString().split("/").slice(1, 3).join("/"))
    }, [location])

    const hideTrainingAppbar = (route) => {
        route === props.tabs.training.value ? dispatch(setAppbarHidden(true)) : dispatch(setAppbarHidden(false))
    }

    return (
        <BottomNavigation
            className={classes.root}
            value={value}
            onChange={(e, newRoot) => {
                if (newRoot !== value) {
                    dispatch(setAppbarTitle(newRoot.toString().split("/")[1].capitalize()))
                    hideTrainingAppbar(newRoot)
                    setValue(newRoot)
                    history.push(`/${newRoot}`)
                }
            }}
            showLabels
        >
            <BottomNavigationAction label={props.tabs.dashboard.name} value={props.tabs.dashboard.value}
                                    icon={<Dashboard/>}/>
            <BottomNavigationAction label={props.tabs.personal.name} value={props.tabs.personal.value}
                                    icon={<Person/>}/>
            <BottomNavigationAction label={props.tabs.statistics.name} value={props.tabs.statistics.value}
                                    icon={<BarChart/>}/>
            <BottomNavigationAction label={props.tabs.training.name} value={props.tabs.training.value}
                                    icon={<Receipt/>}/>
        </BottomNavigation>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        position: "sticky",
        bottom: 0,
    }
}))

export default BottomBar;