import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Grid, withStyles} from "@material-ui/core";
import {AreaSeries, ArgumentAxis, Chart, Legend, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Animation, BarSeries} from '@devexpress/dx-react-chart';
import {userAxios} from "../../../Api";

const useStyles = makeStyles(theme => ({
    rootGrid: {}
}));

const chartRootStyles = {
    chart: {
        paddingRight: '20px',
    },
};
const legendStyles = {
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
};
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
    },
});
const legendItemStyles = {
    item: {
        flexDirection: 'column',
    },
};
const ChartRootBase = ({classes, ...restProps}) => (
    <Chart.Root {...restProps} className={classes.chart}/>
);
const LegendRootBase = ({classes, ...restProps}) => (
    <Legend.Root {...restProps} className={classes.root} children={<div/>}/>
);
const LegendLabelBase = ({classes, ...restProps}) => (
    <Legend.Label {...restProps} className={classes.label}/>
);
const LegendItemBase = ({classes, ...restProps}) => (
    <Legend.Item {...restProps} className={classes.item} children={<div/>}/>
);

const ChartRoot = withStyles(chartRootStyles, {name: 'ChartRoot'})(ChartRootBase);
const LegendRoot = withStyles(legendStyles, {name: 'LegendRoot'})(LegendRootBase);
const LegendLabel = withStyles(legendLabelStyles, {name: 'LegendLabel'})(LegendLabelBase);
const LegendItem = withStyles(legendItemStyles, {name: 'LegendItem'})(LegendItemBase);

function Statistics() {
    const classes = useStyles();
    const [activityData, setActivityData] = useState([]);
    const [workoutData, setWorkoutData] = useState([]);


    // ----------- FETCHING STATS DATA -------------
    useEffect(() => {
        fetchCompletedExStats()
        fetchWorkoutMinsStats()
    }, [])

    function fetchCompletedExStats() {
        userAxios.get("statistics").then(res => {
            const exercisesByMonth = res.data.exercisesByMonth
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const exercisesLastYear = exercisesByMonth.slice(-12)
                .map(obj => {
                    return {
                        month: `${months[obj.month]} ${obj.year}`,
                        completedActivities: obj.completedActivities
                    }
                })
            setActivityData(exercisesLastYear)

            const workoutMinutesByMonth = res.data.workoutMinutesByMonth
            const minutesLastYear = workoutMinutesByMonth.slice(-12)
                .map(obj => {
                    return {
                        month: `${months[obj.month]} ${obj.year}`,
                        min: obj.minutes
                    }
                })
            setWorkoutData(minutesLastYear)
        }).catch(() => {
        })
    }

    function fetchWorkoutMinsStats() {
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container direction={"column"} alignContent={"center"} className={classes.rootGrid}>
                <Grid item>
                    <Chart
                        data={activityData}
                    >
                        <ArgumentAxis/>
                        <ValueAxis
                            max={2400}
                        />

                        <BarSeries
                            name="# of completed activities related to own training card"
                            valueField="completedActivities"
                            argumentField="month"
                        />

                        <Animation/>
                        <Legend position="bottom" rootComponent={ChartRoot} labelComponent={LegendLabel}/>
                        <Title text="Completed exercises (#)"/>
                    </Chart>
                </Grid>

                <Grid item>
                    <Chart data={workoutData} rootComponent={ChartRoot}>
                        <ArgumentAxis/>
                        <ValueAxis/>
                        <AreaSeries name="Workout" valueField="min" argumentField="month"/>
                        <Animation/>
                        <Legend
                            position="bottom"
                            rootComponent={LegendRoot}
                            itemComponent={LegendItem}
                            labelComponent={LegendLabel}
                        />
                        <Title text="Workout time (active minutes)"/>
                    </Chart>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;