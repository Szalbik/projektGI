import sun1 from "../images/markers/sunny_1.png";
import sun2 from "../images/markers/sunny_2.png";
import sun3 from "../images/markers/sunny_3.png";
import drop1 from "../images/markers/drop_1.png";
import drop2 from "../images/markers/drop_2.png";
import drop3 from "../images/markers/drop_3.png";

export default {
  type: "maps/poland",
  height: "30%",
  width: "100%",
  dataFormat: "json",
  dataSource: {
    // Map Configuration
    chart: {
      caption: "Średnie zbiory plonów w Polsce",
      subcaption: " 2003-2016",
      numbersuffix: "",
      includevalueinlabels: "1",
      labelsepchar: ": ",
      entityFillHoverColor: "#FFF9C4",
      theme: "fusion"
    },
    annotations: {
      groups: [
        {
          id: "Av Item1",
          items: [
            {
              id: "Av1",
              type: "image",
              url: sun1,
              x: "20",
              y: "350",
              xscale: "5",
              yscale: "5"
            },
            {
              id: "cs1",
              type: "text",
              text: "Ponad 9°C",
              x: "60",
              y: "365",
              color: "000000",
              align: "left"
            }
          ]
        },
        {
          id: "user-images2",
          items: [
            {
              id: "Avi2",
              type: "text",
              x: "60",
              align: "left",
              y: "515",
              color: "000000",
              text: "Ponad 45 [mm]"
            },
            {
              id: "cs2",
              type: "image",
              url: drop1,
              x: "20",
              y: "500",
              xscale: "5",
              yscale: "5"
            }
          ]
        },
        {
          id: "Av Item3",
          items: [
            {
              id: "Av3",
              type: "image",
              url: sun2,
              x: "20",
              y: "300",
              xscale: "5",
              yscale: "5"
            },
            {
              id: "cs3",
              type: "text",
              text: "Ponad 11.5°C",
              x: "80",
              y: "315",
              color: "000000",
              align: "left"
            }
          ]
        },
        {
          id: "user-images4",
          items: [
            {
              id: "Avi4",
              type: "text",
              x: "80",
              align: "left",
              y: "465",
              color: "000000",
              text: "Ponad 55 [mm]"
            },
            {
              id: "cs4",
              type: "image",
              url: drop2,
              x: "20",
              y: "450",
              xscale: "5",
              yscale: "5"
            }
          ]
        },
        {
          id: "Av Item5",
          items: [
            {
              id: "Av5",
              type: "image",
              url: sun3,
              x: "20",
              y: "250",
              xscale: "5",
              yscale: "5"
            },
            {
              id: "cs5",
              type: "text",
              text: "Ponad 13°C",
              x: "100",
              y: "265",
              color: "000000",
              align: "left"
            }
          ]
        },
        {
          id: "user-images6",
          items: [
            {
              id: "Avi6",
              type: "text",
              x: "100",
              align: "left",
              y: "415",
              color: "000000",
              text: "Ponad 65 [mm]"
            },
            {
              id: "cs6",
              type: "image",
              url: drop3,
              x: "20",
              y: "400",
              xscale: "5",
              yscale: "5"
            }
          ]
        }
      ]
    },
    markers: {
      items: [],
      shapes: [
        {
          id: "drop1",
          type: "image",
          url: drop1,
          xscale: "3",
          yscale: "3",
          labelpadding: "5"
        },
        {
          id: "drop2",
          type: "image",
          url: drop2,
          xscale: "3",
          yscale: "3",
          labelpadding: "5"
        },
        {
          id: "drop3",
          type: "image",
          url: drop3,
          xscale: "3",
          yscale: "3",
          labelpadding: "5"
        },
        {
          id: "sun1",
          type: "image",
          url: sun1,
          xscale: "3",
          yscale: "3",
          labelpadding: "5"
        },
        {
          id: "sun2",
          type: "image",
          url: sun2,
          xscale: "3",
          yscale: "3",
          labelpadding: "5"
        },
        {
          id: "sun3",
          type: "image",
          url: sun3,
          xscale: "3",
          yscale: "3",
          labelpadding: "5"
        }
      ]
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
          color: "#D7F14D"
        },
        {
          minvalue: "10",
          maxvalue: "13",
          color: "#8CEB00"
        },
        {
          minvalue: "13",
          maxvalue: "19",
          color: "#00D651"
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
        value: Math.random() * 1000,
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
  }
};
