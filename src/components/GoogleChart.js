import React from "react";
import {Chart} from 'react-google-charts'
import * as d3  from 'd3';


const regionsMap = {
    "PL-DS": {rowNumber: 1, name: "dolnośląskie"},
    "PL-KP": {rowNumber: 2, name: "kujawsko-pomorskie"},
    "PL-LU": {rowNumber: 3, name: "lubelskie"},
    "PL-LB": {rowNumber: 4, name: "lubuskie"},
    "PL-LD": {rowNumber: 5, name: "łódzkie"},
    "PL-MA": {rowNumber: 6, name: "małopolskie"},
    "PL-MZ": {rowNumber: 7, name: "mazowieckie"},
    "PL-OP": {rowNumber: 5, name: "opolskie"},
    "PL-PK": {rowNumber: 9, name: "podkarpackie"},
    "PL-PD": {rowNumber: 10, name: "podlaskie"},
    "PL-PM": {rowNumber: 11, name: "pomorskie"},
    "PL-SL": {rowNumber: 12, name: "śląskie"},
    "PL-SK": {rowNumber: 13, name: "świętokrzyskie"},
    "PL-WN": {rowNumber: 14, name: "warmińsko-mazurskie"},
    "PL-WP": {rowNumber: 15, name: "wielkopolskie"},
    "PL-ZP": {rowNumber: 16, name: "zachodniopomorskie"},
}

class MyChartComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            chartData: this.prepareData(props.series, props.range)
        };
        console.log(this.state.chartData)
    }

    prepareData(series, range){
        let chartColumns = [{"id":"year","label":"Rok","pattern":"","type":"string"},];
        let chartRows = [];
        series.forEach(s => {
            chartColumns.push({id: s.value, label: s.label, type: "number"})
        });
        let i = range.start;
        for (i; i <= range.stop; i++) {
            let row = {"c":[{v: i, f: null}]};
            series.forEach(s => {
                if(s.id === "year"){
                    return;
                }
                let p = this.loadData(i,s.value, 'dt/ha',s.region);
                p.then(value => row.c.push({v: value, f: null}));
            });
            chartRows.push(row);
        }
        return {cols: chartColumns, rows: chartRows};
    }

    async loadData(year, what, columnName,region) {
        let parsedData = [];
        await d3.csv('data/yields/' + year + "_" + what + ".csv", data => parsedData.push(data))
        return parseFloat(parsedData[regionsMap[region].rowNumber][columnName].replace(/\s/g, ''));
    }


    render() {
        let parsedData = [];
        d3.csv('data/pszenica.csv', data => parsedData.push(data))
            .then(() => {
                console.log(parsedData)
            });
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
                <Chart
                    width={"100%"}
                    height={300}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.chartData}
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