import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Divider, Grid, LinearProgress, List, ListItem, Typography,} from "@material-ui/core";
import EditPersonalDialog from "../personal/EditPersonalDialog";
import SpeedIcon from '@material-ui/icons/Speed';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Course from "./Course";
import Challenge from "./Challenge";
import CustomStepper from "./CustomStepper"
import {baseAxios, userAxios} from "../../../Api";

const useStyles = makeStyles(theme => ({
    rootGrid: {
        [theme.breakpoints.up('md')]: {
            minHeight: "100vh",
        }
    },
    divider: {
        width: '100%'
    },
    centered: {
        margin: "auto"
    },
    vSpace: {
        paddingTop: 5,
        paddingBottom: 5,
        margin: 'auto'
    },
    score: {
        fontWeight: 300,
        letterSpacing: 1.5,
        color: theme.palette.primary.main,
        margin: "auto"
    },
    otherText: {
        fontSize: 23,
        fontWeight: "lighter"
    },
    scrollablePane: {
        maxHeight: 450,
        overflow: 'auto'
    },
    icons: {
        marginLeft: 4,
        marginRight: 4,
        fontSize: '310%'
    }
}));

function Dashboard() {
    const classes = useStyles();
    const dialogRef = useRef({})
    const [userInfo, setUserInfo] = React.useState({
        "username": "",
        "experiencePoints": ""
    })
    const [challengeInfo, setChallengeInfo] = React.useState([])
    const [courseInfo, setCourseInfo] = React.useState([])

    useEffect(() => {
        fetchUser()
        fetchCourses()
        fetchChallenges()
    }, [])

    function fetchUser() {
        let username = localStorage.getItem("username")
        userAxios.get("statistics").then(res => {
            setUserInfo({...res.data})
            console.log(userInfo.experiencePoints)
        }).catch(reason => {
            console.log(reason)
        })
    }

    function fetchCourses() {
        baseAxios.get("courses").then(res => {
            setCourseInfo(res.data)
        }).catch(() => {
        })
    }

    function fetchChallenges() {
        baseAxios.get("challenges").then(res => {
            setChallengeInfo(res.data)
        }).catch(() => {
        })
    }

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
                                <Typography variant={"h4"} className={classes.score}>
                                    {userInfo.experiencePoints}/3000 pts
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
                            <CustomStepper/>
                        </div>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Challenges
                        </Typography>
                    </Grid>

                    <Grid item container direction={"column"} alignItems={"center"} justify={"flex-start"}
                          className={classes.scrollablePane}>
                        {challengeInfo.map((item, i) => <Challenge key={i} item={item}/>)}
                    </Grid>

                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Courses
                        </Typography>
                    </Grid>

                    <Grid item container direction={"column"} alignItems={"center"} justify={"flex-start"}
                          className={classes.scrollablePane}>
                        {courseInfo.map((item, i) => <Course key={i} item={item}/>)}
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;