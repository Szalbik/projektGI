import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import YieldsDataLoader from '../utils/YieldsDataLoader';
import './App.css';

class App extends Component {
    state = {
        meteo: false,
        yields: false
    }

    componentDidMount() {
        MeteoDataLoader.loadData().then(() => this.setState({meteo: true}))
        YieldsDataLoader.loadData().then(() => this.setState({yields: true})); // Nie chce się zrobić resolve!!!
    }

    render() {
        return (
            <div className="App">
                <Map />
                {this.state.loading && 
                    this.state.yields &&
                    <ChartsGroup regions={['PL-DS', 'PL-WP', 'PL-KP', 'PL-PM']}/>}
            </div>
        );
    }
}

export default App;
