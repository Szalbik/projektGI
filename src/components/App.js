import React, { Component } from "react";
import ChartsGroup from "./ChartsGroup";
import Map from "./Map";
import MeteoDataLoader from "../utils/MeteoDataLoader";
import "./App.css";
import YieldsDataLoader from "../utils/YieldsDataLoader";

const dataSource = {
  chart: {
    caption: "AWS Global Infrastructure",
    subcaption: "Availability and coming soon locations",
    showentitytooltip: "0",
    showentityhovereffect: "0",
    showmarkerlabels: "0",
    markertooltext: "$label",
    theme: "fusion",
    nullentityfillcolor: "#90A4AE"
  },
  annotations: {
    groups: [
      {
        id: "Av Item",
        items: [
          {
            id: "Av",
            type: "image",
            url:
              "https://cdn2.iconfinder.com/data/icons/gpsmapicons/orange/gpsmapicons02.png",
            x: "20",
            y: "500",
            xscale: "30",
            yscale: "25"
          },
          {
            id: "cs",
            type: "text",
            text: "Region and {br}Number of Availibility Zones",
            x: "60",
            y: "515",
            color: "000000",
            align: "left"
          }
        ]
      },
      {
        id: "user-images",
        items: [
          {
            id: "Avi",
            type: "text",
            x: "60",
            align: "left",
            y: "475",
            color: "000000",
            text: "New Region {br} Coming soon"
          },
          {
            id: "cs",
            type: "image",
            url:
              "https://cdn2.iconfinder.com/data/icons/gpsmapicons/green/gpsmapicons05.png",
            x: "20",
            y: "460",
            xscale: "30",
            yscale: "25"
          }
        ]
      }
    ]
  },
  markers: {
    items: [
      {
        id: "awsg",
        shapeid: "we-anchor",
        x: "100.14",
        y: "150.9",
        label: "AWS GOVCLOUD",
        value: "2",
        tooltext: "$label {br} Number of Availibility Zones: $value",
        labelpos: "left"
      }
    ],
    shapes: [
      {
        id: "we-anchor",
        type: "image",
        url:
          "https://cdn2.iconfinder.com/data/icons/gpsmapicons/orange/gpsmapicons02.png",
        xscale: "25",
        yscale: "20",
        labelpadding: "5"
      }
    ]
  }
};

class App extends Component {
  state = {
    meteoLoaded: false,
    yieldsLoaded: false,
    regionsDataLoaded: false,
    configCharts: {
      type: "maps/poland",
      height: "30%",
      width: "100%",
      dataFormat: "json",
      dataSource: {
        // Map Configuration
        chart: {
          caption: "Average Yield in Poland",
          subcaption: "2003-2016",
          numbersuffix: "",
          includevalueinlabels: "1",
          labelsepchar: ": ",
          showentitytooltip: "0",
          showmarkerlabels: "0",
          markertooltext: "$label",
          entityFillHoverColor: "#FFF9C4",
          theme: "fusion"
        },
        // Aesthetics; ranges synced with the slider
        colorrange: {
          minvalue: "0",
          code: "#FFE0B2",
          gradient: "1",
          color: [
            {
              minvalue: "0",
              maxvalue: "10",
              color: "#FFD74D"
            },
            {
              minvalue: "10",
              maxvalue: "13",
              color: "#FB8C00"
            },
            {
              minvalue: "13",
              maxvalue: "19",
              color: "#E65100"
            }
          ]
        },
        // Source data as JSON --> id represents regions of Poland.
        data: [
          {
            id: "74",
            value: Math.random() * 1000,
            label: "Łódzkie",
            shortLabel: "LD"
          },
          {
            id: "72",
            value: YieldsDataLoader.avgOf("all", "dt/ha", "PL-DS"),
            label: "Dolnośląskie",
            shortLabel: "DS",
            color: "black"
          },
          {
            id: "73",
            value: Math.random() * 1000,
            label: "Kujawsko-Pomorskie",
            shortLabel: "KP"
          },
          {
            id: "75",
            value: Math.random() * 1000,
            label: "Lubelskie",
            shortLabel: "LU"
          },
          {
            id: "76",
            value: Math.random() * 1000,
            label: "Lubuskie",
            shortLabel: "LB"
          },
          {
            id: "78",
            value: Math.random() * 1000,
            label: "Mazowieckie",
            shortLabel: "MZ"
          },
          {
            id: "77",
            value: Math.random() * 1000,
            label: "Małopolskie",
            shortLabel: "MA"
          },
          {
            id: "79",
            value: Math.random() * 1000,
            label: "Opolskie",
            shortLabel: "OP"
          },
          {
            id: "80",
            value: Math.random() * 1000,
            label: "Podkarpackie",
            shortLabel: "PK"
          },
          {
            id: "81",
            value: Math.random() * 1000,
            label: "Podlaskie",
            shortLabel: "PD"
          },
          {
            id: "82",
            value: Math.random() * 1000,
            label: "Pomorskie",
            shortLabel: "PM"
          },
          {
            id: "85",
            value: Math.random() * 1000,
            label: "Warmińsko-Mazurskie",
            shortLabel: "WN"
          },
          {
            id: "86",
            value: Math.random() * 1000,
            label: "Wielkopolskie",
            shortLabel: "WP",
            color: "black"
          },
          {
            id: "87",
            value: Math.random() * 1000,
            label: "Zachodniopomorskie",
            shortLabel: "ZP"
          },
          {
            id: "83",
            value: Math.random() * 1000,
            label: "Śląskie",
            shortLabel: "SL"
          },
          {
            id: "84",
            value: Math.random() * 1000,
            label: "Świętokrzyskie",
            shortLabel: "SK"
          }
        ]
      },
      markers: {
        items: [
          {
            id: "pol",
            shapeid: "we-anchor",
            x: "365.14",
            y: "118.9",
            label: "Poland",
            value: "1",
            tooltext: "In Poland, WeWork has <b>$value</b> co-working location"
          }
        ],
        shapes: [
          {
            id: "we-anchor",
            type: "image",
            url:
              "https://cdn3.iconfinder.com/data/icons/iconic-1/32/map_pin_fill-512.png",
            xscale: "4",
            yscale: "4"
          }
        ]
      }
    },
    regions: ["PL-WP", "PL-DS"]
  };

  componentDidMount() {
    const { configCharts } = this.state;
    const { dataSource } = this.state.configCharts;

    const { data } = this.state.configCharts.dataSource;
    MeteoDataLoader.loadData().then(() => this.setState({ meteoLoaded: true }));
    YieldsDataLoader.loadData()
      .then(() => this.setState({ yieldsLoaded: true }))
      .then(() => {
        data.forEach(region => {
          region.value = YieldsDataLoader.avgOf(
            "all",
            "dt/ha",
            `PL-${region.shortLabel}`
          );
        });
        this.setState({
          configCharts: {
            ...configCharts,
            dataSource: { ...dataSource, data: data }
          }
        });
      });
  }

  toggleRegion = (event, args) => {
    console.log(event);
    const { regions } = this.state;
    const { configCharts } = this.state;
    const { dataSource } = this.state.configCharts;
    const { data } = this.state.configCharts.dataSource;
    const newData = data.filter(elem => elem.shortLabel !== args.shortLabel);
    let row = data.find(elem => elem.shortLabel === args.shortLabel);
    if (regions.includes("PL-" + args.shortLabel)) {
      delete row["color"];
      this.setState({
        configCharts: {
          ...configCharts,
          dataSource: { ...dataSource, data: [...newData, { ...row }] }
        }
      });
    } else {
      this.setState({
        configCharts: {
          ...configCharts,
          dataSource: {
            ...dataSource,
            data: [...newData, { ...row, color: "black" }]
          }
        }
      });
    }

    if (regions.includes("PL-" + args.shortLabel)) {
      let newRegions = regions.filter(
        region => region !== "PL-" + args.shortLabel
      );
      this.setState({ regions: newRegions });
    } else {
      this.setState({
        regions: [...this.state.regions, "PL-" + args.shortLabel]
      });
    }
  };

  render() {
    const { meteoLoaded, yieldsLoaded, regions, configCharts } = this.state;
    if (meteoLoaded && yieldsLoaded) {
      return (
        <div className="App">
          <Map chartConfigs={configCharts} toggleRegion={this.toggleRegion} />
          {regions.length !== 0 && <ChartsGroup regions={regions} />}
        </div>
      );
    } else {
      return <div>Loading data ...</div>;
    }
  }
}

export default App;
