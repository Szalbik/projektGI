export default {
  type: "maps/poland",
  height: "30%",
  width: "100%",
  dataFormat: "json",
  dataSource: {
      // Map Configuration
      chart: {
          caption: "Average Yield in Poland",
          subcaption: " 2003-2016",
          numbersuffix: "",
          includevalueinlabels: "1",
          labelsepchar: ": ",
          entityFillHoverColor: "#FFF9C4",
          theme: "fusion"
      },
      "annotations": {
          "groups": [
              {
                  "id": "Av Item",
                  "items": [
                      {
                          "id": "Av",
                          "type": "image",
                          "url": "https://cdn2.iconfinder.com/data/icons/gpsmapicons/orange/gpsmapicons02.png",
                          "x": "20",
                          "y": "500",
                          "xscale": "30",
                          "yscale": "25"
                      },
                      {
                          "id": "cs",
                          "type": "text",
                          "text": "Region and {br}Number of Availibility Zones",
                          "x": "60",
                          "y": "515",
                          "color": "000000",
                          "align": "left"
                      }
                  ]
              },
              {
                  "id": "user-images",
                  "items": [
                      {
                          "id": "Avi",
                          "type": "text",
                          "x": "60",
                          "align": "left",
                          "y": "475",
                          "color": "000000",
                          "text": "New Region {br} Coming soon"
                      },
                      {
                          "id": "cs",
                          "type": "image",
                          "url": "https://cdn2.iconfinder.com/data/icons/gpsmapicons/green/gpsmapicons05.png",
                          "x": "20",
                          "y": "460",
                          "xscale": "30",
                          "yscale": "25"
                      }
                  ]
              }
          ]
      },
      "markers": {
          "items": [
          ],
          "shapes": [
              {
                  "id": "we-anchor",
                  "type": "image",
                  "url": "https://cdn2.iconfinder.com/data/icons/gpsmapicons/orange/gpsmapicons02.png",
                  "xscale": "25",
                  "yscale": "20",
                  "labelpadding": "5"
              },
              {
                  "id": "aws-anchor",
                  "type": "image",
                  "url": "https://cdn2.iconfinder.com/data/icons/gpsmapicons/green/gpsmapicons05.png",
                  "xscale": "25",
                  "yscale": "20",
                  "labelpadding": "5"
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
}