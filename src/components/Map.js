import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import FusionMaps from 'fusioncharts/fusioncharts.maps';
import Poland from 'fusionmaps/maps/fusioncharts.poland';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, FusionMaps, Poland, FusionTheme);

class Map extends React.Component {
    state = {
        regions: []
    }

    toggleRegion = (event, args) => {
        const { regions } = this.state;
        if (regions.includes(args.shortLabel)) {
            let newRegions = regions.filter(region => region !== args.shortLabel)
            this.setState({regions: newRegions})
        } else {
            this.setState({regions: [...this.state.regions, args.shortLabel]})
        }
    }

  render() {
     return (
        <div className="Map">
            <ReactFC
                {...this.props.chartConfigs}
                fcEvent-entityClick={this.props.toggleRegion}
                />
        </div>
     );
  }
}

export default Map