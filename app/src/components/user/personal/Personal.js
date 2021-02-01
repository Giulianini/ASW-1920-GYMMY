import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Container, Grid, Tooltip} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {userAxios} from "../../../Api";
import EditPersonalDialog from "./EditPersonalDialog";
import {useSnackbar} from "notistack";

const useStyles = makeStyles(theme => ({
    rootGrid: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: "10%",
            minHeight: "100vh",
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20,
        },
    },
    card: {
        marginBottom: 10,
        maxWidth: theme.breakpoints.values.md,
    },
    titleCard: {
        fontWeight: 300,
    },
    mediaPersonal: {
        width: '30%',
        paddingTop: '50%', // 16:9
        margin: 'auto'
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.md / 2
    },
    mediaTarget: {
        width: '40%',
        paddingTop: '50%', // 16:9
        margin: 'auto'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function Personal() {
    const classes = useStyles();
    const dialogRef = useRef({})
    const {enqueueSnackbar} = useSnackbar()
    const [expanded, setExpanded] = React.useState({
        "personal": false,
        "objectives": false,
    })
    const [userInfo, setUserInfo] = React.useState({
        "username": "",
        "age": "",
        "height": "",
        "weight": "",
        "mainGoal": "",
        "targetWeight": "",
        "targetBMI": "",
        "targetCalories": "",
        "targetMinWorkouts": ""
    })

    const handleExpandClick = (value) => {
        setExpanded({...expanded, [value]: !expanded[value]});
    }

    useEffect(() => {
        fetchPersonalData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function fetchPersonalData() {
        userAxios.get("").then(res => {
            setUserInfo({...res.data})
        }).catch(() => {
            enqueueSnackbar("Cannot retrieve user information.", {variant: "error"})
        })
    }

    return (
        <Container>
            <EditPersonalDialog ref={dialogRef} userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Grid container direction={"row"} justify="space-around" alignItems="center"
                  className={classes.rootGrid}>
                <Grid item xs={11} md={5}>
                    <Card className={classes.card}>
                        <CardHeader
                            action={
                                <Tooltip title={"Edit information"}>
                                    <IconButton
                                        onClick={() => dialogRef.current.handleClickOpen()}
                                        type={"button"}
                                        aria-label="modify">
                                        <CreateIcon/>
                                    </IconButton>
                                </Tooltip>
                            }
                            className={classes.titleCard}
                            title={
                                <Typography variant={"h5"} className={classes.titleCard}>
                                    Information
                                </Typography>
                            }
                            subheader="Your Personal information"
                        />
                        <CardMedia
                            className={classes.mediaPersonal}
                            image="/personRunning.png"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Expand to see and verify all your personal information.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Tooltip title={"Expand"}>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded.personal,
                                    })}
                                    onClick={() => handleExpandClick("personal")}
                                    aria-expanded={expanded.personal}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                        <Collapse in={expanded.personal} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Username: {userInfo.username}</Typography>
                                <Typography paragraph>Age: {userInfo.age}</Typography>
                                <Typography paragraph>Height: {userInfo.height} cm</Typography>
                                <Typography paragraph>Weight: {userInfo.weight} kg</Typography>
                            </CardContent>
                        </Collapse>
                        <div className={classes.pushCardSize}/>
                    </Card>
                </Grid>

                <Grid item xs={11} md={5}>
                    <Card className={classes.card}>
                        <CardHeader
                            action={
                                <Tooltip title={"More info"}>
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant={"h5"} className={classes.titleCard}>
                                    {userInfo.mainGoal}
                                </Typography>
                            }
                            subheader="Your personal goal"
                        />
                        <CardMedia
                            className={classes.mediaTarget}
                            image="/fire.png"
                            title="fire"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Expand to see the goals assigned by your personal trainer.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Tooltip title={"Expand"}>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded.objectives,
                                    })}
                                    onClick={() => handleExpandClick("objectives")}
                                    aria-expanded={expanded.objectives}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon/>
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                        <Collapse in={expanded.objectives} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Target weight: {userInfo.targetWeight}</Typography>
                                <Typography paragraph>Target body fat: {userInfo.targetBMI}</Typography>
                                <Typography paragraph>Target calories: {userInfo.targetCalories}</Typography>
                                <Typography paragraph>Weekly workout rate: {userInfo.targetMinWorkouts}</Typography>
                            </CardContent>
                        </Collapse>
                        <div className={classes.pushCardSize}/>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Personal;