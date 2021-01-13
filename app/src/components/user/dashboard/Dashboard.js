import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {authAxios} from "../../../Api";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    Chip,
    Container,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    Typography,
    Stepper,
    Step,
    StepLabel
} from "@material-ui/core";
import EditPersonalDialog from "../personal/EditPersonalDialog";
import SpeedIcon from '@material-ui/icons/Speed';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import GradeIcon from '@material-ui/icons/Grade';
import SettingsIcon from '@material-ui/icons/Settings';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ExerciseCard from "../training/ExerciseCard";
import Course from "./Course";
import Challenge from "./Challenge";

const useStyles = makeStyles(theme => ({
    rootGrid: {
        [theme.breakpoints.up('md')]: {
            paddingTop: "10%",
            minHeight: "100vh",
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 10,
        },
    },
    divider: {
        width: '100%'
    },
    control: {
        padding: theme.spacing(3)
    },
    centered: {
        margin: "auto"
    },
    vSpace: {
        paddingTop: 5,
        paddingBottom: 5,
        margin: 'auto'
    },
    hSpace: {
        marginLeft: 5,
        marginRight: 5
    },
    chips: {
        marginLeft: 7,
        marginRight: 7,
        fontSize: '120%'
    },
    mediaPersonal: {
        paddingTop: '50%', // 16:9
        margin: 'auto'
    },
    card: {
        marginBottom: 10,
        maxWidth: theme.breakpoints.values.md
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.md / 2
    },
    score: {
        fontSize: 30,
        fontWeight: "normal",
        letterSpacing: 1.5,
        color: "#e13333",
        margin: "auto"
    },
    otherText: {
        fontSize: 23,
        fontWeight: "lighter"
    },
    scrollablePane: {
        maxHeight: 300,
        width: '100%',
        overflow: 'auto'
    },
    icons: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: '300%'
    }
}));

const courses = [{
    "title": "Functional training",
    "desc":  "Enroll in the functional training class. All needed equipment is provided upon subscription.",
    "image": "/functional.jpg",
}, {
    "title": "Zumba",
    "desc": "Enroll in the zumba class. All needed equipment is provided upon subscription.",
    "image": "/zumba.jpg",
}, {
    "title": "Pilates",
    "desc": "Enroll in the pilates class. All needed equipment is provided upon subscription.",
    "image": "/pilates.jpg",
},]

const challenges = [{
    "title": "Push-Up",
    "desc": "Complete as many push-ups as you can and climb the leaderboard!",
    "image": "/pushUp.jpg",
}, {
    "title": "Pull-Up",
    "desc": "Complete as many pull-ups as you can and climb the leaderboard!",
    "image": "/pullUp.jpg",
}, {
    "title": "Bench press",
    "desc": "Complete as many bench press reps as you can and climb the leaderboard!",
    "image": "/benchPress.jpg",
}]

const levels = [
    "Beginner", "Intermediate", "Advanced"
]

const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
};

function Dashboard() {
    const classes = useStyles();
    const dialogRef = useRef({})
    const [userInfo, setUserInfo] = React.useState({
        "username": undefined,
        "score": undefined
    })

    useEffect(() => {
        let username = localStorage.getItem("username")
        authAxios.get(`/users/${username}`).then(res => {
            setUserInfo({...res.data})
        }).catch(reason => {
            console.log(reason)
        })
    }, [])

    return (
        <Container maxWidth={"lg"}>
            <EditPersonalDialog ref={dialogRef} userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Grid container direction={"column"} alignItems="center" className={classes.rootGrid}>
                <Grid item container direction={"column"}>
                    <Grid item>
                        <List component="nav" aria-label="icons-list">
                            <ListItem>
                                <div className={classes.centered}>
                                    <SpeedIcon className={classes.icons}/>
                                    <BarChartIcon className={classes.icons}/>
                                    <AccountBalanceIcon className={classes.icons}/>
                                    <GpsFixedIcon className={classes.icons}/>
                                    <BeenhereIcon className={classes.icons}/>
                                    <EmojiEventsIcon className={classes.icons}/>
                                </div>
                            </ListItem>
                            <Divider className={classes.divider}/>
                            <ListItem>
                                <Typography className={classes.score}>
                                    {userInfo.score}/3000
                                </Typography>
                            </ListItem>
                            <Divider className={classes.divider}/>
                        </List>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <LinearProgress variant="buffer" value={10} valueBuffer={30} color="primary"/>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <div className={classes.centered}>
                            <Stepper>
                                {levels.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Challenges
                        </Typography>
                    </Grid>

                    <Grid item container className={classes.scrollablePane}>
                        {challenges.map((item, i) => <Challenge key={i} item={item}/>)}
                    </Grid>

                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Courses
                        </Typography>
                    </Grid>

                    <Grid item container className={classes.scrollablePane}>
                        {courses.map((item, i) => <Course key={i} item={item}/>)}
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;