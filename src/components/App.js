import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
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
                <ChartsGroup regions={['PL-DS', 'PL-WP', 'PL-KP', 'PL-PM']}/>
            </div>
        );
    }
}

export default App;
