const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

var readStream = fs.createReadStream(path.join(__dirname, `o_m_2016.csv`)); // readStream is a read-only stream wit raw text content of the CSV file
var writeStream = fs.createWriteStream(path.join(__dirname,`new_o_m_2016.csv`)); // writeStream is a write-only stream to write on the disk

var csvStream = csv.createWriteStream({headers: true})

csvStream.pipe(writeStream);

let lines = 0;

csv
  .fromStream(readStream, { headers: true, start: 0, end: 10 })
  .transform(function(data) {
    switch (data.Nazwa_stacji) {
      case 'GRUSZCZYN':
        data.Region = 'PL-DS';
        break;
      // case 'LASKI':
      //   data.Region = 'PL-DS';
      //   break;
      // case 'PSZCZYNA':
      //   data.Region = 'PL-DS';
      //   break;
      // case 'BORUSOWA':
      //   data.Region = 'PL-DS';
      //   break;
      case 'SZELEJEWO':
        data.Region = 'PL-KP';
        break;
      // case 'NIEDZICA':
      //   data.Region = 'PL-KP';
      //   break;
      // case 'LIDZBARK':
      //   data.Region = 'PL-KP';
      //   break;
      case 'ZALESIE':
        data.Region = 'PL-LU';
        break;
      // case 'OLECKO':
      //   data.Region = 'PL-LU';
      //   break;
      case 'DOBIEGNIEW':
        data.Region = 'PL-LB';
        break;
      // case 'PORONIN':
      //   data.Region = 'PL-LB';
      //   break;
      // case 'MORSKIE OKO':
      //   data.Region = 'PL-LB';
      //   break;
      // case 'MYSZYNIEC':
      //   data.Region = 'PL-LB';
      //   break;
      case 'BOBROWNIKI':
        data.Region = 'PL-LD';
        break;
      // case 'STUPOSIANY':
      //   data.Region = 'PL-LD';
      //   break;
      // case 'MIASTKO':
      //   data.Region = 'PL-LD';
      //   break;
      // case 'ZGORZELEC':
      //   data.Region = 'PL-MA';
      //   break;
      case 'WARSZOWICE':
        data.Region = 'PL-MA';
        break;
      // case 'ZIELONKI':
      //   data.Region = 'PL-MA';
      //   break;
      // case 'ZAWADA':
      //   data.Region = 'PL-MA';
      //   break;
      // case 'CIESZYN':
      //   data.Region = 'PL-MA';
      //   break;
      case 'WINNICA':
        data.Region = 'PL-MZ';
        break;
      // case 'WARSZAWA-BIELANY':
      //   data.Region = 'PL-MZ';
      //   break;
      case 'STRZELNO':
        data.Region = 'PL-OP';
        break;
      // case 'OPOLE LUBELSKIE':
      //   data.Region = 'PL-OP';
      //   break;
      // case 'SOLINA-JAWOR':
      //   data.Region = 'PL-OP';
      //   break;
      // case 'RADOSTOWO':
      //   data.Region = 'PL-OP';
      //   break;
      // case 'GRABIK':
      //   data.Region = 'PL-OP';
      //   break;
      case 'OCHABY':
        data.Region = 'PL-PK';
        break;
      // case 'PASTERKA':
      //   data.Region = 'PL-PK';
      //   break;
      // case 'SZCZYTNO':
      //   data.Region = 'PL-PK';
      //   break;
      // case 'POLKOWICE DOLNE':
      //   data.Region = 'PL-PK';
      //   break;
      case 'SIEDLISKA':
        data.Region = 'PL-PD';
        break;
      // case 'PTASZKOWA':
      //   data.Region = 'PL-PD';
      //   break;
      // case 'DOBCZYCE':
      //   data.Region = 'PL-PD';
      //   break;
      // case 'PRZELEWICE':
      //   data.Region = 'PL-PD';
      //   break;
      case 'KOSTKOWO':
        data.Region = 'PL-PM';
        break;
      // case 'BORUCINO':
      //   data.Region = 'PL-PM';
      //   break;
      // case 'SIELEC':
      //   data.Region = 'PL-PM';
      //   break;
      case 'TRZEMESZNO':
        data.Region = 'PL-SL';
        break;
      // case 'GOSTYNIN':
      //   data.Region = 'PL-SL';
      //   break;
      // case 'BRENNA':
      //   data.Region = 'PL-SL';
      //   break;
      // case 'PRABUTY':
      //   data.Region = 'PL-SL';
      //   break;
      case 'CZERNIKOWO':
        data.Region = 'PL-SK';
        break;
      // case 'KURZACZE':
      //   data.Region = 'PL-SK';
      //   break;
      // case 'TERKA':
      //   data.Region = 'PL-SK';
      //   break;
      // case 'ZAWOJA':
      //   data.Region = 'PL-SK';
      //   break;
      // case 'PAPROTKI':
      //   data.Region = 'PL-SK';
      //   break;
      case 'DZIARNY':
        data.Region = 'PL-WN';
        break;
      // case 'MSZANA DOLNA':
      //   data.Region = 'PL-WN';
      //   break;
      // case 'BOGATYNIA':
      //   data.Region = 'PL-WN';
      //   break;
      // case 'ROZEWIE':
      //   data.Region = 'PL-WP';
      //   break;
      case 'KONOJAD':
        data.Region = 'PL-WP';
        break;
      // case 'LALIKI':
      //   data.Region = 'PL-WP';
      //   break;
      case 'GRABOWIEC':
        data.Region = 'PL-ZP';
        break;
      // case 'SILNICZKA':
      //   data.Region = 'PL-ZP';
      //   break;
      // case 'HALA ORNAK':
      //   data.Region = 'PL-ZP';
      //   break;
      // case 'LISEWO':
      //   data.Region = 'PL-ZP';
      //   break;
    
      default:
        break;
    }
    return data;
  })
  // .validate(function(data) {
  //   return !!data.Region
  // })
  .on('data', function(data) {
    if (data.Region) {
      lines += 1;
      csvStream.write(data);
    }
  })
  .on('end', function(data) {
    csvStream.end()
    console.log(lines);
    console.log("Read finished");
  });
