import React from 'react';
import {Brightness3, Lock, LockOpen, PersonAdd} from "@material-ui/icons";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    SwipeableDrawer,
    Switch as SwitchUI
} from "@material-ui/core";
import routes from "../Routes";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "../../redux/ducks/user/user";

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

function Drawer(props) {
    const classes = useStyles()
    const history = useHistory()
    const darkMode = useSelector(state => state.userRedux.darkMode)
    const dispatch = useDispatch()

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={props.drawerIsOpen}
            onClose={() => {
                props.setDrawerIsOpen(false)
            }}
            onOpen={() => {
                props.setDrawerIsOpen(true)
            }}
        >
            <List component={"nav"} subheader={<ListSubheader>Settings</ListSubheader>} className={classes.list}>
                <ListItem divider={true} alignItems={"center"}>
                    <ListItemIcon>
                        <Brightness3/>
                    </ListItemIcon>
                    <ListItemText id="switch-dark-mode" primary="Dark Mode"/>
                    <ListItemSecondaryAction>
                        <SwitchUI
                            edge="end"
                            onChange={() => dispatch(setDarkMode(!darkMode))}
                            checked={darkMode}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button divider={true} onClick={() => history.push(`/${routes.signup.value}`)}>
                    <ListItemIcon>
                        <PersonAdd/>
                    </ListItemIcon>
                    <ListItemText id="signup" primary="Signup"/>
                </ListItem>
                <ListItem button divider={true} onClick={() => history.push(`/${routes.login.value}`)}>
                    <ListItemIcon>
                        <LockOpen/>
                    </ListItemIcon>
                    <ListItemText id="login" primary="Login"/>
                </ListItem>
                <ListItem button divider={true}>
                    <ListItemIcon>
                        <Lock/>
                    </ListItemIcon>
                    <ListItemText id="logout" primary="Logout" onClick={() => {
                        localStorage.clear()
                        dispatch(setDarkMode(false))
                        history.push(`/${routes.login.value}`)
                    }}/>
                </ListItem>
            </List>
        </SwipeableDrawer>
    );
}

export default Drawer;