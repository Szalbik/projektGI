import React from "react";
import {Chart} from 'react-google-charts'

class MyChartComponent extends React.Component {
    render() {
        return (
            <div style={{display: 'block', maxWidth: "100%"}}>
                <Chart
                    width={"100%"}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Wielkość plonów', 'Owies', 'Żyto'],
                        ['2003', 8175000, 8008000],
                        ['2004', 3792000, 3694000],
                        ['2005', 2695000, 2896000],
                        ['2006', 2099000, 1953000],
                        ['2007', 1526000, 1517000],
                    ]}
                    options={{
                        title: 'Wielkość plonów',
                        chartArea: {width: '30%'},
                        hAxis: {
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Wielkość plonów',
                        },
                        legend: "bottom"
                    }}
                    legendToggle
                />
                <Chart
                    width={"100%"}
                    height={'300px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Year', 'Opady', 'Temperatura'],
                        ['2003', 100, 22],
                        ['2004', 117, 23],
                        ['2005', 660, 16],
                        ['2006', 103, 18],
                    ]}
                    options={{
                        title: 'Dane meteorologiczne',
                        hAxis: {/*title: 'Year',*/ titleTextStyle: {color: '#333'}},
                        vAxis: {minValue: 0},
                        // For the legend to fit, we make the chart area smaller
                        chartArea: {width: '30%', height: '70%'},
                        // lineWidth: 25
                        series: {
                            0: {targetAxisIndex:0},
                            1:{targetAxisIndex:1},
                        },
                        legend: "bottom"
                    }}
                />
                <Chart
                    width={"100%"}
                    height={'300px'}
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Year', 'Temperatura', 'Owies', 'Żyto'],
                        ['2003', 22,8175000, 8008000],
                        ['2004', 23, 3792000, 3694000],
                        ['2005', 16, 2695000, 2896000],
                        ['2006', 18, 2099000, 1953000]
                    ]}

                    options={{
                        title: 'Wielkość plonów / temperatura ',
                        hAxis: {/*title: 'Year',*/ titleTextStyle: {color: '#333'}},
                        vAxis: {minValue: 0},
                        // For the legend to fit, we make the chart area smaller
                        chartArea: {width: '30%', height: '70%'},
                        // lineWidth: 25
                        seriesType: 'line',
                        series: {
                            0: {targetAxisIndex: 1},
                            1: {type: 'bars'},
                            2: {type: 'bars'}
                        },
                        legend: "bottom"
                    }}
                />
            </div>
        )
    }
}

export default MyChartComponent