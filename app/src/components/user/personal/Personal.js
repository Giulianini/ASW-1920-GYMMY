import React from 'react';
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
import {Box, Container, Fab, Grid} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';

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
    const [expanded, setExpanded] = React.useState(false);
    //const big = useMediaQuery(theme => theme.breakpoints.up('md'))

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container maxWidth={"lg"} >
              <Grid container direction={"row"} justify="space-around" alignItems="center" md={12} spacing={2} className={classes.rootGrid}>
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
                                  <Box component={"span"} fontWeight={"fontWeightBold"}>
                                      <Typography paragraph>Username:</Typography>
                                      <Typography paragraph>Username from DB</Typography>
                                      <Typography paragraph>Age:</Typography>
                                      <Typography paragraph>Age from DB</Typography>
                                      <Typography paragraph>Height:</Typography>
                                      <Typography paragraph>Height from DB</Typography>
                                      <Typography paragraph>Weight:</Typography>
                                      <Typography paragraph>Weight from DB</Typography>
                                  </Box>
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
                              title="Perdi peso"
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
                                  <Typography paragraph>Peso target:</Typography>
                                  <Typography paragraph>Peso target from DB</Typography>
                                  <Typography paragraph>Indice di massa grassa target:</Typography>
                                  <Typography paragraph>Indice di massa grassa target from DB</Typography>
                                  <Typography paragraph>Calorie giornaliere da assumere:</Typography>
                                  <Typography paragraph>Calorie giornaliere da assumere from DB</Typography>
                                  <Typography paragraph>Allenamenti settimanali:</Typography>
                                  <Typography paragraph>Allenamenti settimanali from DB</Typography>
                              </CardContent>
                          </Collapse>
                      </Card>
                  </Grid>
                      <Fab color={"primary"}
                           disabled={false}
                           href={""}
                           iconTheme={"Filled"}
                           size={"large"}
                           variant={"round"}
                           className={classes.customFab}>
                          <CreateIcon />
                      </Fab>
              </Grid>
        </Container>
    );
}

export default Personal;