import React, {useState} from 'react';
import {Box, Fab, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {baseAxios} from "../../../Api";
import {Link, useHistory} from "react-router-dom";
import routes from "../../Routes";
import {useSnackbar} from "notistack";

const backgroundImage = "/authentication/authLanding.jpeg";

const useStyles = makeStyles(theme => ({
    rootBox: {
        backgroundImage: `url(${(backgroundImage)})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: "100vh",
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
        marginBottom: 10,
        borderRadius: 10,
        opacity: 0.7,
    },
    linkText: {
        marginBottom: 100,
        fontWeight: 100,
        color: "white",
    }
}));

export default function Signup() {
    const classes = useStyles();
    const history = useHistory()
    const {enqueueSnackbar} = useSnackbar()
    const [passError, setPassError] = useState(false)
    const [values, setValues] = React.useState({
        mail: '',
        username: '',
        password: '',
        password2: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.password && values.password === values.password2) {
            setPassError(false)
            baseAxios.post('/users', {
                "username": values['username'],
                "email": values['mail'],
                "password": values['password'],
            }).then(res => {
                history.push(routes.login.value, {registered: true, username: res.data.username})
            }).catch(reason => {
                if (reason.response.data.toString() === "Conflict") {
                    enqueueSnackbar("Username already exists, try a different one.", {variant: "error"})
                } else {
                    enqueueSnackbar("Error registering user", {variant: "error"})
                }
            })
        } else {
            setPassError(true)
            enqueueSnackbar("Check password", {variant: "warning"})
        }
    }

    return (
        <Box className={classes.rootBox}>
            <Box py={10}>
                <Grid container direction="column" alignItems="center" justify={"center"} component={"form"}
                      onSubmit={handleSubmit}>
                    <Grid item>
                        <Typography component={"div"} className={classes.title}>
                            Sign up
                        </Typography>
                    </Grid>
                    <Grid item md={6} lg={4} xl={3} container direction="column" className={classes.textFieldGrid}>
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
                        <FormControl required={true} fullWidth={true} variant="filled">
                            <InputLabel>Password</InputLabel>
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
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl required={true} fullWidth={true} variant="filled">
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
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body1"} className={classes.linkText}>
                            Already registered? <Link to={{pathname: routes.login.value}}
                                                      style={{color: 'white'}}> Login </Link>
                        </Typography>
                    </Grid>
                    <Fab color={"primary"}
                         type={"submit"}
                         href={""}
                         icontheme={"Filled"}
                         size={"large"}
                         onSubmit={handleSubmit}
                         variant={"round"}>
                        <SendIcon/>
                    </Fab>
                </Grid>
            </Box>
        </Box>
    );
}
