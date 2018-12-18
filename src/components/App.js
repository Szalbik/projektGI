import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import YieldsDataLoader from '../utils/YeildsDataLoader.1';
import './App.css';

class App extends Component {
    state = {
        meteo: false,
        yields: false
    }

    componentDidMount() {
        MeteoDataLoader.loadData().then(() => this.setState({meteo: true}))
        YieldsDataLoader.loadData().then(() => this.setState({yields: true}))
    }
    render() {
        return (
            <div className="App">
                <Map />
                {this.state.meteo && 
                    this.state.yields &&
                    <ChartsGroup regions={['PL-DS', 'PL-WP', 'PL-KP', 'PL-PM']}/>}
            </div>
        );
    }
}

export default App;
