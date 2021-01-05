import React from 'react';
import {Box, Fab, Grid, TextField, Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import {height} from "@material-ui/system";

const backgroundImage = "authLanding.jpeg";

const useStyles = makeStyles(theme => ({
    rootBox: {
        backgroundImage: `url(${(backgroundImage)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: "90vh",
    },
    buttonStyle: {
        color: "red",
    },

    textFieldGrid: {
        backgroundColor: "white",
        [theme.breakpoints.down('md')]: {
            marginLeft: 10,
            marginRight: 10,
            width: "90%",
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 0,
            marginRight: 0,
        },
        marginTop: 100,
        marginBottom: 100,
        borderRadius: 10,
        opacity: 0.7,
    }
}));

export default function Signup() {
    const classes = useStyles();
    return (
        <Box className={classes.rootBox}>
            <Box py={10}>
                <Grid container direction="column" alignItems="center" justify={"center"} >
                    <Grid item>
                        <Typography>
                            <Box fontSize={50} fontWeight="100">
                                Sign up
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item md={6} lg={4} xl={3} container direction="column" className={classes.textFieldGrid} >
                        <TextField required={true} fullWidth={true} variant="filled" label="Email"/>
                        <TextField required={true} fullWidth={true} variant="filled" label="Username"/>
                        <TextField required={true} fullWidth={true} variant="filled" label="Password"/>
                        <TextField required={true} fullWidth={true} variant="filled" label="Conferma password"/>
                    </Grid>
                    <Fab color={"primary"}
                         disabled={false}
                         href={""}
                         iconTheme={"Filled"}
                         size={"large"}
                         variant={"round"}>
                        <SendIcon />
                    </Fab>
                </Grid>
            </Box>
        </Box>
    );
}
