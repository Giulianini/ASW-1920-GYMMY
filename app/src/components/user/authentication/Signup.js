import React from 'react';
import {Box, Fab, Grid, TextField, Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";

const backgroundImage = "authLanding.jpeg";

const useStyles = makeStyles(theme => ({
    rootBox: {
        backgroundImage: `url(${(backgroundImage)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    buttonStyle: {
        color: "red",
    },

    textFieldGrid: {
        backgroundColor: "white",
        marginTop: 100,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 100,
        borderRadius: 10,
        opacity: 0.7,
    }
}));

export default function Signup() {
    const classes = useStyles();
    return (
        <Box height="100vh" display="flex" flexDirection="column" className={classes.rootBox}>
            <Box py={10}>
                <Grid container direction="column" alignItems="center" >
                    <Grid item>
                        <Typography>
                            <Box fontSize={50} fontWeight="100">
                                Sign up
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item container direction="column" xs={8} sm={8} lg={4} className={classes.textFieldGrid} >
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
