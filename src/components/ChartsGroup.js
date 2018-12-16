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


export default class ChartsGroup extends Component {

    bigChart = null;

    constructor(props) {
        super(props);
        this.state = {
            'yield': yieldsTypes[0],
            'meteo': {name: 'temp', label: 'Temperatura'}
        }
    }

    prepareSmallCharts() {
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
                        <input type={"radio"} name={"yield"} value={k} onChange={this.setYield.bind(this)} checked={this.state.yield.name === yieldsTypes[k].name}/>
                    </label>
                </div>
            )
        });
        return smallCharts;
    }

    setYield(event){
        let id = event.target.value;
        let y = yieldsTypes[id];
        console.log(y);
        this.setState({yield: y});
        console.log(this.bigChart);
    }

    prepareBigChart() {
        let series = [];
        this.props.regions.forEach(r => {
            series.push({
                "region": r,
                "type": "yield",
                "value": this.state.yield.name,
                "label": r + " " + this.state.yield.label
            });
            //series.push({"region": r, "type": "meteo", "value": this.state.meteo.name, "label": r + " " + this.state.meteo.label });
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
                {this.prepareSmallCharts()}
            </div>
        )
    }
}
