import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import FusionMaps from 'fusioncharts/fusioncharts.maps';
import Poland from 'fusionmaps/maps/fusioncharts.poland';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, FusionMaps, Poland, FusionTheme);

class Map extends React.Component {
  render() {
     return (
     <ReactFC
        {...this.props.chartConfigs}
        fcEvent-entityClick={this.props.toggleRegion}
        />
     );
  }
}

export default Map