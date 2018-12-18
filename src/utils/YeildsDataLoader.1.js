import * as d3 from "d3";

export default class YieldsDataLoader {
  static data = {};
  static yieldNames = [
    "buraki_cukrowe",
    "gryka",
    "jeczmien",
    "kukurydza_na_ziarno",
    "owies",
    "proso",
    "pszenica",
    "rzepak_i_rzepik",
    "ziemniaki",
    "zyto"
  ];

  static async loadData() {
    for (let year = 2003; year <= 2016; year++) {
      this.data[year] = {}
      for (let yi = 0; yi < this.yieldNames.length; yi++) {
        const yieldElem = this.yieldNames[yi];
        this.data[`${year}`][yieldElem] = []
        this.data[year][yieldElem] = await d3.csv(
          `data/yields/${year}_${yieldElem}.csv`,
          row => {
            return {
              region: row.region,
              area: +row.area,
              "dt/ha": +row["dt/ha"],
              dt: +row.dt
            };
          }
        );
      }
    }
    console.log(this.data);
    return this.data;
  }
}
