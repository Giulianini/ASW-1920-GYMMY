import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {setAppbarTitle} from "../../redux/ducks/user/user";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {Dashboard} from "@material-ui/icons";
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

    // const hideTrainingAppbar = (route) => {
    //     route === props.tabs.training.value ? dispatch(setAppbarHidden(true)) : dispatch(setAppbarHidden(false))
    // }

    return (
        <BottomNavigation
            className={classes.root}
            value={value}
            onChange={(e, newRoot) => {
                if (newRoot !== value) {
                    dispatch(setAppbarTitle(newRoot.toString().split("/")[1].capitalize()))
                    // hideTrainingAppbar(newRoot)
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
        </BottomNavigation>
    );

}

export default BottomBar;