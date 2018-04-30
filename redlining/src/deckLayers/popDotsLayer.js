import React from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {DOT_COLORS} from '../constants/map_constants';


export function _renderDotsOverlay(param) {
    const { mapViewState } = param.props;
    const { width, height } = param.state;
    return (
        <DeckGL
            id="dots-overlay"
            width={width}
            height={height}
            {...mapViewState}
            layers={[_renderDotsLayer(param.props)]}
        />
    )
}

function _renderDotsLayer(param) {

    const { popDots, radius} = param;
    const colors = DOT_COLORS;
    return new ScatterplotLayer({
        id: 'dot-plot',
        data: popDots,
        radiusScale: 10,
        radiusMinPixels: 0.25,
        getPosition: d => [d[0], d[1], 0],
        getColor: d => colors[d[2]],
        getRadius: d => 1,
        updateTriggers: {
            getColor: colors
        }
    });
}