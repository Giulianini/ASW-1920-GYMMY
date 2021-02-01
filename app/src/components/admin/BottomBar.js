import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {setAppbarTitle} from "../../redux/ducks/user/user";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {AirlineSeatReclineExtra, Dashboard, Person, Receipt, SportsHandball} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        position: "sticky",
        bottom: 0,
    }
}))

function BottomBar(props) {
    const [value, setValue] = useState("admin/dashboard")
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => {
        setValue(location.pathname.toString().split("/").slice(1, 3).join("/"))
    }, [location])
    
    return (
        <BottomNavigation
            className={classes.root}
            value={value}
            onChange={(e, newRoot) => {
                if (newRoot !== value) {
                    dispatch(setAppbarTitle(newRoot.toString().split("/")[1].capitalize()))
                    setValue(newRoot)
                    history.push(`/${newRoot}`)
                }
            }}
            showLabels
        >
            <BottomNavigationAction
                label={props.tabs.admin.routes.dashboard.name}
                value={props.tabs.admin.routes.dashboard.value}
                icon={<Dashboard/>}
            />
            <BottomNavigationAction
                label={props.tabs.admin.routes.goals.name}
                value={props.tabs.admin.routes.goals.value}
                icon={<Person/>}
            />
            <BottomNavigationAction
                label={props.tabs.admin.routes.cards.name}
                value={props.tabs.admin.routes.cards.value}
                icon={<Receipt/>}
            />
            <BottomNavigationAction
                label={props.tabs.admin.routes.activities.name}
                value={props.tabs.admin.routes.activities.value}
                icon={<SportsHandball/>}
            />
            <BottomNavigationAction
                label={props.tabs.admin.routes.locations.name}
                value={props.tabs.admin.routes.locations.value}
                icon={<AirlineSeatReclineExtra/>}
            />
        </BottomNavigation>
    );

}

export default BottomBar;