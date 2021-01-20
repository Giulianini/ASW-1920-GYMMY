import React, {useRef} from 'react';
import {Box, Fab, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import SendIcon from '@material-ui/icons/Send';
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import SnackBar from "../utils/Snackbar";
import {baseAxios} from "../../../Api";
import routes from "../../Routes";

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

    title: {
        fontSize: 50,
        fontWeight: 100
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

function Login() {
    const classes = useStyles();
    const snackRef = useRef({})
    const history = useHistory()
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        baseAxios.post('/session', {
            "username": values['username'],
            "password": values['password'],
        }).then(res => {
            localStorage.setItem("jwt", res.data.accessToken)
            localStorage.setItem("username", res.data.username)
            history.push(routes.dashboard.value)
        }).catch(reason => {
            snackRef.current.handleMessage("Login failed", "error")
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Box className={classes.rootBox}>
            <SnackBar ref={snackRef}/>
            <Box py={10}>
                <Grid container direction="column" alignItems="center" justify={"center"} component={"form"}
                      onSubmit={handleSubmit}>
                    <Grid item>
                        <Typography className={classes.title}>
                            Login
                        </Typography>
                    </Grid>
                    <Grid item md={6} lg={4} xl={3} container direction="column" className={classes.textFieldGrid}>
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
                        <FormControl required={true} variant="filled">
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
                    </Grid>
                    <Fab color={"primary"}
                         type={"submit"}
                         onSubmit={handleSubmit}
                         disabled={false}
                         href={""}
                         icontheme={"Filled"}
                         size={"large"}
                         variant={"round"}>
                        <SendIcon/>
                    </Fab>
                </Grid>
            </Box>
        </Box>
    );
}

export default Login;