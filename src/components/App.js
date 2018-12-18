import React, { Component } from 'react';
import ComboChart from './charts/ComboChart';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import YieldsDataLoader from '../utils/YieldsDataLoader.1';
import './App.css';

class App extends Component {
    render() {
        MeteoDataLoader.loadData().then(() => {
            new MeteoDataLoader().avgOf()
            new MeteoDataLoader().avgOf('temp', 2003, 'PL-WP', 5, 8)
            new MeteoDataLoader().avgOf('temp', 2004, 'PL-WP', 5, 8)
            new MeteoDataLoader().avgOf('temp', 2007, 'PL-WP', 5, 8)
            new MeteoDataLoader().avgOf('rainfall', 2016, 'PL-DS', 5, 8)
            new MeteoDataLoader().avgOf('humidity', 2011, 'PL-DS', 5, 8)
            console.log(new MeteoDataLoader().avgOf('rainfall', 2013, 'PL-DS', 5, 8))
        })

        
        return (
            <div className="App">
                <Map />
                <button onClick={() => new MeteoDataLoader().avgOf()}>check avg</button>
                <ComboChart
                    title={"Wielkość plonów w stosunku do opadów"}
                    range={{start: "2003", stop: "2016"}}
                    axes={{
                        hAxisTitle: "Rok",
                        vAxis0Title: "Wielkość plonów w dt",
                        vAxis1Title: "Wielkość opadów w ml",
                    }}
                    series={[
                        {"region": "PL-DS", "type": "yield", "value": "zyto", "label": "Żyto DS"},
                        {"region": "PL-DS", "type": "yield", "value": "proso", "label": "Proso DS"},
                        {"region": "PL-WP", "type": "meteo", "value": "zyto", "label": "Żyto WP"}
                    ]}
                />
            </div>
        );
    }
}

export default App;
