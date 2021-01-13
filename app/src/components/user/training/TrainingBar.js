import React from 'react';
import {
    AppBar,
    Button,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Popover,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ExpandMore, Grade, Receipt} from "@material-ui/icons";

const useStyles = makeStyles({
    headerBar: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        marginBottom: 5,
    },
    timeGrid: {
        marginTop: 20,
    },
    root: {
        margin: 0,
        padding: 0,
    },
    titleText: {
        paddingLeft: 10,
        fontWeight: 100,
        fontSize: 30,
    },
    timerText: {
        fontWeight: 100,
        fontSize: 25,
    },
    chips: {
        marginRight: 5,
        marginBottom: 5,
    },
    playButton: {
        borderRadius: 5,
    },
})


function TrainingBar(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const percentage = (props.passedTime / 80).toFixed(1) * 100


    const handleListItemClick = (event, index) => {
        props.setSelectedCardIndex(index);
    };

    const handleExpandCardClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar
            color={"primary"}
            position={"sticky"}
        >
            <Grid container direction={"column"} className={classes.root}>
                <Grid container item className={classes.headerBar}>
                    <Grid item container direction={"row"} justify={"space-between"} alignItems={"center"}>
                        <Grid item>
                            <Typography
                                className={classes.titleText}> {props.cards && props.cards[props.selectedCardIndex].title}</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleExpandCardClick}>
                                <ExpandMore/>
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
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
                                      className={classes.list}>
                                    {props.cards && props.cards.map((card, i) => (
                                        <ListItem button
                                                  key={`cardListItem:${i}`}
                                                  divider={true}
                                                  selected={props.selectedCardIndex === i}
                                                  onClick={(event) => handleListItemClick(event, i)}
                                        >
                                            <ListItemIcon>
                                                <Receipt/>
                                            </ListItemIcon>
                                            <ListItemText id="signup" primary={card.title}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </Popover>
                        </Grid>
                    </Grid>
                    <Grid container item direction={"row"} justify={"flex-start"} alignItems={"center"} wrap={"wrap"}>
                        {props.cards && props.cards[props.selectedCardIndex].tags.map(chip => {
                            return (
                                <Grid key={chip.name} item>
                                    <Chip
                                        className={classes.chips}
                                        icon={<Grade/>}
                                        label={chip.name}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item className={classes.timeGrid} container direction={"row"} justify={"space-between"}
                          alignItems={"center"}>
                        <Grid item>
                            <Typography className={classes.timerText}>
                                Time: {props.passedTime}'
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant={"outlined"} className={classes.playButton}>Start</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item>
                    <Grid item xs={12}>
                        <LinearProgress variant="buffer" value={percentage} valueBuffer={percentage} color="secondary"/>
                    </Grid>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default TrainingBar;

