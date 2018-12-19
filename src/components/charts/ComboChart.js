import React, {Component} from "react";
import {Chart} from 'react-google-charts'
import YieldsDataLoader from '../../utils/YieldsDataLoader';
import MeteoDataLoader from '../../utils/MeteoDataLoader';
import Regions from '../../utils/Regions';

export default class ComboChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            chartSeries: this.prepareSeries(props.series),
        };
        this.prepareData(this.props.series, this.props.range)
            .then(v => this.setState({chartData: v}));
    }

    componentWillReceiveProps(props) {
        this.prepareData(props.series, props.range)
            .then(v => this.setState({chartData: v}));
        this.setState({chartSeries: this.prepareSeries(props.series)});
    }


    async prepareData(series, range) {
        let chartColumns = [{"id": "year", "label": "Rok", "pattern": "", "type": "string"},];
        let chartRows = [];
        series.forEach(s => {
            chartColumns.push({id: s.value, label: s.label, type: "number"})
        });
        let year = range.start;
        // let years = []
        for (year; year <= range.stop; year++) {
            let row = {"c": [{v: year, f: null}]};
            series.forEach(async (s, k) => {
                if (s.id === "year") {
                    return;
                }
                let p;
                if (s.type === 'meteo') {
                    console.log(s.value + ", " + year + ", " + s.region);
                    p = await new MeteoDataLoader().avgOf(s.value, year, s.region, 3, 9);
                    console.log(p);
                }
                else if (s.type === 'yield') {
                    p = await YieldsDataLoader.single(year, s.value, 'dt/ha', s.region);
                }
                row.c[k + 1] = {v: p, f: null};
            });
            chartRows[year - range.start] = row;
        }
        return {cols: chartColumns, rows: chartRows};
    }

    prepareSeries(series) {
        let chartSeries = {};
        series.forEach((v, k) => {
            if (v.type === 'meteo') {
                chartSeries[k] = {targetAxisIndex: 1, type: 'line'}
            }
        });
        return chartSeries;
    }

    render() {
        return (
            <Chart
                width={"100%"}
                height={"100%"}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={this.state.chartData}
                options={{
                    title: this.props.title,
                    hAxis: {
                        title: this.props.axes.hAxisTitle,
                    },
                    vAxes: {
                        0: {
                            title: this.props.axes.vAxis0Title,
                            viewWindow: this.props.axes.vAxis0ViewWindow
                        },
                        1: {title: this.props.axes.vAxis1Title,
                            viewWindow: this.props.axes.vAxis1ViewWindow
                        },
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
