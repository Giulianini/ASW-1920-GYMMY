import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Dialog, DialogContent, Slide} from "@material-ui/core";
import {AreaSeries, ArgumentAxis, Chart, Title, ValueAxis,} from '@devexpress/dx-react-chart-material-ui';
import {Animation, ArgumentScale, LineSeries} from '@devexpress/dx-react-chart';
import {scalePoint} from 'd3-scale';
import {area, curveCatmullRom, line,} from 'd3-shape';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const MonitorDialog = forwardRef((props, ref) => {
    const useStyles = makeStyles(() => ({
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
        }
    }))

    function MyMonitorDialog() {
        const classes = useStyles()
        const [open, setOpen] = React.useState(false)
        const [heartData, setHeartData] = useState([{seconds: 0, rate: 0}])
        const [heartId, setHeartId] = useState(0)
        const [spo2Data, setSpo2Data] = useState([{seconds: 0, saturation: 0}])
        const [spo2Id, setSpo2Id] = useState(0)
        const heartBaseRate = 100
        const heartRandomness = 10
        const spo2BaseRate = 97
        const spo2Randomness = 3
        const sampling = 2
        const seriesLength = 10

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
                let data
                if (heartData.length > seriesLength) {
                    data = heartData.slice(heartData.length - seriesLength, heartData.length)
                } else {
                    data = heartData.slice()
                }
                data.push({
                    seconds: lastSeconds + sampling,
                    rate: randomRate
                })
                setHeartData(data)
            }, 1000 * sampling)
            setHeartId(id)
            return function cleanup() {
                clearTimeout(heartId)
            }
        }, [heartData])

        useEffect(() => {
            const id = setTimeout(() => {
                const lastSeconds = spo2Data[spo2Data.length - 1].seconds
                const randomRate = Math.floor(Math.random() * spo2Randomness) + spo2BaseRate
                let data
                if (spo2Data.length > seriesLength) {
                    data = spo2Data.slice(spo2Data.length - seriesLength, spo2Data.length)
                } else {
                    data = spo2Data.slice()
                }
                data.push({
                    seconds: lastSeconds + sampling,
                    saturation: randomRate
                })
                setSpo2Data(data)
            }, 1000 * sampling)
            setSpo2Id(id)
            return function cleanup() {
                clearTimeout(spo2Id)
            }
        }, [spo2Data])

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
                </DialogContent>
            </Dialog>
        )
    }

    return <MyMonitorDialog {...props}/>
})

export default MonitorDialog;