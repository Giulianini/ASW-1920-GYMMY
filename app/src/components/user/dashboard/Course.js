import React from 'react';
import CardMedia from "@material-ui/core/CardMedia";
import {Button, Card, CardActionArea, CardActions, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import {baseAxios} from "../../../Api";

const useStyles = makeStyles(theme => ({
    mediaPersonal: {
        paddingTop: '50%',
        margin: 'auto'
    },
    card: {
        marginBottom: 10,
        marginRight: 20,
        maxWidth: theme.breakpoints.values.md
    },
    pushCardSize: {
        minWidth: theme.breakpoints.values.md / 1.5
    }
}))

function Course(props) {

    const [enrolled, setEnrolled] = React.useState(props.item.participants.includes(localStorage.getItem(("username"))))

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    function retrieveImage() {
        return `data:${props.item.image.contentType};base64,${arrayBufferToBase64(props.item.image.data.data)}`
    }

    function enrollInCourse() {
        baseAxios.patch("courses/" + props.item._id, {
            username: localStorage.getItem("username"),
            command: "enroll"
        }).then(res => {
            setEnrolled(true)
        })
    }

    const classes = useStyles()
    return (
        <Grid item xs={12} lg={6}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.mediaPersonal}
                        image={retrieveImage()}
                        title={props.item.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.item.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.item.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={enrollInCourse} disabled={enrolled}>
                        {enrolled ? "Enrolled!" : "Enroll"}
                    </Button>
                </CardActions>
                <div className={classes.pushCardSize}/>
            </Card>
        </Grid>
    );
}

export default Course;