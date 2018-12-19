// Step 1 - Including react
import React from 'react';

// Step 2 - Including the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Including the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Including the map renderer
import FusionMaps from 'fusioncharts/fusioncharts.maps';

// Step 5 - Including the map definition file
// import World from 'fusioncharts/maps/fusioncharts.world';
import Poland from 'fusionmaps/maps/fusioncharts.poland';

// Step 6 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 7 - Adding the map as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, Poland, FusionTheme);

// Step 8 - Creating the JSON object to store the map configurations
const chartConfigs = {
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
        // Source data as JSON --> id represents countries of world.
        "data": [
            { "id": "74", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-LD" },
            { "id": "72", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-DS" },
            { "id": "73", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-KP" },
            { "id": "75", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-LU" },
            { "id": "76", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-LB" },
            { "id": "77", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-MZ" },
            { "id": "78", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-MA" },
            { "id": "79", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-OP" },
            { "id": "80", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-PK" },
            { "id": "81", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-PD" },
            { "id": "82", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-PM" },
            { "id": "83", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-WN" },
            { "id": "84", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-WP" },
            { "id": "85", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-ZP" },
            { "id": "86", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-SL" },
            { "id": "87", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PL-SK" },
        ]
    }
}
// Step 8 - Creating the DOM element to pass the react-fusioncharts component 
class Map extends React.Component {
    state = {
        regions: []
    }

    toggleRegion = (event, args) => {
        const { regions } = this.state;
        if (regions.includes(args.shortLabel)) {
            let newRegions = regions.filter(region => region !== args.shortLabel)
            this.setState({regions: newRegions})
        } else {
            this.setState({regions: [...this.state.regions, args.shortLabel]})
        }
    }

  render() {
     return (
        <div className="Map">
            <ReactFC
                {...this.props.chartConfigs}
                fcEvent-entityClick={this.props.toggleRegion}
                />
        </div>
     );
  }
}

export default Map