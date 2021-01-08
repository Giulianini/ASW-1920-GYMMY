import React from 'react';
import {Grid} from "@material-ui/core";
import {Bar, Line} from 'react-chartjs-2';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    rootGrid:{
        [theme.breakpoints.up('md')]: {
            height: "95vh",
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 20,
            marginBottom: 100,
        }
}}));

const distanceData = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Distance',
            backgroundColor: 'rgba(240,124,0)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56]
        }
    ],
    fill: 'origin'
}

const activityData = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            backgroundColor: 'rgba(240,124,0)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: [10, 7, 9, 10, 5]
        }
    ],
    fill: 'origin'
}

const workoutData = {
    labels: ['Week1', 'Week2', 'Week3',
        'Week4'],
    datasets: [
        {
            label: 'Minutes',
            backgroundColor: 'rgba(240,124,0)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: [120, 340, 664, 753, 1130]
        }
    ],
    fill: 'origin'
}
function Statistics() {
    const classes = useStyles();
    return (
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid item>
                <Line
                    data={distanceData}
                    options={{
                        title:{
                            display:true,
                            text:'Distance covered',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </Grid>

            <Grid item>
                <Bar
                    data={activityData}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 10
                                }
                            }]
                        },
                        title:{
                            display:true,
                            text:'Completed activities',
                            fontSize:20
                        },
                        legend:{
                            display:false
                        }
                    }}
                />
            </Grid>

            <Grid item>
                <Line
                    data={workoutData}
                    options={{
                        title:{
                            display:true,
                            text:'Workout time',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default Statistics;