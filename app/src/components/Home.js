import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Card, CardActionArea, Grid, Slide, Snackbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import {useHistory} from "react-router-dom";
import checkApiEndpoint from "../Api";
import {appTheme} from "../appTheme";
import Carousel from "react-material-ui-carousel";

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
        fontSize: 70,
        fontWeight: 100,
        textShadow: "0 0 50px blue",
    },
    gridSpacing: {
        marginTop: "70px"
    },
    card: {
        width: "auto",
    },
    cardText: {
        color: "white",
        textShadow: "0 0 5px black",
        fontWeight: 300,
        fontSize: 35,
    },
    media: {
        [appTheme.breakpoints.up('sm')]: {
            width: "fitContent",
            height: "100vh",
        },
        [appTheme.breakpoints.down('sm')]: {
            width: "fitContent",
            height: 400,
        },
    },
    carouselSpacing: {
        paddingTop: 1
    }
});

function Home() {
    const classes = useStyles()
    const history = useHistory()
    const scrollRef = useRef({})
    const [snackState, setSnackState] = useState({
        open: false,
        snackMessage: "",
        transition: TransitionRight,
    })

    useEffect(() => {
        window.HTMLElement.prototype.scrollIntoView = function () {
        };
        let id = setTimeout(() => {
            executeScroll()
        }, 3000)
        checkApiEndpoint((message, apiUrl) => {
            setSnackState({...snackState, open: true, snackMessage: `Endpoint ${message} @ ${apiUrl}`})
        }, (err) => {
            setSnackState({...snackState, open: true, snackMessage: `${err}`})
        })
        return function cleanup() {
            clearTimeout(id)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function TransitionRight(props) {
        return <Slide {...props} direction="left"/>
    }

    const onButtonClick = (path) => {
        history.push(path)
    }

    const executeScroll = () => window.scrollTo({behavior: 'smooth', top: scrollRef.current.offsetTop})

    const mySnackBar = (
        <Snackbar
            key={snackState.snackMessage}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={snackState.open}
            TransitionComponent={snackState.transition}
            autoHideDuration={3000}
            onClose={() => setSnackState({...snackState, open: false})}
            onExited={() => {
            }}
            message={snackState.snackMessage}
        />
    )

    function Item(props) {
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.item.img}
                        title={props.item.title}
                    >
                        <CardContent>
                            <Typography variant="h5" component="h2" className={classes.cardText}>
                                {props.item.title}
                            </Typography>
                        </CardContent>
                    </CardMedia>
                </CardActionArea>
            </Card>
        )
    }

    const items = [
        {
            title: "Sala principale",
            img: "mainRoom.jpg"
        },
        {
            title: "Sala pesi",
            img: "weightRoom.jpg"
        },
        {
            title: "Zumba",
            img: "zumba.jpg"
        },
        {
            title: "Pilates",
            img: "pilates.jpg"
        }
    ];

    return (
        <div>
            {mySnackBar}
            <Box height="50vh" display="flex" py={6} className={classes.root}>
                <Grid container justify={"center"} direction="column" alignItems="center">
                    <Grid item>
                        <Typography className={classes.landing}>
                            GYMMY
                        </Typography>
                    </Grid>
                    <Grid item className={classes.gridSpacing}>
                        <Button variant="contained" className={classes.signUpButton}
                                onClick={() => onButtonClick("/signup")}>
                            Signup
                        </Button>
                        <Button variant="contained" className={classes.logInButton}
                                onClick={() => onButtonClick("/login")}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <div ref={scrollRef}>
                <Carousel className={classes.carouselSpacing}>
                    {
                        items.map((item, i) => <Item key={i} item={item}/>)
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default Home;