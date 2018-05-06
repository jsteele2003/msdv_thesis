import React, {PureComponent} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import {MapMode, DOT_COLORS, incMax, incMin, houseMin} from '../constants/map_constants';
import * as d3 from "d3-ease";


const LIGHT_SETTINGS = {
    lightsPosition: [ -70.1652, 30.739968, 800, -3.807751, 54.104682, 800,  70.1652, -30.739968, 800],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0,  0.8, 0.0],
    numberOfLights: 3
};

const elevationScale = {min: 0.1, max: 1};


export default class PolyOverlay extends PureComponent{
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            elevationScale: elevationScale.min
        };

    }


    render(){
        const { polygons, hsPolygons, mapMode, mapViewState, polyScaler} = this.props.props;
        const { width, height } = this.props.state;
        console.log(hsPolygons);
        const layer = new GeoJsonLayer({
            id: 'poly-map',
            data: (mapMode == MapMode.POLYINC ? polygons : hsPolygons),
            visible: (mapMode == MapMode.POLYHS || mapMode == MapMode.POLYINC),
            opacity: 0.25,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            autoHighlight: true,
            fp64: false,
            getElevation: f => (mapMode == MapMode.POLYINC ? (((f.properties.median_income - incMin) / 10) * polyScaler): (((f.properties.housingValue - houseMin) / 100) * polyScaler)),
            getFillColor: f => DOT_COLORS[f.properties.majorityDemo],
            getLineColor: f => [255, 255, 255],
            updateTriggers:{
                getElevation: mapMode
            },
            transitions:{
                getElevation: {
                    duration: 2000,
                    easing: d3.easeCubicInOut,
                    onStart: evt => console.log('position transition started', evt)}
            },
            lightSettings: LIGHT_SETTINGS
        });

        console.log(layer);

        return (
            <DeckGL
                id="poly-overlay"
                width={width}
                height={height}
                {...mapViewState}
                layers={[layer]}
            />

        )
    }


}
