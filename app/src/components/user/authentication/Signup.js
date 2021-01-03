import React from 'react';
import {Box, Fab, Grid, TextField, Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";

const backgroundImage = "authLanding.jpeg";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url(${(backgroundImage)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        flexGrow: 1
    },
    buttonStyle: {
        color: "red",
    },
    title: {
        color: "black",
        fontSize: 49,
        fontFamily: [
            'Roboto', 'sans-serif'
        ].join(',')
    },
    textfieldGrid: {
        padding: theme.spacing(5)
    }
}));

function Signup() {
    const classes = useStyles();
    return (
        <Box height="100vh" display="flex" flexDirection="column" className={classes.root}>
            <Box py={10}>
                <Grid container direction="column" alignItems="center">
                    <Grid>
                        <Typography>
                            <Box className={classes.title}>
                                Sign up
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid className={classes.textfieldGrid} item container direction="row" xs={10} md={7} lg={5}>
                        <TextField required={true} fullWidth={true} variant="filled" label="Email" />
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

export default Signup;