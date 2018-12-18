import React from "react";
import { Chart } from "react-google-charts";

export default class Map extends React.Component {
  state = {
    choosenRegions: {
      "0": { "PL-DS": false },
      "1": { "PL-KP": false },
      "2": { "PL-LU": false },
      "3": { "PL-LB": false },
      "4": { "PL-LD": false },
      "5": { "PL-MA": false },
      "6": { "PL-MZ": false },
      "7": { "PL-OP": false },
      "8": { "PL-PK": false },
      "9": { "PL-PD": false },
      "10": { "PL-PM": false },
      "11": { "PL-SL": false },
      "12": { "PL-SK": false },
      "13": { "PL-WN": false },
      "14": { "PL-WP": false },
      "15": { "PL-ZP": false }
    }
  };

  onChartEvents = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    // const region = Object.keys(selection)[0]
    // this.setState({choosenRegions: { ...this.state.choosenRegions, region: !this.state.choosenRegions[region] }})
    console.log("You selected : ",JSON.stringify(selection));
  };

  render() {
    return (
      <div style={{ display: "block", maxWidth: "100%" }}>
        <Chart
          chartType="GeoChart"
          data={[
            ["Województwo", "Wielkość plonów", "Opady"],
            ["PL-DS", Math.random() * 1000, Math.random() * 100],
            ["PL-KP", Math.random() * 1000, Math.random() * 100],
            ["PL-LU", Math.random() * 1000, Math.random() * 100],
            ["PL-LB", Math.random() * 1000, Math.random() * 100],
            ["PL-LD", Math.random() * 1000, Math.random() * 100],
            ["PL-MA", Math.random() * 1000, Math.random() * 100],
            ["PL-MZ", Math.random() * 1000, Math.random() * 100],
            ["PL-OP", Math.random() * 1000, Math.random() * 100],
            ["PL-PK", Math.random() * 1000, Math.random() * 100],
            ["PL-PD", Math.random() * 1000, Math.random() * 100],
            ["PL-PM", Math.random() * 1000, Math.random() * 100],
            ["PL-SL", Math.random() * 1000, Math.random() * 100],
            ["PL-SK", Math.random() * 1000, Math.random() * 100],
            ["PL-WN", Math.random() * 1000, Math.random() * 100],
            ["PL-WP", Math.random() * 1000, Math.random() * 100],
            ["PL-ZP", Math.random() * 1000, Math.random() * 100]
          ]}
          options={{
            colorAxis: { colors: ["#00853f", "yellow", "#e31b23"] },
            chartArea: { width: "30%" },
            region: "PL",
            displayMode: "regions",
            resolution: "provinces",
            series: {
              1: {
                displayMode: "markers",
                targetAxisIndex: 1
              }
            }
          }}
          chartEvents={[
            {
              eventName: "select",
              callback: this.onChartEvents
            }
          ]}
        />
      </div>
    );
  }
}
