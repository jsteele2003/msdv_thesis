import React, {Component} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import {MapMode, DOT_COLORS, incMax, incMin} from '../constants/map_constants';


const LIGHT_SETTINGS = {
    lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};


export default class PolyOverlay extends Component{
    constructor(props) {
        super(props);
        console.log(props)
    }




    render(){
        const { mapViewState } = this.props.props;
        const { width, height } = this.props.state;
    return (
        <DeckGL
            id="poly-overlay"
            width={width}
            height={height}
            {...mapViewState}
            debug
            layers={[_renderPolyLayer(this.props.props)]}
        />

    )
    }
}

function _renderPolyLayer(param) {
    const { polygons, mapMode, layerOpacity} = param;
    const elevationScale = {min: 1, max: 50};
    console.log(polygons);
    console.log(mapMode);

    return new GeoJsonLayer({
        id: 'poly-map',
        data: polygons,
        visible: (mapMode == MapMode.POLYHS || mapMode == MapMode.POLYINC),
        opacity: 0.25,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        fp64: false,
        getElevation: f => (f.properties.median_income - incMin) / 10,
        getFillColor: f => DOT_COLORS[f.properties.majorityDemo],
        getLineColor: f => [255, 255, 255],
        lightSettings: LIGHT_SETTINGS,
    });

}