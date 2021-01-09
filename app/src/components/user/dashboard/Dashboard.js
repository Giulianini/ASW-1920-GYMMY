import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {authAxios} from "../../../Api";
import {
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    LinearProgress,
    Typography,
    Chip,
    Card,
    CardActionArea, CardActions, Button
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
            height: "95vh",
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 20,
            marginBottom: 100,
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
        paddingBottom: 5
    },
    hSpace: {
        marginLeft: 5,
        marginRight: 5
    },
    mediaPersonal: {
        paddingTop: '40%', // 16:9
    },
    score: {
        fontSize: 30,
        fontWeight: "normal",
        letterSpacing: 1.5,
        color: "#e13333"
    },
    otherText: {
        fontSize: 23,
        fontWeight: "lighter",
    },
    scrollablePane: {
        maxHeight: 300,
        overflow: 'auto'
    }
}));

function Dashboard() {
    const classes = useStyles();
    const dialogRef = useRef({})
    const [progress, setProgress] = React.useState(50);
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
            <Grid container direction={"column"} alignItems="center" spacing={5} className={classes.rootGrid}>
                <Grid item className={classes.vSpace}>
                    <List component="nav" aria-label="icons-list" >
                        <ListItem className={classes.hSpace}>
                            <SpeedIcon />
                            <BarChartIcon />
                            <AccountBalanceIcon />
                            <GpsFixedIcon />
                            <BeenhereIcon />
                            <EmojiEventsIcon />
                        </ListItem>
                        <Divider className={classes.divider}/>
                        <ListItem>
                            <Typography className={classes.score}>
                                {userInfo.score}/3000
                            </Typography>
                        </ListItem>
                        <Divider className={classes.divider}/>
                    </List>
                    <Grid item className={classes.vSpace}>
                        <LinearProgress variant="determinate" value={progress} color="primary"/>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <Chip
                            className={classes.hSpace}
                            icon={<GradeIcon />}
                            label="Beginner"
                            color="primary"
                        />
                        <Chip
                            className={classes.hSpace}
                            icon={<GradeIcon />}
                            label="Intermediate"
                            color="primary"
                        />
                        <Chip
                            className={classes.hSpace}
                            icon={<GradeIcon />}
                            label="Advanced"
                            color="primary"
                        />
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <Typography className={classes.otherText}>
                            Challenges
                        </Typography>
                    </Grid>

                    <Grid item container direction={"row"} className={classes.scrollablePane}>
                        <Grid item className={classes.vSpace}>
                            <Card>
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
                                            Completa quanti più push-ups puoi e scala la classifica!
                                            Accetta la sfida mediante l'apposito pulsante.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Accetta
                                    </Button>
                                    <Button size="small" color="primary">
                                        100 punti
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
                                            Completa quante più bench-presses puoi e scala la classifica!
                                            Accetta la sfida mediante l'apposito pulsante.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Accetta
                                    </Button>
                                    <Button size="small" color="primary">
                                        200 punti
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
                                            Completa quanti più pull-ups puoi e scala la classifica!
                                            Accetta la sfida mediante l'apposito pulsante.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Accetta
                                    </Button>
                                    <Button size="small" color="primary">
                                        150 punti
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