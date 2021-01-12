import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {Button, Card, CardActionArea, CardActions, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
    vSpace: {
        paddingTop: 5,
        paddingBottom: 5,
        margin: 'auto'
    },
    mediaPersonal: {
        paddingTop: '50%', // 16:9
        margin: 'auto'
    },
    card: {
        marginBottom: 10,
        maxWidth: theme.breakpoints.values.md
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.md / 2
    },
    scrollablePane: {
        maxHeight: 300,
        width: '100%',
        overflow: 'auto'
    },
}))

function Course(props) {
    const classes = useStyles()
    return (
        <Grid item className={classes.vSpace}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.mediaPersonal}
                        image={props.item.image}
                        title={props.item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Push-up challenge
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.item.desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Accept challenge
                    </Button>
                    <Button size="small" color="primary">
                        100 points
                    </Button>
                </CardActions>
                <div className={classes.pushCardSize}/>
            </Card>
        </Grid>
    );
}

export default Course;