import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Card, CardActionArea, CardActions, Grid, Slide, Snackbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import checkApiEndpoint from "../Api";

const backgroundImage = "landingPageImage.jpeg";

const useStyles = makeStyles({
    root: {
        backgroundImage: `url(${(backgroundImage)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        flexGrow: 1
    },
    signUpButton: {
        color: "white",
        backgroundColor: "#ff325b",
        paddingLeft: "20px",
        paddingRight: "20px"
    },
    logInButton: {
        color: "white",
        backgroundColor: "#4153af",
        marginLeft: "50px",
        paddingLeft: "25px",
        paddingRight: "25px"
    },
    landing: {
        color: "white",
        fontSize: 49,
        fontWeight: 400,
        fontFamily: [
            'Roboto', 'sans-serif'
        ].join(',')
    },
    gridSpacing: {
        marginTop: "70px"
    },
    containerBox: {
        margin: "auto"
    },
    card: {
        maxWidth: 400,
    },
    bottomCard: {
        marginBottom: 60
    },
    media: {
        height: 100,
    }
});

function Home() {
    const classes = useStyles();
    const [snackState, setSnackState] = useState({
        open: false,
        snackMessage: "",
        transition: TransitionRight,
    })
    const {open, snackMessage, transition} = snackState //Remove and hooks do not work!!!

    useEffect(() => {
        checkApiEndpoint((message, apiUrl) => {
            setSnackState({...snackState, open: true, snackMessage: `Endpoint ${message} @ ${apiUrl}`})
        })
    },[])

    function TransitionRight(props) {
        return <Slide {...props} direction="left" />
    }
    const mySnackBar = (
        <Snackbar
            key={snackMessage ? snackMessage.key : undefined}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            TransitionComponent={transition}
            autoHideDuration={3000}
            onClose={() => setSnackState({...snackState, open: false})}
            onExited={() => {}}
            message={snackMessage ? snackMessage : undefined}
        />
    )
    return (
        <Box>
            {mySnackBar}
            <Box height="50vh" display="flex" py={6} className={classes.root}>
                <Grid container direction="column" alignItems="center" py={6}>
                    <Grid item>
                        <Typography className={classes.landing}>
                            GYMMY
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridSpacing}>
                        <Button variant="contained" className={classes.signUpButton}>
                            Signup
                        </Button>
                        <Button variant="contained" className={classes.logInButton}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container item direction="column" xs={7} md={4} lg={3} spacing={3} className={classes.containerBox}>
                <Grid xs={12} md={12} lg={12} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="mainRoom.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Main room
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid xs={12} md={12} lg={12} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="weightRoom.jpg"
                                title="weight room"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Weight room
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid xs={12} md={12} lg={12} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="functional.jpg"
                                title="functional"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Functional
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid xs={12} md={12} lg={12} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="zumba.jpg"
                                title="zumba"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Zumba
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid xs={12} md={12} lg={12} item className={classes.bottomCard}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="PT.jpg"
                                title="our pt"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Meet our P.T.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;