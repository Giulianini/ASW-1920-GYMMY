import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Dialog, DialogContent, FormControl, Grid, InputLabel, Select, Slide} from "@material-ui/core";
import {AreaSeries, ArgumentAxis, Chart, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Animation, ArgumentScale, LineSeries} from '@devexpress/dx-react-chart';
import {scalePoint} from 'd3-scale';
import {area, curveCatmullRom, line,} from 'd3-shape';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {ArrowForward} from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
})

const MonitorDialog = forwardRef((props, ref) => {
    const useStyles = makeStyles((theme) => ({
        text: {
            fontWeight: 100,
            textAlign: "center",
            margin: "auto",
        },
        appbarText: {
            fontWeight: 100,
            textAlign: "center",
            margin: "auto",
            marginBottom: 10,
            marginTop: 10,
        },
        statePaper: {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            zIndex: theme.zIndex.drawer + 1,
        },
        formControl: {
            margin: 10,
            minWidth: 60,
        },
    }))

    function MyMonitorDialog() {
        const classes = useStyles()
        const [state, setState] = React.useState({
            sampling: 2,
            seriesLength: 10,
        });
        const [open, setOpen] = React.useState(false)
        const [heartData, setHeartData] = useState([{seconds: 0, rate: 0}])
        const [heartId, setHeartId] = useState(0)
        const [spo2Data, setSpo2Data] = useState([{seconds: 0, saturation: 0}])
        const [spo2Id, setSpo2Id] = useState(0)
        const heartBaseRate = 100
        const heartRandomness = 10
        const spo2BaseRate = 97
        const spo2Randomness = 3

        const handleClickDialogOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        useImperativeHandle(ref, () => {
            return {
                handleClickDialogOpen: handleClickDialogOpen
            };
        })

        const Area = props => (
            <AreaSeries.Path
                {...props}
                path={area()
                    .x(({arg}) => arg)
                    .y1(({val}) => val)
                    .y0(({startVal}) => startVal)
                    .curve(curveCatmullRom)}
            />
        )

        const Line = props => (
            <LineSeries.Path
                {...props}
                path={line()
                    .x(({arg}) => arg)
                    .y(({val}) => val)
                    .curve(curveCatmullRom)}
            />
        )

        const Text = (props) => {
            const classes = useStyles()
            return (
                <Typography component="h3" variant="h5" className={classes.text}>
                    {props.text}
                </Typography>
            )
        }

        useEffect(() => {
            const id = setTimeout(() => {
                const randomRate = Math.floor(Math.random() * heartRandomness) + heartBaseRate
                const lastSeconds = heartData[heartData.length - 1].seconds
                let data = [{}]
                if (heartData.length > state.seriesLength) {
                    data = heartData.slice(heartData.length - state.seriesLength, heartData.length)
                } else {
                    data = heartData.slice()
                }
                data.push({
                    seconds: lastSeconds + parseInt(state.sampling),
                    rate: randomRate
                })
                setHeartData(data)
            }, 1000 * state.sampling)
            setHeartId(id)
            return function cleanup() {
                clearTimeout(heartId)
            }
        }, [heartData])

        useEffect(() => {
            const id = setTimeout(() => {
                const lastSeconds = spo2Data[spo2Data.length - 1].seconds
                const randomRate = Math.floor(Math.random() * spo2Randomness) + spo2BaseRate
                let data = []
                if (spo2Data.length > state.seriesLength) {
                    data = spo2Data.slice(spo2Data.length - state.seriesLength, spo2Data.length)
                } else {
                    data = spo2Data.slice()
                }
                data.push({
                    seconds: lastSeconds + parseInt(state.sampling),
                    saturation: randomRate
                })
                setSpo2Data(data)
            }, 1000 * state.sampling)
            setSpo2Id(id)
            return function cleanup() {
                clearTimeout(spo2Id)
            }
        }, [spo2Data])

        const handleChange = (event) => {
            const name = event.target.name
            console.log(name)
            setState({
                ...state,
                [name]: event.target.value,
            })
        }

        return (
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogContent>
                    <Chart
                        data={heartData}
                    >
                        <ArgumentScale factory={scalePoint}/>
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <AreaSeries
                            name="HeartRate"
                            valueField="rate"
                            argumentField="seconds"
                            seriesComponent={Area}
                        />
                        <Animation/>
                        <Title
                            text={`Heart frequency: ${heartData[spo2Data.length - 1].rate}BPM`}
                            textComponent={Text}
                        />
                    </Chart>
                    <Chart
                        data={spo2Data}
                    >
                        <ArgumentScale factory={scalePoint}/>
                        <ArgumentAxis/>
                        <ValueAxis/>

                        <LineSeries
                            name="Saturation"
                            valueField="saturation"
                            argumentField="seconds"
                            seriesComponent={Line}
                        />
                        <Title
                            text={`SpO2 saturation: ${spo2Data[spo2Data.length - 1].saturation}%`}
                            textComponent={Text}
                        />
                        <Animation/>
                    </Chart>
                    <Grid container direction={"row"} justify={"center"} alignItems={"center"}
                          className={classes.statePaper}>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Sampling</InputLabel>
                                <Select
                                    native
                                    value={state.sampling}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "sampling",
                                        id: 'sampling',
                                    }}
                                >
                                    <option value={2}>2</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Length</InputLabel>
                                <Select
                                    native
                                    value={state.seriesLength}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "seriesLength",
                                        id: 'seriesLength',
                                    }}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <ArrowForward/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }

    return <MyMonitorDialog {...props}/>
})

export default MonitorDialog;