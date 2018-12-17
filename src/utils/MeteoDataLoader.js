import * as d3 from "d3";

const regionsMap = {
  "PL-DS": {
    rowNumber: 1,
    name: "dolnośląskie"
  },
  "PL-KP": {
    rowNumber: 2,
    name: "kujawsko-pomorskie"
  },
  "PL-LU": {
    rowNumber: 3,
    name: "lubelskie"
  },
  "PL-LB": {
    rowNumber: 4,
    name: "lubuskie"
  },
  "PL-LD": {
    rowNumber: 5,
    name: "łódzkie"
  },
  "PL-MA": {
    rowNumber: 6,
    name: "małopolskie"
  },
  "PL-MZ": {
    rowNumber: 7,
    name: "mazowieckie"
  },
  "PL-OP": {
    rowNumber: 5,
    name: "opolskie"
  },
  "PL-PK": {
    rowNumber: 9,
    name: "podkarpackie"
  },
  "PL-PD": {
    rowNumber: 10,
    name: "podlaskie"
  },
  "PL-PM": {
    rowNumber: 11,
    name: "pomorskie"
  },
  "PL-SL": {
    rowNumber: 12,
    name: "śląskie"
  },
  "PL-SK": {
    rowNumber: 13,
    name: "świętokrzyskie"
  },
  "PL-WN": {
    rowNumber: 14,
    name: "warmińsko-mazurskie"
  },
  "PL-WP": {
    rowNumber: 15,
    name: "wielkopolskie"
  },
  "PL-ZP": {
    rowNumber: 16,
    name: "zachodniopomorskie"
  }
};

export default class MeteoDataLoader {
  static loadedData = {};
  
  constructor() {
    this.pickedData = [];
  }

  static async loadData() {
    for (let year = 2003; year <= 2016; year++) {
      this.loadedData[`meteo${year}`] = await d3.csv(`data/meteo/new_o_m_${year}.csv`, row => {    
        return {
          Kod_stacji: +row["Kod_stacji"],
          Nazwa_stacji: row["Nazwa_stacji"],
          Rok: +row["Rok"],
          Miesiąc: +row["Miesiąc"],
          Miesięczna_suma_opadów: +row["Miesięczna_suma_opadów_[mm]"],
          Region: row['Region']
        };
      });

      this.loadedData[`climatic${year}`] = await d3.csv(
        `data/meteo/new_k_m_t_${year}.csv`,
        row => {        
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
            ],
            Region: row['Region']
          };
        }
      );
    }
  }


  // async avgOf(type = "rainfall", year, region = null, from = 8, to = 9) {
  //   if (type === "rainfall") {
  //     this.loadedMeteoData = await d3.csv(`data/meteo/o_m_${year}.csv`, row => {
  //       if (row.Nazwa_stacji === regionsMap[region].stationMeteo) {
  //         return {
  //           Kod_stacji: +row["Kod_stacji"],
  //           Nazwa_stacji: row["Nazwa_stacji"],
  //           Rok: +row["Rok"],
  //           Miesiąc: +row["Miesiąc"],
  //           Miesięczna_suma_opadów: +row["Miesięczna_suma_opadów_[mm]"]
  //         };
  //       }
  //     });
  //   } else {
  //     this.loadedClimaticData = await d3.csv(
  //       `data/meteo/k_m_t_${year}.csv`,
  //       row => {
  //         if (row.Nazwa_stacji === regionsMap[region].stationClimatic) {
  //           return {
  //             Kod_stacji: +row["Kod_stacji"],
  //             Nazwa_stacji: row["Nazwa_stacji"],
  //             Rok: +row["Rok"],
  //             Miesiąc: +row["Miesiąc"],
  //             Średnia_miesięczna_temperatura: +row[
  //               "Średnia_miesięczna_temperatura_[°C]"
  //             ],
  //             Średnia_miesięczna_wilgotność_względna: +row[
  //               "Średnia_miesięczna_wilgotność_względna_[%]"
  //             ]
  //           };
  //         }
  //       }
  //     );
  //   }

  //   let result = 0;

  //   if (type === "humidity") {
  //     for (let index = from; index <= to; index++) {
  //       const row = this.loadedClimaticData.find(row =>  row.Miesiąc === index);
  //       this.pickedData.push(row);
  //     }
  //     let sum = this.pickedData.reduce((a, b) =>  a + b.Średnia_miesięczna_wilgotność_względna, 0)

  //     result = sum / this.pickedData.length
  //   } else if (type === 'temp') {
  //     for (let index = from; index <= to; index++) {
  //       const row = this.loadedClimaticData.find(row => row.Miesiąc === index );
  //       this.pickedData.push(row);
  //     }
  //     let sum = this.pickedData.reduce((a, b) => a + b.Średnia_miesięczna_temperatura, 0);

  //     result = sum / this.pickedData.length
  //   } else if(type === 'rainfall') {
  //     for (let index = from; index <= to; index++) {
  //       const row = this.loadedMeteoData.find(row => row.Miesiąc === index);
  //       this.pickedData.push(row);
  //     }      
  //     let sum = this.pickedData.reduce((a, b) => a + b.Miesięczna_suma_opadów, 0)

  //     result = sum / this.pickedData.length;
  //   }

  //   return result;
  // }
}
