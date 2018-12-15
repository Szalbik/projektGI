import * as d3  from 'd3';

export default class MeteoDataLoader {
  static loadedData = []

  static async avgOf(type = 'rainfall', year, from=8, to=9) {
      this.loadedData = await d3.csv(`data/meteo/${year}.csv`, function(row) {
        const dateArray = row.data.split('-');
       return {
        date: new Date(dateArray[0], dateArray[1] - 1, dateArray[2]),
        temp: +row.temp,
        humidity: +row.humidity,
        rainfall: +row.rainfall
      }
    })

    let licznik = 0;
    let sum = await this.loadedData.reduce((a, b) => { 
      if (b.date.getMonth() >= from && b.date.getMonth() <= to) {
        licznik++;
        return (a + b[type])
      }
      return a + 0;
    }, 0)
    return  (sum / licznik);
  }
}

