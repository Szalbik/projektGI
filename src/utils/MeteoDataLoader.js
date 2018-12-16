import * as d3  from 'd3';

export default class MeteoDataLoader {
  static loadedMeteoData = []
  static loadedClimaticData = []

  static async avgOf(type = 'rainfall', year, from=8, to=9) {
    //   this.loadedData = await d3.csv(`data/meteo/${year}.csv`, function(row) {
    //     const dateArray = row.data.split('-');
    //    return {
    //     date: new Date(dateArray[0], dateArray[1] - 1, dateArray[2]),
    //     temp: +row.temp,
    //     humidity: +row.humidity,
    //     rainfall: +row.rainfall
    //   }
    // })

    this.loadedMeteoData = await d3.csv(`data/meteo/o_m_${year}.csv`, row => {
      return {
        Kod_stacji: row['Kod_stacji'],
        Nazwa_stacji: row['Nazwa_stacji'],
        Rok: row['Rok'],
        Miesiąc: row['Miesiąc'],
        Miesięczna_suma_opadów: row['Miesięczna_suma_opadów_[mm]']
      }
    })

    this.loadedClimaticData = await d3.csv(`data/meteo/k_m_t_${year}.csv`, row => {
      return {
        Kod_stacji: row['Kod_stacji'],
        Nazwa_stacji: row['Nazwa_stacji'],
        Rok: row['Rok'],
        Miesiąc: row['Miesiąc'],
        'Średnia_miesięczna_temperatura': row['Średnia_miesięczna_temperatura_[°C]'],
        'Średnia_miesięczna_wilgotność_względna': row['Średnia_miesięczna_wilgotność_względna_[%]'],

      }
    })


    console.log(this.loadedClimaticData);
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

