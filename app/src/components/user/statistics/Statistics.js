import React from 'react';
import {Container, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Chart from "react-apexcharts";

const useStyles = makeStyles(theme => ({
    rootGrid:{
        [theme.breakpoints.up('md')]: {
            height: "95vh",
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 20,
            marginBottom: 100,
        }
    }
}));

const completedActivities = {
    options: {
        xaxis: {
            categories: ['January', 'February', 'March',
                'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        title: {
            text: 'Completed activities',
            align: 'center',
            floating: true,
            style: {
                fontSize:    '20px',
                fontWeight:  'normal',
                fontFamily:  'Roboto',
                color:       'black'
            },
        },
        subtitle: {
            text: '(Monthly)',
            align: 'center',
            floating: false,
            style: {
                fontSize:    '13px',
                fontWeight:  'normal',
                fontFamily:  'Roboto',
                color:       'black'
            },
        }
    },
    series: [
        {
            data: [30, 40, 31, 30, 49, 50, 28, 27, 33, 39, 45, 51]
        }
    ]
};

const workoutTime = {
    options: {
        xaxis: {
            categories: ['January', 'February', 'March',
                'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        title: {
            text: 'Workout time',
            align: 'center',
            floating: true,
            style: {
                fontSize:    '20px',
                fontWeight:  'normal',
                fontFamily:  'Roboto',
                color:       'black'
            },
        },
        subtitle: {
            text: '(minutes)',
            align: 'center',
            floating: false,
            style: {
                fontSize:    '13px',
                fontWeight:  'normal',
                fontFamily:  'Roboto',
                color:       'black'
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: '10px',
                fontFamily: 'Roboto',
                fontWeight: 'normal',
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 3,
                    blur: 5,
                    color: '#000',
                    opacity: 0.5
                }
            },
        }
    },
    series: [
        {
            data: [15, 31, 47, 66, 75, 93, 112, 130, 149, 169, 190, 202]
        }
    ]
};

const distanceCovered = {
    options: {
        xaxis: {
            categories: ['January', 'February', 'March',
                'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        title: {
            text: 'Distance covered',
            align: 'center',
            floating: true,
            style: {
                fontSize:    '20px',
                fontWeight:  'normal',
                fontFamily:  'Roboto',
                color:       'black'
            },
        },
        subtitle: {
            text: '(km)',
            align: 'center',
            floating: false,
            style: {
                fontSize:    '13px',
                fontWeight:  'normal',
                fontFamily:  'Roboto',
                color:       'black'
            },
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: '10px',
                fontFamily: 'Roboto',
                fontWeight: 'normal',
            },
            background: {
                enabled: true,
                foreColor: '#fff',
                padding: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff',
                opacity: 0.9,
                dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 3,
                    blur: 5,
                    color: '#000',
                    opacity: 0.5
                }
            },
        }
    },
    series: [
        {
            data: [15, 31, 18, 22, 44, 55, 32, 38, 28, 35, 43, 36]
        }
    ]
};

function Statistics() {
    const classes = useStyles();
    return (
        <Container maxWidth={"lg"}>
            <Grid container direction={"column"} alignContent={"center"} className={classes.rootGrid}>
                <Grid item>
                    <div>
                        <Chart
                            options={completedActivities.options}
                            series={completedActivities.series}
                            type="bar"
                            width="370"
                        />
                    </div>
                </Grid>

                <Grid item>
                    <div>
                        <Chart
                            options={distanceCovered.options}
                            series={distanceCovered.series}
                            type="area"
                            width="365"
                        />
                    </div>
                </Grid>

                <Grid item>
                    <div>
                        <Chart
                            options={workoutTime.options}
                            series={workoutTime.series}
                            type="area"
                            width="365"
                        />
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;