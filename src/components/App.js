import React, {Component} from "react";
import Map from "./Map";
import ChartsGroup from "./ChartsGroup";
import MeteoDataLoader from "../utils/MeteoDataLoader";
import YieldsDataLoader from "../utils/YieldsDataLoader";
import Regions from "../utils/Regions";
import FusionChartConfig from '../utils/FusionChartConfig';
import "./App.css";

class App extends Component {
    state = {
        meteoLoaded: false,
        yieldsLoaded: false,
        regionsDataLoaded: false,
        configCharts: FusionChartConfig,
        regions: ["PL-WP", "PL-DS"]
    };

    componentDidMount() {
        const {configCharts} = this.state;
        const {dataSource} = this.state.configCharts;

        const {data} = this.state.configCharts.dataSource;
        const {items} = this.state.configCharts.dataSource.markers;
        MeteoDataLoader.loadData().then(() => this.setState({meteoLoaded: true}));
        YieldsDataLoader.loadData()
            .then(() => this.setState({yieldsLoaded: true}))
            .then(() => {
                data.forEach(region => {
                    region.value = YieldsDataLoader.avgOf(
                        "all",
                        "dt/ha",
                        `PL-${region.shortLabel}`
                    );
                });
                let i = 0;
                for(var r in Regions){
                    items[i] = {
                        "id": r + "_rainfall",
                        "shapeid": "we-anchor",
                        "x": Regions[r].x ,
                        "y": Regions[r].y - 10,
                        "label":  r + "_rainfall",
                        "value": "3",
                        "tooltext":"",
                        "labelpos": "bottom"
                    };
                    i++;
                    items[i] = {
                        "id": r + "_temp",
                        "shapeid": "aws-anchor",
                        "x": Regions[r].x,
                        "y": Regions[r].y + 15,
                        "label":  r + "_temp",
                        "value": "3",
                        "tooltext": "",//new MeteoDataLoader().avgOf("temp", 2003, r),
                        "labelpos": "bottom"
                    };
                    i++;
                }
                this.setState({
                    configCharts: {
                        ...configCharts,
                        dataSource: {...dataSource, data: data}
                    }
                });
            });
    }

    toggleRegion = (event, args) => {
        const {regions} = this.state;
        const {configCharts} = this.state;
        const {dataSource} = this.state.configCharts;
        const {data} = this.state.configCharts.dataSource;
        const newData = data.filter(elem => elem.shortLabel !== args.shortLabel);
        let row = data.find(elem => elem.shortLabel === args.shortLabel);
        if (regions.includes("PL-" + args.shortLabel)) {
            delete row["color"];
            this.setState({
                configCharts: {
                    ...configCharts,
                    dataSource: {...dataSource, data: [...newData, {...row}]}
                }
            });
        } else {
            this.setState({
                configCharts: {
                    ...configCharts,
                    dataSource: {
                        ...dataSource,
                        data: [...newData, {...row, color: "black"}]
                    }
                }
            });
        }

        if (regions.includes("PL-" + args.shortLabel)) {
            let newRegions = regions.filter(
                region => region !== "PL-" + args.shortLabel
            );
            this.setState({regions: newRegions});
        } else {
            this.setState({
                regions: [...this.state.regions, "PL-" + args.shortLabel]
            });
        }
    };

    render() {
        const {meteoLoaded, yieldsLoaded, regions, configCharts} = this.state;
        if (meteoLoaded && yieldsLoaded) {
            return (
                <div className="App">
                    <Map chartConfigs={configCharts} toggleRegion={this.toggleRegion}/>
                    {regions.length !== 0 && <ChartsGroup regions={regions}/>}
                </div>
            );
        } else {
            return <div>Loading data ...</div>;
        }
    }
}

export default App;
