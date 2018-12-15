import React, { Component } from "react";
import { Chart } from 'react-google-charts'
import YieldsDataLoader from '../../utils/YieldsDataLoader';

export default class ComboChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            chartSeries: this.prepareSeries(props.series)
        };
        this.prepareData(props.series, props.range)
            .then(v => this.setState({chartData: v}));
    }

    async prepareData(series, range){
        let chartColumns = [{"id":"year","label":"Rok","pattern":"","type":"string"},];
        let chartRows = [];
        series.forEach(s => {
            chartColumns.push({id: s.value, label: s.label, type: "number"})
        });
        let year = range.start;
        // let years = []
        for (year; year <= range.stop; year++) {
            let row = {"c":[{v: year, f: null}]};
            series.forEach(async (s,k) => {
                if(s.id === "year"){
                    return;
                }
                let p = await YieldsDataLoader.single(year,s.value, 'dt/ha',s.region);
                row.c[k+1] = {v: p, f: null};
                //p.then(value => row.c.push({v: value, f: null}));
            });
            chartRows[year - range.start] = row;
        }
        return {cols: chartColumns, rows: chartRows};
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
        )
    }
}
