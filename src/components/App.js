import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import './App.css';
import YieldsDataLoader from "../utils/YieldsDataLoader";

class App extends Component {
    state = {
        meteoLoaded: false,
        yieldsLoaded: false,
        configCharts: {
            type: 'maps/poland',
            width: '800',
            height: '550',
            dataFormat: 'json',
            dataSource: {
            // Map Configuration
                "chart": {
                        "caption": "Average Yield in Poland",
                        "subcaption": " 2003-2016",
                        "numbersuffix": "",
                        "includevalueinlabels": "1",
                        "labelsepchar": ": ",
                        "entityFillHoverColor": "#FFF9C4",
                        "theme": "fusion"
                },
                // Aesthetics; ranges synced with the slider
                "colorrange": {
                    "minvalue": "0",
                    "code": "#FFE0B2",
                    "gradient": "1",
                    "color": [{
                        "minvalue": "0.5",
                        "maxvalue": "300",
                        "color": "#FFD74D"
                    }, {
                        "minvalue": "300",
                        "maxvalue": "700",
                        "color": "#FB8C00"
                    }, {
                        "minvalue": "700",
                        "maxvalue": "1000",
                        "color": "#E65100"
                    }]
                },
                // Source data as JSON --> id represents regions of Poland.
                "data": [
                    { "id": "74", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "LD" },
                    { "id": "72", "value": Math.random()*1000, "label": "Dolnośląskie", "shortLabel": "DS" },
                    { "id": "73", "value": Math.random()*1000, "label": "Kujawsko-Pomorskie", "shortLabel": "KP" },
                    { "id": "75", "value": Math.random()*1000, "label": "Lubelskie", "shortLabel": "LU" },
                    { "id": "76", "value": Math.random()*1000, "label": "Lubuskie", "shortLabel": "LB" },
                    { "id": "78", "value": Math.random()*1000, "label": "Mazowieckie", "shortLabel": "MZ" },
                    { "id": "77", "value": Math.random()*1000, "label": "Małopolskie", "shortLabel": "MA" },
                    { "id": "79", "value": Math.random()*1000, "label": "Opolskie", "shortLabel": "OP" },
                    { "id": "80", "value": Math.random()*1000, "label": "Podkarpackie", "shortLabel": "PK" },
                    { "id": "81", "value": Math.random()*1000, "label": "Podlaskie", "shortLabel": "PD" },
                    { "id": "82", "value": Math.random()*1000, "label": "Pomorskie", "shortLabel": "PM" },
                    { "id": "85", "value": Math.random()*1000, "label": "Warmińsko-Mazurskie", "shortLabel": "WN" },
                    { "id": "86", "value": Math.random()*1000, "label": "Wielkopolskie", "shortLabel": "WP" },
                    { "id": "87", "value": Math.random()*1000, "label": "Zachodniopomorskie", "shortLabel": "ZP", color: 'black' },
                    { "id": "83", "value": Math.random()*1000, "label": "Śląskie", "shortLabel": "SL" },
                    { "id": "84", "value": Math.random()*1000, "label": "Świętokrzyskie", "shortLabel": "SK" },
                ]
            }
        },
        regions: ['PL-WP', 'PL-DS']
    }

    componentDidMount() {
        MeteoDataLoader.loadData().then(() => this.setState({ meteoLoaded: true }))
        YieldsDataLoader.loadData().then(() => this.setState({ yieldsLoaded: true }))
    }

    toggleRegion = (event, args) => {
        const { regions } = this.state;
        // console.log(this.state.configCharts.dataSource);
        const { configCharts } = this.state;
        const { dataSource } = this.state.configCharts;
        const { data } = this.state.configCharts.dataSource;
        const newData = data.filter(elem => elem.shortLabel !== args.shortLabel)
        let row = data.find(elem => elem.shortLabel === args.shortLabel)
        if (regions.includes(args.shortLabel)) {
            delete row['color']
            this.setState({ configCharts: { ...configCharts, dataSource: { ...dataSource, data: [...newData, { ...row } ] }  } })
        } else {
            this.setState({ configCharts: { ...configCharts, dataSource: { ...dataSource, data: [...newData, { ...row, color: "black" } ] }  } })
        }

        if (regions.includes(args.shortLabel)) {
            let newRegions = regions.filter(region => region !== args.shortLabel)
            this.setState({regions: newRegions})
        } else {
            this.setState({regions: [...this.state.regions, args.shortLabel]})
        }
    }

    addRegion(){
        this.setState({regions: [...this.state.regions, 'PL-PM']})
    }

    render() {
        if(this.state.meteoLoaded && this.state.yieldsLoaded) {
            return (
                <div className="App">
                    <Map chartConfigs={this.state.configCharts} toggleRegion={this.toggleRegion} />
                    <button onClick={this.addRegion.bind(this)}>click here to add region</button>
                    <ChartsGroup regions={this.state.regions}/>
                </div>
            );
        }
        else {
            return (<div>Loading data ...</div>)
        }
    }
}

export default App;
