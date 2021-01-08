import React, {useRef, useState} from 'react';
import {
    Box,
    Fab,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {baseAxios} from "../../../Api";
import SnackBar from "../utils/Snackbar";

const backgroundImage = "authLanding.jpeg";

const useStyles = makeStyles(theme => ({
    rootBox: {
        backgroundImage: `url(${(backgroundImage)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: "100vh",
    },
    buttonStyle: {
        color: "red",
    },

    textFieldForm: {
        paddingTop: 10,
        paddingBottom: 5,
        fontWeight: 300,
    },

    title: {
        fontSize: 50,
        fontWeight: 100
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
    const snackRef = useRef({})
    const [passError, setPassError] = useState(false)
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

    const handleSubmit = () => {
        if (values['password'] === values['password2']) {
            setPassError(false)
            baseAxios.post('/users', {
                "username": values['username'],
                "email": values['mail'],
                "password": values['password'],
            }).then(res => {
                snackRef.current.handleMessage(`${res.data["username"]} registered as ${res.data["role"]}`, "success")
            }).catch(err => {
                snackRef.current.handleMessage(`Error registering user ${err}`, "error")
            })
        } else {
            setPassError(true)
            snackRef.current.handleMessage(`Check password!`, "warning")
        }
    }

    return (
        <Box className={classes.rootBox}>
            <SnackBar ref={snackRef}/>
            <Box py={10}>
                <Grid container direction="column" alignItems="center" justify={"center"} >
                    <Grid item>
                        <Typography component={"div"} className={classes.title}>
                            Sign up
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
                                error={passError}
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
                         icontheme={"Filled"}
                         size={"large"}
                         onClick={handleSubmit}
                         variant={"round"}>
                        <SendIcon />
                    </Fab>
                </Grid>
            </Box>
        </Box>
    );
}
