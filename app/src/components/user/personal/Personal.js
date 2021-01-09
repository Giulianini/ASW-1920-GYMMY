import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Container, Grid, Tooltip} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {userAxios} from "../../../Api";
import EditPersonalDialog from "./EditPersonalDialog";
import SnackBar from "../utils/Snackbar";

const useStyles = makeStyles(theme => ({
    rootGrid:{
        [theme.breakpoints.up('md')]: {
            height: "95vh",
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 20,
            marginBottom: 100,
        },
    },
    card: {
        maxWidth: 500,
    },
    mediaPersonal: {
        height: 100,
        width: '33%',
        paddingTop: '60%', // 16:9
        marginLeft: '30%'
    },
    customFab: {
        margin: 0,
        top: 'auto',
        right: 10,
        bottom: 65,
        left: 'auto',
        position: 'fixed',
    },
    mediaTarget: {
        height: 100,
        width: '40%',
        paddingTop: '50%', // 16:9
        marginLeft: '28%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function Personal() {
    const classes = useStyles();
    const dialogRef = useRef({})
    const snackRef = useRef({})
    const [expanded, setExpanded] = React.useState({
        "personal": false,
        "objectives": false,
    })
    const [userInfo, setUserInfo] = React.useState({
        "username": "",
        "age": undefined,
        "height": undefined,
        "weight": undefined,
        "mainGoal": undefined,
        "targetWeight": undefined,
        "targetBMI": undefined,
        "targetCalories": undefined,
        "targetMinWorkouts": undefined
    })
    //const big = useMediaQuery(theme => theme.breakpoints.up('md'))

    const handleExpandClick = (value)  => {
        setExpanded({...expanded, [value]: !expanded[value] });
    };

    useEffect(() => {
        userAxios.get("").then(res => {
            setUserInfo({...res.data})
        }).catch(reason => {
            console.log(reason)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container maxWidth={"lg"} >
            <SnackBar ref={snackRef}/>
            <EditPersonalDialog ref={dialogRef} userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Grid container direction={"row"} justify="space-around" alignItems="center" spacing={2} className={classes.rootGrid}>
              <Grid item>
                  <Card className={classes.card}>
                      <CardHeader
                          action={
                              <Tooltip title={"Edit information"}>
                              <IconButton
                                  onClick={() => dialogRef.current.handleClickOpen()}
                                  type={"button"}
                                  aria-label="modify">
                                  <CreateIcon/>
                              </IconButton>
                              </Tooltip>
                          }
                          title="Information"
                          subheader="Your Personal information"
                      />
                      <CardMedia
                          className={classes.mediaPersonal}
                          image="/personRunning.png"
                      />
                      <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Expand to see and verify all your personal information.
                          </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                          <Tooltip title={"Expand"}>
                          <IconButton
                              className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded.personal,
                              })}
                              onClick={() => handleExpandClick("personal")}
                              aria-expanded={expanded.personal}
                              aria-label="show more"
                          >
                              <ExpandMoreIcon />
                          </IconButton>
                          </Tooltip>
                      </CardActions>
                      <Collapse in={expanded.personal} timeout="auto" unmountOnExit>
                          <CardContent>
                              <Typography paragraph>Username: {userInfo.username}</Typography>
                              <Typography paragraph>Age: {userInfo.age}</Typography>
                              <Typography paragraph>Height: {userInfo.height} cm</Typography>
                              <Typography paragraph>Weight: {userInfo.weight} kg</Typography>
                          </CardContent>
                      </Collapse>
                  </Card>
              </Grid>

              <Grid item>
                  <Card className={classes.card}>
                      <CardHeader
                          action={
                              <Tooltip title={"More info"}>
                              <IconButton aria-label="settings">
                                  <MoreVertIcon />
                              </IconButton>
                              </Tooltip>
                          }
                          title={"Lose Weight"}  // {userInfo.mainGoal} --> from DB
                          subheader="Your personal goals"
                      />
                      <CardMedia
                          className={classes.mediaTarget}
                          image="/fire.png"
                          title="Paella dish"
                      />
                      <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Expand to see the goals assigned by your personal trainer.
                          </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                          <Tooltip title={"Expand"}>
                          <IconButton
                              className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded.objectives,
                              })}
                              onClick={() => handleExpandClick("objectives")}
                              aria-expanded={expanded.objectives}
                              aria-label="show more"
                          >
                              <ExpandMoreIcon />
                          </IconButton>
                          </Tooltip>
                      </CardActions>
                      <Collapse in={expanded.objectives} timeout="auto" unmountOnExit>
                          <CardContent>
                              <Typography paragraph>Target weight: {userInfo.targetWeight}</Typography>
                              <Typography paragraph>Target body fat: {userInfo.targetBMI}</Typography>
                              <Typography paragraph>Target calories: {userInfo.targetCalories}</Typography>
                              <Typography paragraph>Weekly workout rate: {userInfo.targetMinWorkouts}</Typography>
                          </CardContent>
                      </Collapse>
                  </Card>
              </Grid>
{/*
                  <Fab color={"primary"}
                       disabled={false}
                       href={""}
                       icontheme={"Filled"}
                       size={"large"}
                       variant={"round"}
                       onClick={() => dialogRef.current.handleClickOpen()}
                       className={classes.customFab}>
                      <CreateIcon />
                  </Fab>
*/}
            </Grid>
        </Container>
    );
}

export default Personal;