import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMap 
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHi8SmrcOYxBPfwYg7WTKaNEKkM_XxspU&callback=initMap"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />} 
        />
      </div>
    );
  }
}

export default App;
