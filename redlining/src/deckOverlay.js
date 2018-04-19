import React, {Component} from 'react';

import DeckGL, {ScatterplotLayer} from 'deck.gl';

export default class DeckOverlay extends Component {
    static get defaultViewport() {
        return {
            longitude: -75.1652,
            latitude: 39.9526,
            zoom: 11,
            maxZoom: 16,
            pitch: 0,
            bearing: 0,
            useDevicePixels: false
        };
    }

    render() {
        const {viewport, maleColor, femaleColor, data, radius} = this.props;

        if (!data) {
            return null;
        }

        const layer = new ScatterplotLayer({
            id: 'scatter-plot',
            data,
            radiusScale: radius,
            radiusMinPixels: 0.25,
            getPosition: d => [d[0], d[1], 0],
            getColor: d => (d[2] === 1 ? maleColor : femaleColor),
            getRadius: d => 1,
            updateTriggers: {
                getColor: [maleColor, femaleColor]
            }
        });

        return <DeckGL {...viewport} layers={[layer]} />;
    }
}