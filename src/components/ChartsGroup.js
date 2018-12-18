import React, {Component} from "react";
import ComboChart from './charts/ComboChart';

const yieldsTypes = [
    {name: 'gryka', label: "Gryka"},
    {name: 'jeczmien', label: "Jęczmien"},
    {name: 'kukurydza_na_ziarno', label: "Kukurydza na ziarno"},
    {name: 'owies', label: "Owies"},
    {name: 'proso', label: "Proso"},
    {name: 'pszenica', label: "Pszenica"},
    {name: 'zyto', label: "Żyto"},
    {name: 'pszenzyto', label: "Pszenżyto"},
    {name: 'rzepak_i_rzepik', label: "Rzepak i rzepik"},
    {name: 'ziemniaki', label: "Ziemniaki"},
    {name: 'buraki_cukrowe', label: "Buraki cukrowe"}
];

const meteoTypes = [
    {name: 'rainfall', label: "Opday deszczu", axisLabel: "Wielkość opadów w ml"},
    {name: 'humidity', label: "Wilgotność powietrza", axisLabel: "Wilgotność powietrza w "},
    {name: 'temp', label: "Temperatura powietrza", axisLabel: "Temperatura powietrza w °C"},
];


export default class ChartsGroup extends Component {

    bigChart = null;

    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
            'yield': yieldsTypes[0],
            'meteo': {name: 'temp', label: 'Temperatura'}
        }
    }

    componentWillReceiveProps(props) {
        this.setState({refresh: !this.state.refresh});
    }

    prepareMeteoCharts() {
        let smallCharts = [];
        meteoTypes.forEach((y, k) => {
            let series = [];
            this.props.regions.forEach(r => {
                series.push({"region": r, "type": "meteo", "value": y.name, "label": r})
            });
            smallCharts.push(
                <div className={"small-chart"}>
                    <label>
                        <ComboChart
                            title={y.label}
                            range={{start: "2003", stop: "2016"}}
                            axes={{
                                hAxisTitle: "Rok",
                                vAxis0Title: "Wielkość plonów w dt/ha",
                                vAxis1Title: y.axisLabel,
                            }}
                            series={series}
                        />
                        <input type={"radio"} name={"meteo"} value={k} onChange={this.setMeteo.bind(this)}
                               checked={this.state.meteo.name === meteoTypes[k].name}/>
                    </label>
                </div>
            )
        });
        return smallCharts;
    }

    prepareYieldsCharts() {
        let smallCharts = [];
        yieldsTypes.forEach((y, k) => {
            let series = [];
            this.props.regions.forEach(r => {
                series.push({"region": r, "type": "yield", "value": y.name, "label": r})
            });
            let max = 80;
            if (y.name === 'ziemniaki' || y.name === 'buraki_cukrowe') {
                max = 800;
            }
            smallCharts.push(
                <div className={"small-chart"}>
                    <label>
                        <ComboChart
                            title={y.label}
                            range={{start: "2003", stop: "2016"}}
                            axes={{
                                hAxisTitle: "Rok",
                                vAxis0Title: "Wielkość plonów w dt/ha",
                                vAxis1Title: "Wielkość opadów w ml",
                                vAxis0ViewWindow: {max: max, min: 0},
                            }}
                            series={series}
                        />
                        <input type={"radio"} name={"yield"} value={k} onChange={this.setYield.bind(this)}
                               checked={this.state.yield.name === yieldsTypes[k].name}/>
                    </label>
                </div>
            )
        });
        return smallCharts;
    }

    setYield(event) {
        let id = event.target.value;
        let y = yieldsTypes[id];
        this.setState({yield: y});
    }

    setMeteo(event) {
        let id = event.target.value;
        let y = meteoTypes[id];
        this.setState({meteo: y});
    }

    prepareBigChart() {
        let series = [];
        this.props.regions.forEach(r => {
            series.push({
                "region": r,
                "type": "yield",
                "value": this.state.yield.name,
                "label": r
            });
            series.push({
                "region": r,
                "type": "meteo",
                "value": this.state.meteo.name,
                "label": r
            });
        });
        this.bigChart = (
            <div className={"big-chart"}>
                <ComboChart
                    title={this.state.yield.label + " / " + this.state.meteo.label}
                    range={{start: "2003", stop: "2016"}}
                    axes={{
                        hAxisTitle: "Rok",
                        vAxis0Title: "Wielkość plonów w dt/ha",
                        vAxis1Title: "Wielkość opadów w ml",
                        vAxis1ViewWindow: {min: 0},
                    }}
                    series={series}
                />
            </div>
        )
        return (<div className={"big-chart"}>
            {this.bigChart}
        </div>)
    }

    render() {

        return (
            <div className={"charts-group"}>
                {this.prepareBigChart()}
                {this.prepareMeteoCharts()}
                {this.prepareYieldsCharts()}
            </div>
        )
    }
}
