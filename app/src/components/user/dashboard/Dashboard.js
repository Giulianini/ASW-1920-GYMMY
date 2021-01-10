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
    CardActionArea, CardActions, Button, GridList, GridListTile, GridListTileBar
} from "@material-ui/core";
import EditPersonalDialog from "../personal/EditPersonalDialog";
import SpeedIcon from '@material-ui/icons/Speed';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GradeIcon from '@material-ui/icons/Grade';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";

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
        paddingBottom: 5,
    },
    hSpace: {
        marginLeft: 5,
        marginRight: 5,
    },
    chips: {
        marginLeft: 30,
        marginRight: 30,
    },
    mediaPersonal: {
        paddingTop: '40%', // 16:9
    },
    score: {
        fontSize: 30,
        fontWeight: "normal",
        letterSpacing: 1.5,
        color: "#e13333",
        margin: "auto",
    },
    otherText: {
        fontSize: 23,
        fontWeight: "lighter",
    },
    scrollablePane: {
        maxHeight: 300,
        width: '100%',
        overflow: 'auto'
    },
    icons: {
        marginLeft: 20,
        marginRight: 20
    },
    rootB: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleB: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const tileData = [
    {
        img: "/pushUp.jpg",
        title: 'Pushup',
        author: 'author',
    },
    {
        img: "/pullUp.jpg",
        title: 'Pullup',
        author: 'author',
    },
    {
        img: "/benchPress.jpg",
        title: 'Bench press',
        author: 'author',
    }
]

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
            <Grid container direction={"column"} alignItems="center" justify={"center"} spacing={5} className={classes.rootGrid}>
                <Grid item className={classes.vSpace}>
                    <List component="nav" aria-label="icons-list" >
                        <ListItem className={classes.hSpace}>
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
                    <Grid item className={classes.vSpace}>
                        <LinearProgress variant="determinate" value={progress} color="primary"/>
                    </Grid>
                    <Grid item className={classes.vSpace}>
                        <Chip
                            className={classes.chips}
                            icon={<GradeIcon />}
                            label="Beginner"
                            color="primary"
                        />
                        <Chip
                            className={classes.chips}
                            icon={<GradeIcon />}
                            label="Intermediate"
                            color="primary"
                        />
                        <Chip
                            className={classes.chips}
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

                    <div className={classes.rootB}>
                        <GridList className={classes.gridList} cols={2.5}>
                            {tileData.map((tile) => (
                                <GridListTile key={tile.img}>
                                    <img src={tile.img} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <IconButton aria-label={`star ${tile.title}`}>
                                                <StarBorderIcon className={classes.title} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>

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
                                            Iscriviti al corso di allenamento funzionale mediante l'apposito pulsante. La sala è dotata di tutta l'attrezzatura necessaria.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleEnrollClick}>
                                        Iscriviti
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
                                            Iscriviti al corso di zumba mediante l'apposito pulsante. La sala è dotata di tutta l'attrezzatura necessaria.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={handleEnrollClick}>
                                        Disiscriviti
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
                                            Iscriviti al corso di pilates mediante l'apposito pulsante. La sala è dotata di tutta l'attrezzatura necessaria.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Iscriviti
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