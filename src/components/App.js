import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import './App.css';

class App extends Component {
    state = {
        meteoLoaded: false
    }

    componentDidMount() {
        MeteoDataLoader.loadData().then(() => this.setState({ meteoLoaded: true }))
    }

    render() {
        if(this.state.meteoLoaded) {
            return (
                <div className="App">
                    <Map/>
                    <ChartsGroup regions={['PL-DS', 'PL-WP', 'PL-KP', 'PL-PM']}/>
                </div>
            );
        }
        else {
            return (<div>Loading data ...</div>)
        }
    }
}

export default App;
