import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {setAppbarTitle} from "../../redux/ducks/user/user";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {Dashboard, People, Receipt, SportsHandball} from "@material-ui/icons";
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
            <BottomNavigationAction
                label={props.tabs.admin.routes.cards.name}
                value={props.tabs.admin.routes.cards.value}
                icon={<Receipt/>}
            />
            <BottomNavigationAction
                label={props.tabs.admin.routes.challenges.name}
                value={props.tabs.admin.routes.challenges.value}
                icon={<People/>}
            />
            <BottomNavigationAction
                label={props.tabs.admin.routes.courses.name}
                value={props.tabs.admin.routes.courses.value}
                icon={<SportsHandball/>}
            />
        </BottomNavigation>
    );

}

export default BottomBar;