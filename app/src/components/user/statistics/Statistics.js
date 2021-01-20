import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Grid, withStyles} from "@material-ui/core";
import {AreaSeries, ArgumentAxis, Chart, Legend, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Animation, BarSeries} from '@devexpress/dx-react-chart';
import {userAxios} from "../../../Api";

const useStyles = makeStyles(theme => ({
    rootGrid: {

    }
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
    const [distanceData, setDistanceData] = useState([
        {month: 'Jan', km: 30},
        {month: 'Feb', km: 35},
        {month: 'Mar', km: 25},
        {month: 'Apr', km: 40},
        {month: 'May', km: 30},
        {month: 'Jun', km: 35},
        {month: 'Jul', km: 25},
        {month: 'Aug', km: 40},
        {month: 'Sep', km: 30},
        {month: 'Oct', km: 35},
        {month: 'Nov', km: 25},
        {month: 'Dec', km: 40}
    ]);
    const [activityData, setActivityData] = useState([
        {month: 'Jan', completedActivities: 130},
        {month: 'Feb', completedActivities: 140},
        {month: 'Mar', completedActivities: 144},
        {month: 'Apr', completedActivities: 124},
        {month: 'May', completedActivities: 144},
        {month: 'Jun', completedActivities: 112},
        {month: 'Jul', completedActivities: 142},
        {month: 'Aug', completedActivities: 144},
        {month: 'Sep', completedActivities: 123},
        {month: 'Oct', completedActivities: 141},
        {month: 'Nov', completedActivities: 128},
        {month: 'Dec', completedActivities: 130}
    ]);
    const [workoutData, setWorkoutData] = useState([]);


    // ----------- FETCHING DATA -------------
    useEffect(() => {
        fetchStatistics()
    },[])

    function fetchStatistics() {
        userAxios.get("statistics").then(res => {
            console.log(res.data.executionHistory)
            const history = res.data.executionHistory
            const historyWithMonths = history.map(obj => {
                const month = new Date(obj.date).getMonth()
                return {
                    minutes: obj.workoutMinutes,
                    month: month
                }
            })
            const groupedHistory = historyWithMonths.reduce((acc, obj) => {
                acc[obj.month] = {
                    min: (obj.month in acc ? acc[obj.month].minutes : 0) + obj.minutes
                }
                return acc
            }, {})
            console.log(groupedHistory)
            setWorkoutData(groupedHistory.map((k, v) => {
                return {
                    month: "Jan",
                    min: v.min
                }
            }))
            /*setWorkoutData([{
                month: "Jan",
                min: 100
            },
                {
                    month: "Feb",
                    min: 500
                }])*/
        }).catch(() => {
        })
    }

    return (
        <Container maxWidth={"lg"}>
            <Grid container direction={"column"} alignContent={"center"} className={classes.rootGrid}>
                <Grid item>
                    <Chart data={distanceData} rootComponent={ChartRoot}>
                        <ArgumentAxis />
                        <ValueAxis />
                        <AreaSeries name="Distance" valueField="km" argumentField="month" />
                        <Animation />
                        <Legend
                            position="bottom"
                            rootComponent={LegendRoot}
                            itemComponent={LegendItem}
                            labelComponent={LegendLabel}
                        />
                        <Title text="Distance covered (running + cyclette)" />
                    </Chart>
                </Grid>

                <Grid item>
                    <Chart
                        data={activityData}
                    >
                        <ArgumentAxis />
                        <ValueAxis
                            max={2400}
                        />

                        <BarSeries
                            name="# of completed activities related to own training card"
                            valueField="completedActivities"
                            argumentField="month"
                        />

                        <Animation />
                        <Legend position="bottom" rootComponent={ChartRoot} labelComponent={LegendLabel} />
                        <Title text="Completed exercises (#)" />
                    </Chart>
                </Grid>

                <Grid item>
                    <Chart data={workoutData} rootComponent={ChartRoot}>
                        <ArgumentAxis />
                        <ValueAxis />
                        <AreaSeries name="Workout" valueField="min" argumentField="month" />
                        <Animation />
                        <Legend
                            position="bottom"
                            rootComponent={LegendRoot}
                            itemComponent={LegendItem}
                            labelComponent={LegendLabel}
                        />
                        <Title text="Workout time (active minutes)" />
                    </Chart>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;