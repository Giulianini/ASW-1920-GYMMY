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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Container, Fab, Grid} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import {authAxios} from "../../../Api";
import EditPersonalDialog from "./EditPersonalDialog";

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
    const [expanded, setExpanded] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        "username": undefined,
        "age": undefined,
        "height": undefined,
        "weight": undefined,
        "mainGoal": undefined,
        "targetWeight": undefined,
        "targetBMI": undefined,
        "caloriesTarget": undefined,
        "minWorkoutsTarget": undefined
    })
    //const big = useMediaQuery(theme => theme.breakpoints.up('md'))

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        let username = localStorage.getItem("username")
        authAxios.get(`/users/${username}`).then(res => {
            setUserInfo({...res.data})
        }).catch(reason => {
            console.log(reason)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container maxWidth={"lg"} >
            <EditPersonalDialog ref={dialogRef} userInfo={userInfo} setUserInfo={setUserInfo}/>
            <Grid container direction={"row"} justify="space-around" alignItems="center" spacing={2} className={classes.rootGrid}>
              <Grid item>
                  <Card className={classes.card}>
                      <CardHeader
                          avatar={
                              <Avatar aria-label="personalAvatar" className={classes.avatar}>
                                  AC
                              </Avatar>
                          }
                          action={
                              <IconButton aria-label="settings">
                                  <MoreVertIcon />
                              </IconButton>
                          }
                          title="Info"
                          subheader="Le tue informazioni personali"
                      />
                      <CardMedia
                          className={classes.mediaPersonal}
                          image="/personRunning.png"
                      />
                      <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Espandendo questa scheda troverai tutte le tue informazioni personale, quali: username, età, altezza e peso.
                          </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                              <ShareIcon />
                          </IconButton>
                          <IconButton
                              className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                          >
                              <ExpandMoreIcon />
                          </IconButton>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                              <Typography paragraph>Username: {userInfo.username}</Typography>
                              <Typography paragraph>Age: {userInfo.age}</Typography>
                              <Typography paragraph>Height: {userInfo.height}</Typography>
                              <Typography paragraph>Weight: {userInfo.weight}</Typography>
                          </CardContent>
                      </Collapse>
                  </Card>
              </Grid>

              <Grid item>
                  <Card className={classes.card}>
                      <CardHeader
                          action={
                              <IconButton aria-label="settings">
                                  <MoreVertIcon />
                              </IconButton>
                          }
                          title={"Perdi peso"}  // {userInfo.mainGoal} --> from DB
                          subheader="I tuoi obiettivi personali"
                      />
                      <CardMedia
                          className={classes.mediaTarget}
                          image="/fire.png"
                          title="Paella dish"
                      />
                      <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                              Espandendo questa scheda troverai i tuoi obiettivi di fitness, quali: peso target, indice di massa grassa target,
                              calorie giornaliere e numero di allenamenti settianali previsti dalla tua scheda.
                          </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                              <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                              <ShareIcon />
                          </IconButton>
                          <IconButton
                              className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded,
                              })}
                              onClick={handleExpandClick}
                              aria-expanded={expanded}
                              aria-label="show more"
                          >
                              <ExpandMoreIcon />
                          </IconButton>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                          <CardContent>
                              <Typography paragraph>Peso target: {userInfo.targetWeight}</Typography>
                              <Typography paragraph>Indice di massa grassa target: {userInfo.targetBMI}</Typography>
                              <Typography paragraph>Calorie giornaliere da assumere: {userInfo.caloriesTarget}</Typography>
                              <Typography paragraph>Allenamenti settimanali: {userInfo.minWorkoutsTarget}</Typography>
                          </CardContent>
                      </Collapse>
                  </Card>
              </Grid>
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
            </Grid>
        </Container>
    );
}

export default Personal;