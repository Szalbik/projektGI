import * as d3 from "d3";

export default class MeteoDataLoader {
  static data = {};

  constructor() {
    this.pickedData = [];
  }

  static async loadData() {
    for (let year = 2003; year <= 2016; year++) {
      this.data[`meteo${year}`] = await d3.csv(
        `data/meteo/new_o_m_${year}.csv`,
        row => {
          return {
            Kod_stacji: +row["Kod_stacji"],
            Nazwa_stacji: row["Nazwa_stacji"],
            Rok: +row["Rok"],
            Miesiąc: +row["Miesiąc"],
            Miesięczna_suma_opadów: +row["Miesięczna_suma_opadów_[mm]"],
            Region: row["Region"]
          };
        }
      );

      this.data[`climatic${year}`] = await d3.csv(
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
            Region: row["Region"]
          };
        }
      );
    }

    return this.data;
  }

  avgOf(type = "rainfall", year = 2003, region = "PL-DS", from = 8, to = 9) {
    const average = () => {
      switch (type.toUpperCase()) {
        case "TEMP":
          this.pickedData = MeteoDataLoader.data[`climatic${year}`].filter(
            row =>
              row.Region === region.toUpperCase() &&
              row.Miesiąc >= from &&
              row.Miesiąc <= to
          );
          result =
            this.pickedData.reduce(
              (a, b) => a + b.Średnia_miesięczna_temperatura,
              0
            ) / this.pickedData.length;
          break;
        case "HUMIDITY":
          this.pickedData = MeteoDataLoader.data[`climatic${year}`].filter(
            row =>
              row.Region === region.toUpperCase() &&
              row.Miesiąc >= from &&
              row.Miesiąc <= to
          );
          result =
            this.pickedData.reduce(
              (a, b) => a + b.Średnia_miesięczna_wilgotność_względna,
              0
            ) / this.pickedData.length;
          break;
        default:
          this.pickedData = MeteoDataLoader.data[`meteo${year}`].filter(
            row =>
              row.Region === region.toUpperCase() &&
              row.Miesiąc >= from &&
              row.Miesiąc <= to
          );
          result =
            this.pickedData.reduce((a, b) => a + b.Miesięczna_suma_opadów, 0) /
            this.pickedData.length;
          break;
      }
    };

    const averageAll = () => {
      switch (type.toUpperCase()) {
        case "TEMP":
          for (let i = 2003; i < 2017; i++) {
            this.pickedData = MeteoDataLoader.data[`climatic${i}`].filter(
              row =>
                row.Region === region.toUpperCase() &&
                row.Miesiąc >= from &&
                row.Miesiąc <= to
            );
            result +=
              this.pickedData.reduce(
                (a, b) => a + b.Średnia_miesięczna_temperatura,
                0
              ) / this.pickedData.length;
          }
          result = result / 14;
          break;
        default:
        for (let i = 2003; i < 2017; i++) {
          this.pickedData = MeteoDataLoader.data[`meteo${i}`].filter(
            row =>
              row.Region === region.toUpperCase() &&
              row.Miesiąc >= from &&
              row.Miesiąc <= to
          );
          result +=
            this.pickedData.reduce((a, b) => a + b.Miesięczna_suma_opadów, 0) /
            this.pickedData.length;
          }
          result = result / 14;
          break;
      }
    };

    let result = 0;

    if (Object.keys(MeteoDataLoader.data).length === 0) {
      MeteoDataLoader.loadData().then(() => {
        if (typeof year === "number") {
          average();
        }
        averageAll();
      });
    } else {
      if (typeof year === "number") {
        average();
      }
      averageAll();
    }

    return result;
  }
}
