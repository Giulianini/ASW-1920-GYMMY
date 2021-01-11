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
    Typography
} from "@material-ui/core";
import EditPersonalDialog from "../personal/EditPersonalDialog";
import SpeedIcon from '@material-ui/icons/Speed';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import GradeIcon from '@material-ui/icons/Grade';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
    rootGrid: {
        [theme.breakpoints.up('md')]: {
            height: "95vh"
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 20,
            marginBottom: 100
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
        paddingTop: '40%' // 16:9
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

function Dashboard() {
    const classes = useStyles();
    const dialogRef = useRef({})
    const [progress, setProgress] = React.useState(50);
    const [course, setEnrolled] = React.useState(false);
    const [challenge, acceptChallenge] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        "username": undefined,
        "score": undefined
    })

    const handleEnrollClick = () => {
        //setEnrolled(!course);
    };

    const handleChallengeAcceptedClock = () => {
        //acceptChallenge(!challenge);
    }

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
            <Grid container direction={"column"}
                  spacing={2} // spacing largo spacca tutto Cardio
                  className={classes.rootGrid}>
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
                            <Chip
                                className={classes.chips}
                                icon={<GradeIcon/>}
                                label="Beginner"
                                color="primary"
                            />
                            <Chip
                                className={classes.chips}
                                icon={<GradeIcon/>}
                                label="Intermediate"
                                color="primary"
                            />
                            <Chip
                                className={classes.chips}
                                icon={<GradeIcon/>}
                                label="Advanced"
                                color="primary"
                            />
                        </div>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Challenges
                        </Typography>
                    </Grid>

                    <Grid item container direction={"row"} alignItems={"stretch"} className={classes.scrollablePane}>
                        <Grid item className={classes.vSpace}>
                            <Card className={classes.cardWidth}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.mediaPersonal}
                                        image="/pushUp.jpg"
                                        title="Push up"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Push-up challenge
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Complete as many push-ups as you can and climb the leaderboard!
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleChallengeAcceptedClock}>
                                        Accept challenge
                                    </Button>
                                    <Button size="small" color="primary">
                                        100 points
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item className={classes.vSpace}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.mediaPersonal}
                                        image="/benchPress.jpg"
                                        title="Bench press"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Bench press challenge
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Complete as many bench press reps as you can and climb the leaderboard!
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Accept challenge
                                    </Button>
                                    <Button size="small" color="primary" onClick={handleChallengeAcceptedClock}>
                                        200 points
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item className={classes.vSpace}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.mediaPersonal}
                                        image="/pullUp.jpg"
                                        title="Pull up"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Pull-up challenge
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Complete as many pull-ups as you can and climb the leaderboard!
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleEnrollClick}>
                                        Accept challenge
                                    </Button>
                                    <Button size="small" color="primary" onClick={handleChallengeAcceptedClock}>
                                        150 points
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Courses
                        </Typography>
                    </Grid>

                    <Grid item container direction={"row"} className={classes.scrollablePane}>
                        <Grid item className={classes.vSpace}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.mediaPersonal}
                                        image="/functional.jpg"
                                        title="Functional"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Functional
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Enroll in the functional training class. All needed equipment is provided
                                            upon subscription.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleEnrollClick}>
                                        Enroll
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item className={classes.vSpace}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.mediaPersonal}
                                        image="/zumba.jpg"
                                        title="Zumba"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Zumba
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Enroll in the zumba class. All needed equipment is provided
                                            upon subscription.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleEnrollClick}>
                                        Enroll
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item className={classes.vSpace}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.mediaPersonal}
                                        image="/pilates.jpg"
                                        title="Pilates"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Pilates
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Enroll in the pilates class. All needed equipment is provided
                                            upon subscription.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Enroll
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dashboard;