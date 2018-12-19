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
    static yieldsTypes = ['gryka', 'jeczmien', 'kukurydza_na_ziarno', 'owies','proso', 'pszenica', 'zyto', 'pszenzyto', 'rzepak_i_rzepik', 'ziemniaki', 'buraki_cukrowe'];

    static single(year, yieldName, columnName, region) {
        let regionRow = regionsMap[region].rowNumber;
        if(typeof this.data[yieldName] !== 'undefined' && typeof this.data[yieldName][year] !== 'undefined'){
            return this.data[yieldName][year][regionRow][columnName].replace(/\s/g, '').replace(/,/g, '.');
        }
        return null;
    }

    static async loadSingleFile(year, yieldName){
        let parsedData = [];
        await d3.csv('data/yields/' + year + "_" + yieldName + ".csv", data => parsedData.push(data));
        if(typeof this.data[yieldName] === 'undefined'){
            this.data[yieldName] = [];
        }
        this.data[yieldName][year] = parsedData;
        return parsedData;
    }

    /**
     *
     * @param yieldName (yieldName='all' return avg for all yields)
     * @param columnName
     * @param region
     * @param yearStart
     * @param yearStop
     * @returns {number}
     */
    static avgOf(yieldName, columnName, region, yearStart=2003, yearStop=2016) {
        let sum = 0;
        let year = yearStart;
        if(yieldName === 'all'){
            let counter = 0;
            this.yieldsTypes.forEach(yieldName => {
                for (year; year <= yearStop; year++) {
                    counter++;
                    sum += parseFloat(this.single(year, yieldName, columnName, region));
                }
            });
            return sum / counter;
        }
        else {
            for (year; year <= yearStop; year++) {
                sum += parseFloat(this.single(year, yieldName, columnName, region));
            }
        }
        return sum / (yearStop - yearStart + 1);
    }

    static async loadData(){
        this.yieldsTypes.forEach(y => {
            let year = 2003;
            for(year; year <= 2016; year++){
                this.loadSingleFile(year, y);
            }
        })
        return this.data;
    }
}

export default YieldsDataLoader