import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import './App.css';

class App extends Component {
    render() {
        new MeteoDataLoader().avgOf('rainfall', '2003', 'PL-DS', 3, 10).then(res => console.log(res)); 
        new MeteoDataLoader().avgOf('temp', '2003', 'PL-WP', 5, 8).then(res => console.log(res)); 
        new MeteoDataLoader().avgOf('temp', '2003', 'PL-WP', 5, 8).then(res => console.log(res)); 
        new MeteoDataLoader().avgOf('temp', '2003', 'PL-WP', 5, 8).then(res => console.log(res)); 
        new MeteoDataLoader().avgOf('humidity', '2003', 'PL-DS', 5, 8).then(res => console.log(res)); 
        new MeteoDataLoader().avgOf('humidity', '2003', 'PL-DS', 5, 8).then(res => console.log(res)); 
        new MeteoDataLoader().avgOf('humidity', '2003', 'PL-DS', 5, 8).then(res => console.log(res)); 
        return (
            <div className="App">
                <Map />
                <ChartsGroup regions={['PL-DS', 'PL-WP', 'PL-KP', 'PL-PM']}/>
            </div>
        );
    }
}

export default App;
