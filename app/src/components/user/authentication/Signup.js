import React from 'react';
import {
    Box,
    Fab,
    FormControl, FormHelperText,
    Grid, Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import {height} from "@material-ui/system";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

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

    textFieldForm: {
        paddingTop: 10,
        paddingBottom: 5,
        fontWeight: 300,
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
    const [values, setValues] = React.useState({
        mail: '',
        username: '',
        password: '',
        password2: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                        <FormControl required={true} fullWidth={true} variant={"filled"}>
                            <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                            <OutlinedInput
                                className={classes.textFieldForm}
                                id="email"
                                value={values.mail}
                                onChange={handleChange('mail')}
                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                aria-describedby="mail"
                                inputProps={{
                                    'aria-label': 'email',
                                }}
                            />
                        </FormControl>
                        <FormControl required={true} fullWidth={true} variant={"filled"}>
                            <InputLabel>Username</InputLabel>
                            <OutlinedInput
                                className={classes.textFieldForm}
                                id="username"
                                value={values.username}
                                onChange={handleChange('username')}
                                endAdornment={<InputAdornment position="end"></InputAdornment>}
                                aria-describedby="username"
                                inputProps={{
                                    'aria-label': 'username',
                                }}
                            />
                        </FormControl>
                        <FormControl variant="filled">
                            <InputLabel >Password</InputLabel>
                            <OutlinedInput
                                className={classes.textFieldForm}
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                className={classes.textFieldForm}
                                id="password2"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password2}
                                onChange={handleChange('password2')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
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
