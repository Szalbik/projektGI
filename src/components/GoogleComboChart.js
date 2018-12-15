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
};

class MyChartComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            chartData: this.prepareData(props.series, props.range),
            chartSeries: this.prepareSeries(props.series)
        };
        console.log(this.state.chartSeries)
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

    prepareSeries(series){
        let chartSeries = {};
        series.forEach((v,k) => {
            if(v.type === 'meteo'){
                chartSeries[k] = {targetAxisIndex: 1, type: 'line'}
            }
        });
        return chartSeries;
    }

    render() {
        return (
            <div style={{display: 'block', maxWidth: "100%"}}>
                <Chart
                    width={"100%"}
                    height={300}
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.chartData}
                    options={{
                        title: this.props.title,
                        hAxis: {
                            title: this.props.axes.hAxisTitle,
                        },
                        vAxes: {
                            0: {title: this.props.axes.vAxis0Title},
                            1: {title: this.props.axes.vAxis1Title},
                        },
                        legend: "bottom",
                        seriesType: 'bars',
                        series: this.state.chartSeries,
                    }}
                    legendToggle
                />
            </div>
        )
    }
}

export default MyChartComponent