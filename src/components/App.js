import React, { Component } from 'react';
import ChartsGroup from './ChartsGroup';
import Map from './Map';
import MeteoDataLoader from '../utils/MeteoDataLoader';
import './App.css';

class App extends Component {
    state ={
        loading: true
    }

    componentDidMount() {
        MeteoDataLoader.loadData().then(() => this.setState({loading: false}))
    }

    render() {
        return (
            <div className="App">
                <Map />
                {!this.state.loading && <ChartsGroup regions={['PL-DS', 'PL-WP', 'PL-KP', 'PL-PM']}/>}
            </div>
        );
    }
}

export default App;
