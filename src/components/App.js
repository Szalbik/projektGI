import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
import GoogleComboChart from './GoogleComboChart';
import GoogleGeoChart from './GoogleGeoChart';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <GoogleGeoChart/>
                <GoogleComboChart
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
