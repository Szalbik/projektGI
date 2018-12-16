import * as d3 from "d3";
import _ from "lodash";

const regionsMap = {
  "PL-DS": {
    rowNumber: 1,
    name: "dolnośląskie",
    stationMeteo: "LASKI",
    stationClimatic: "BORUSOWA"
  },
  "PL-KP": {
    rowNumber: 2,
    name: "kujawsko-pomorskie",
    stationMeteo: "SZELEJEWO",
    stationClimatic: "LIDZBARK"
  },
  "PL-LU": {
    rowNumber: 3,
    name: "lubelskie",
    stationMeteo: "ZALESIE",
    stationClimatic: "OLECKO"
  },
  "PL-LB": {
    rowNumber: 4,
    name: "lubuskie",
    stationMeteo: "DOBIEGNIEW",
    stationClimatic: "MYSZYNIEC"
  },
  "PL-LD": {
    rowNumber: 5,
    name: "łódzkie",
    stationMeteo: "BOBROWNIKI",
    stationClimatic: "MIASTKO"
  },
  "PL-MA": {
    rowNumber: 6,
    name: "małopolskie",
    stationMeteo: "ZIELONKI",
    stationClimatic: "ZGORZELEC"
  },
  "PL-MZ": {
    rowNumber: 7,
    name: "mazowieckie",
    stationMeteo: "WINNICA",
    stationClimatic: "WARSZAWA-BIELANY"
  },
  "PL-OP": {
    rowNumber: 5,
    name: "opolskie",
    stationMeteo: "OPOLE LUBELSKIE",
    stationClimatic: "GRABIK"
  },
  "PL-PK": {
    rowNumber: 9,
    name: "podkarpackie",
    stationMeteo: "PASTERKA",
    stationClimatic: "POLKOWICE DOLNE"
  },
  "PL-PD": {
    rowNumber: 10,
    name: "podlaskie",
    stationMeteo: "SIEDLISKA",
    stationClimatic: "PRZELEWICE"
  },
  "PL-PM": {
    rowNumber: 11,
    name: "pomorskie",
    stationMeteo: "KOSTKOWO",
    stationClimatic: "SIELEC"
  },
  "PL-SL": {
    rowNumber: 12,
    name: "śląskie",
    stationMeteo: "GOSTYNIN",
    stationClimatic: "PRABUTY"
  },
  "PL-SK": {
    rowNumber: 13,
    name: "świętokrzyskie",
    stationMeteo: "KURZACZE",
    stationClimatic: "PAPROTKI"
  },
  "PL-WN": {
    rowNumber: 14,
    name: "warmińsko-mazurskie",
    stationMeteo: "DZIARNY",
    stationClimatic: "BOGATYNIA"
  },
  "PL-WP": {
    rowNumber: 15,
    name: "wielkopolskie",
    stationMeteo: "KONOJAD",
    stationClimatic: "ROZEWIE"
  },
  "PL-ZP": {
    rowNumber: 16,
    name: "zachodniopomorskie",
    stationMeteo: "GRABOWIEC",
    stationClimatic: "LISEWO"
  }
};

export default class MeteoDataLoader {
  static loadedMeteoData = [];
  static loadedClimaticData = [];
  static pickedData = [];

  static async avgOf(type = "rainfall", year, region = null, from = 8, to = 9) {
    //   this.loadedData = await d3.csv(`data/meteo/${year}.csv`, function(row) {
    //     const dateArray = row.data.split('-');
    //    return {
    //     date: new Date(dateArray[0], dateArray[1] - 1, dateArray[2]),
    //     temp: +row.temp,
    //     humidity: +row.humidity,
    //     rainfall: +row.rainfall
    //   }
    // })

    if (type === "rainfall") {
      this.loadedMeteoData = await d3.csv(`data/meteo/o_m_${year}.csv`, row => {
        if (row.Nazwa_stacji === regionsMap[region].stationMeteo) {
          // console.log(row);
          return {
            Kod_stacji: +row["Kod_stacji"],
            Nazwa_stacji: row["Nazwa_stacji"],
            Rok: +row["Rok"],
            Miesiąc: +row["Miesiąc"],
            Miesięczna_suma_opadów: +row["Miesięczna_suma_opadów_[mm]"]
          };
        }
      });
    } else {
      this.loadedClimaticData = await d3.csv(
        `data/meteo/k_m_t_${year}.csv`,
        row => {
          // console.log(row);
          if (row.Nazwa_stacji === regionsMap[region].stationClimatic) {
            return {
              Kod_stacji: +row["Kod_stacji"],
              Nazwa_stacji: row["Nazwa_stacji"],
              Rok: +row["Rok"],
              Miesiąc: +row["Miesiąc"],
              Średnia_miesięczna_temperatura: +row[
                "Średnia_miesięczna_temperatura_[°C]"
              ],
              Średnia_miesięczna_wilgotność_względna: +row[
                "Średnia_miesięczna_wilgotność_względna_[%]"
              ]
            };
          }
        }
      );
    }

    // if (row.Nazwa_stacji === regionsMap[region].stationMeteo) {
    //   console.log(row);
    // }

    if (type === "rainfall") {
      for (let index = from; index <= to; index++) {
        const row = this.loadedMeteoData.find(row => {
          return row.Miesiąc === index;
        });
        this.pickedData.push(row);
      }
      // console.log(this.pickedData);
    } else {
      for (let index = from; index <= to; index++) {
        const row = this.loadedClimaticData.find(row => {
          return row.Miesiąc === index;
        });
        this.pickedData.push(row);
      }
      // console.log(this.pickedData);
    }

    return this.pickedData;

    // console.log(this.loadedMeteoData);
    // let licznik = 0;
    // let sum = await this.loadedData.reduce((a, b) => {
    //   if (b.date.getMonth() >= from && b.date.getMonth() <= to) {
    //     licznik++;
    //     return (a + b[type])
    //   }
    //   return a + 0;
    // }, 0)
    // return  (sum / licznik);
  }
}
