import React from 'react';
import {Fab, Grid, TextField, Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

function Signup() {
    return (
        <Grid container direction="column" alignItems="center">
            <Grid>
                <Typography variant="h3">
                    Sign up
                </Typography>
            </Grid>
            <Grid item container direction="row">
                <TextField fullWidth={true} variant="filled" label="Email *"/>
                <TextField fullWidth={true} variant="filled" label="Username *"/>
                <TextField fullWidth={true} variant="filled" label="Password *"/>
                <TextField fullWidth={true} variant="filled" label="Conferma password *"/>
            </Grid>
            <Fab color={"secondary"}
                 label={""}
                 disabled={false}
                 href={""}
                 iconTheme={"Filled"}
                 size={"large"}
                 variant={"round"}>
                <SendIcon />
            </Fab>
        </Grid>
    );
}

export default Signup;