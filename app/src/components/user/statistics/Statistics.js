import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Grid, withStyles} from "@material-ui/core";
import {AreaSeries, ArgumentAxis, Chart, Legend, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Animation, ArgumentScale} from '@devexpress/dx-react-chart';
import { scalePoint } from "d3-scale";

const useStyles = makeStyles(theme => ({
    rootGrid: {
        [theme.breakpoints.up('md')]: {
            height: "95vh",
        },
        [theme.breakpoints.down('md')]: {
            paddingTop: 20,
            marginBottom: 100,
        }
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
    const [data, setData] = useState([
        { month: 'January', ios: 30},
        { month: 'February', ios: 35},
        { month: 'March', ios: 25},
        { month: 'April', ios: 40}
    ])
    return (
        <Container maxWidth={"lg"}>
            <Grid container direction={"column"} alignContent={"center"} className={classes.rootGrid}>
                <Grid item>
                    <Chart data={data} rootComponent={ChartRoot}>
                        <ArgumentScale factory={scalePoint} />
                        <ArgumentAxis />
                        <ValueAxis />
                        <AreaSeries name="iOS" valueField="ios" argumentField="month" />
                        <Animation />
                        <Legend
                            position="bottom"
                            rootComponent={LegendRoot}
                            itemComponent={LegendItem}
                            labelComponent={LegendLabel}
                        />
                        <Title text="Distance covered (km)" />
                    </Chart>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;