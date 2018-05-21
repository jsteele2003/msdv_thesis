import React, {PureComponent} from 'react';
import DeckGL, {GeoJsonLayer} from 'deck.gl';
import {MapMode} from '../constants/map_constants';
import * as d3 from "d3-ease";


export default class HolcOverlay extends PureComponent{
    constructor(props) {
        super(props);
        console.log(props);

    }


    _renderTooltip() {
        const {x, y, hoveredObject} = this.state;

        if (!hoveredObject) {
            return null;
        }
        const lat = hoveredObject.centroid[1];
        const lng = hoveredObject.centroid[0];
        const count = hoveredObject.points.length;

        return (
            <div className="tooltip"
                 style={{left: x, top: y}}>
                <div>{`latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}`}</div>
                <div>{`longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}`}</div>
                <div>{`${count} Accidents`}</div>
            </div>
        );
    }


    render(){
        const { holc, mapMode, mapViewState} = this.props.props;
        const { width, height } = this.props.state;
        const layer = new GeoJsonLayer({
            id: 'holc-map',
            data: holc,
            visible: mapMode == MapMode.OLD,
            opacity: 0.25,
            stroked: false,
            filled: false,
            wireframe: false,
            pickable: true,
            onHover: info => console.log(info.object),
            autoHighlight: true,
            fp64: false,
        });

        return (
            <DeckGL
                id="holc-overlay"
                width={width}
                height={height}
                {...mapViewState}
                layers={[layer]}
            />

        )
    }


}