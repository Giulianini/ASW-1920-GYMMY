import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {Button, Card, CardActionArea, CardActions, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 10,
        [theme.breakpoints.up('lg')]: {
            maxWidth: theme.breakpoints.values.lg / 2
        },

    },
    cardMedia: {
        height: 0,
        //width: '100%',
        //padding: '27%', // 16:9
        paddingTop: '56.25%', // 16:9,
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.lg / 2
    }
}))

function ExerciseCard(props) {
    const classes = useStyles()
    return (
        <Grid item xs={11} lg={6}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.cardMedia}
                        image={props.item.image}
                        title={props.item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.item.desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Accetta
                    </Button>
                    <Button size="small" color="primary">
                        100 punti
                    </Button>
                </CardActions>
                <div className={classes.pushCardSize}/>
            </Card>
        </Grid>
    );
}

export default ExerciseCard;