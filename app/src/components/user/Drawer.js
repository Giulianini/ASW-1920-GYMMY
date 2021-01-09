import React from 'react';
import {Brightness3, Lock, LockOpen, PersonAdd} from "@material-ui/icons";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader, makeStyles,
    SwipeableDrawer, Switch as SwitchUI
} from "@material-ui/core";
import routes from "../Routes";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

function Drawer(props) {
    const classes = useStyles()
    const history = useHistory()

    return (
        <SwipeableDrawer
            anchor={'left'}
            open={props.drawerIsOpen}
            onClose={() => {props.toggleDrawer(false)}}
            onOpen={() => {props.toggleDrawer(true)}}
        >
            <List component={"nav"} subheader={<ListSubheader>Settings</ListSubheader>} className={classes.list}>
                <ListItem divider={true} alignItems={"center"}>
                    <ListItemIcon>
                        <Brightness3 />
                    </ListItemIcon>
                    <ListItemText id="switch-dark-mode" primary="Dark Mode" />
                    <ListItemSecondaryAction>
                        <SwitchUI
                            edge="end"
                            onChange={() => props.setLocalDarkMode(! props.localDarkMode)}
                            checked={props.localDarkMode}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button divider={true} onClick={() => history.push(`/${routes.signup.value}`)}>
                    <ListItemIcon>
                        <PersonAdd />
                    </ListItemIcon>
                    <ListItemText id="signup" primary="Signup"/>
                </ListItem>
                <ListItem button divider={true} onClick={() => history.push(`/${routes.login.value}`)}>
                    <ListItemIcon>
                        <LockOpen />
                    </ListItemIcon>
                    <ListItemText id="login" primary="Login" />
                </ListItem>
                <ListItem button divider={true}>
                    <ListItemIcon>
                        <Lock />
                    </ListItemIcon>
                    <ListItemText id="logout" primary="Logout" />
                </ListItem>
            </List>
        </SwipeableDrawer>
    );
}
export default Drawer;