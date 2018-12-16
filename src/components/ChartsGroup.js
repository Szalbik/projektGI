import React, {Component} from "react";
import ComboChart from './charts/ComboChart';

const yieldsTypes = [
    {name: 'buraki_cukrowe', label: "Buraki cukrowe"},
    {name: 'gryka', label: "Gryka"},
    {name: 'jeczmien', label: "Jeczmien"},
    {name: 'kukurydza_na_ziarno', label: "Kukurydza na ziarno"},
    {name: 'owies', label: "Owies"},
    {name: 'proso', label: "Proso"},
    {name: 'pszenica', label: "Pszenica"},
    {name: 'pszenzyto', label: "Pszenżyto"},
    {name: 'rzepak_i_rzepik', label: "Rzepak i rzepik"},
    {name: 'ziemniaki', label: "Ziemniaki"},
    {name: 'zyto', label: "Żyto"}
];


export default class ChartsGroup extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let view = [];
        yieldsTypes.forEach(y => {
            let series = []
            this.props.regions.forEach(r => {
                series.push({"region": r, "type": "yield", "value": y.name, "label": r })
            });
            view.push(<div className={"w33"}>
                <ComboChart
                    title={y.label}
                    range={{start: "2003", stop: "2016"}}
                    axes={{
                        hAxisTitle: "Rok",
                        vAxis0Title: "Wielkość plonów w dt",
                        vAxis1Title: "Wielkość opadów w ml",
                    }}
                    series={series}
                />
            </div>)
        });
        return (
            <div className={"charts-group"}>
                <div className={"w100"}>
                    <ComboChart
                        title={"Wielkość plonów w stosunku do opadów"}
                        range={{start: "2003", stop: "2016"}}
                        axes={{
                            hAxisTitle: "Rok",
                            vAxis0Title: "Wielkość plonów w dt",
                            vAxis1Title: "Wielkość opadów w ml",
                        }}
                        series={[
                            {"region": "PL-DS", "type": "yield", "value": "zyto", "label": "Żyto DS"},
                            {"region": "PL-DS", "type": "yield", "value": "proso", "label": "Proso DS"},
                            {"region": "PL-WP", "type": "meteo", "value": "zyto", "label": "Żyto WP"}
                        ]}
                    />
                </div>
                {view}


            </div>
        )
    }
}
