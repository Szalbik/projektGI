import React from "react";
import {Chart} from 'react-google-charts'
import * as d3  from 'd3';

class MyChartComponent extends React.Component {
    render() {
        return (
            <div style={{display: 'block', maxWidth: "100%"}}>
                <Chart
                    chartType="GeoChart"

                    data={[
                        ['Województwo', 'Wielkość plonów',"Opady"],
                        ['PL-DS', 200, 100],
                        ['PL-KP', 300, 130],
                        ['PL-LU', 400, 150],
                        ['PL-LB', 500, 120],
                    ]}

                    options={{
                        colorAxis: {colors: ['#00853f', 'yellow', '#e31b23']},
                        chartArea: {width: '30%'},
                        region: "PL",
                        displayMode: 'regions',
                        resolution: 'provinces',
                        series:{
                            1: {
                                displayMode: "markers",
                                targetAxisIndex:1
                            }
                        }
                    }}

                />
            </div>
        )
    }
}

export default MyChartComponent