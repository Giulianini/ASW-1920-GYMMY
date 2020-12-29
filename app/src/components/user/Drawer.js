import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader, makeStyles,
    SwipeableDrawer, Switch as SwitchUI
} from "@material-ui/core";
import {Brightness3, PowerSettingsNew} from "@material-ui/icons";

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

function Drawer(props) {
    const classes = useStyles()

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
                <ListItem button divider={true}>
                    <ListItemIcon>
                        <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="Logout" />
                </ListItem>
            </List>
        </SwipeableDrawer>
    );
}
export default Drawer;