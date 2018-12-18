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
            { "id": "74", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "LD" }, 
            { "id": "72", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "DS" }, 
            { "id": "73", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "KP" }, 
            { "id": "75", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "LU" }, 
            { "id": "76", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "LB" }, 
            { "id": "77", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "MZ" }, 
            { "id": "78", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "MA" }, 
            { "id": "79", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "OP" }, 
            { "id": "80", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PK" }, 
            { "id": "81", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PD" }, 
            { "id": "82", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "PM" }, 
            { "id": "83", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "WN" }, 
            { "id": "84", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "WP" }, 
            { "id": "85", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "ZP" }, 
            { "id": "86", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "SL" }, 
            { "id": "87", "value": Math.random()*1000, "label": "Łódzkie", "shortLabel": "SK" }, 
        ]
    }
}
// Step 8 - Creating the DOM element to pass the react-fusioncharts component 
class Map extends React.Component {
  render() {
     return (
     <ReactFC
        {...chartConfigs}
        events={{
            entityClick: function (event, args) {
                console.log(args.label, 'clicked');
            }}
        }
        />
     );
  }
}

export default Map