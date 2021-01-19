import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Container, Grid, withStyles} from "@material-ui/core";
import {AreaSeries, ArgumentAxis, Chart, Legend, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Animation} from '@devexpress/dx-react-chart';

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
        {year: '2012', android: 10, ios: 11},
        {year: '2015', android: 12, ios: 13},
    ])
    return (
        <Container maxWidth={"lg"}>
            <Grid container direction={"column"} alignContent={"center"} className={classes.rootGrid}>
                <Grid item>
                    <Chart
                        data={data}
                        rootComponent={ChartRoot}
                    >
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            name="Android"
                            valueField="android"
                            argumentField="year"
                        />
                        <AreaSeries
                            name="iOS"
                            valueField="ios"
                            argumentField="year"
                        />
                        <Animation/>
                        <Legend
                            position="bottom"
                            rootComponent={LegendRoot}
                            itemComponent={LegendItem}
                            labelComponent={LegendLabel}
                        />
                        <Title
                            text="Worldwide Sales to End Users by OS"
                        />
                    </Chart>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Statistics;