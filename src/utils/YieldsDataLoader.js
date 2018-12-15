import * as d3  from 'd3';

const regionsMap = {
    "PL-DS": {rowNumber: 1, name: "dolnośląskie"},
    "PL-KP": {rowNumber: 2, name: "kujawsko-pomorskie"},
    "PL-LU": {rowNumber: 3, name: "lubelskie"},
    "PL-LB": {rowNumber: 4, name: "lubuskie"},
    "PL-LD": {rowNumber: 5, name: "łódzkie"},
    "PL-MA": {rowNumber: 6, name: "małopolskie"},
    "PL-MZ": {rowNumber: 7, name: "mazowieckie"},
    "PL-OP": {rowNumber: 5, name: "opolskie"},
    "PL-PK": {rowNumber: 9, name: "podkarpackie"},
    "PL-PD": {rowNumber: 10, name: "podlaskie"},
    "PL-PM": {rowNumber: 11, name: "pomorskie"},
    "PL-SL": {rowNumber: 12, name: "śląskie"},
    "PL-SK": {rowNumber: 13, name: "świętokrzyskie"},
    "PL-WN": {rowNumber: 14, name: "warmińsko-mazurskie"},
    "PL-WP": {rowNumber: 15, name: "wielkopolskie"},
    "PL-ZP": {rowNumber: 16, name: "zachodniopomorskie"},
};

class YieldsDataLoader {
    static data = [];

    static async single(year, yieldName, columnName, region) {
        let regionRow = regionsMap[region].rowNumber;
        if(typeof this.data[yieldName] !== 'undefined' && typeof this.data[yieldName][year] !== 'undefined'){
            return this.data[yieldName][year][regionRow][columnName].replace(/\s/g, '').replace(/,/g, '.');
        }
        await this.loadData(year,yieldName);
        return this.data[yieldName][year][regionRow][columnName].replace(/\s/g, '').replace(/,/g, '.');
    }

    static async loadData(year, yieldName){
        let parsedData = [];
        await d3.csv('data/yields/' + year + "_" + yieldName + ".csv", data => parsedData.push(data));
        if(typeof this.data[yieldName] === 'undefined'){
            this.data[yieldName] = [];
        }
        this.data[yieldName][year] = parsedData;
        return parsedData;
    }
}

export default YieldsDataLoader