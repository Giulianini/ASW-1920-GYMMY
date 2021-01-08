import React from 'react';
import Paper from '@material-ui/core/Paper';
import {AreaSeries, ArgumentAxis, Chart, LineSeries, ValueAxis} from "@devexpress/dx-react-chart";
import {Box, Grid} from "@material-ui/core";

const data = [
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 30 },
];

function Statistics(props) {
    return (
        <Grid container>
            <Grid item>
                <Paper>
                    <Chart
                        data={data}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <LineSeries valueField="value" argumentField="argument" />
                    </Chart>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Statistics;