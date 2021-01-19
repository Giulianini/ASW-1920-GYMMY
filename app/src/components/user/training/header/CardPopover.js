import React from 'react';
import {List, ListItem, ListItemIcon, ListItemText, ListSubheader, Popover} from "@material-ui/core";
import {Receipt} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    popover: {
        minWidth: 200,
        borderRadius: 30,
    }
})

function CardPopover(props) {
    const classes = useStyles()
    const open = Boolean(props.anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleListItemClick = (event, index) => {
        props.setSelectedCardIndex(index)
    };
    return (
        <Popover
            className={classes.popover}
            id={id}
            open={open}
            anchorEl={props.anchorEl}
            onClose={props.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <List component={"nav"} subheader={<ListSubheader>Workout cards</ListSubheader>}
                  className={classes.popover}>
                {props.cards && props.cards.map((card, i) => (
                    <ListItem button
                              key={`cardListItem:${i}`}
                              divider={false}
                              selected={props.selectedCardIndex === i}
                              onClick={(event) => handleListItemClick(event, i)}
                    >
                        <ListItemIcon>
                            <Receipt/>
                        </ListItemIcon>
                        <ListItemText id={`cardListItemText:${i}`} primary={card.title}
                                      secondary={`${props.cards[i].minutes} min`}/>
                    </ListItem>
                ))}
            </List>
        </Popover>
    );
}

export default CardPopover;