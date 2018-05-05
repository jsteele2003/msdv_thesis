import React from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {MapMode, DOT_COLORS, OLD_COLORS} from '../constants/map_constants';
import * as d3 from 'd3-ease';


export function renderDotsOverlay(param) {
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

    const { popDots, oldDots, mapMode, layerOpacity} = param;
    console.log(layerOpacity)
    let colors = (mapMode == MapMode.DOTS ? DOT_COLORS : OLD_COLORS);
    return new ScatterplotLayer({
        id: 'dot-plot',
        data: (mapMode == MapMode.DOTS ? popDots : oldDots),
        opacity : layerOpacity,
        visible: (mapMode == MapMode.DOTS || mapMode == MapMode.OLD),
        radiusScale: 10,
        radiusMinPixels: 0.25,
        getPosition: d => [d[0], d[1], 0],
        getColor: d => colors[d[2]],
        getRadius: d => 1,
        updateTriggers: {
            getColor: colors,
        },
        transitions: {
            getPosition: {
                duration: 2000,
                easing: d3.easeCubicInOut,
                onStart: evt => console.log('position transition started', evt),
                onEnd: evt => console.log('position transition ended', evt),
                onInterrupt: evt => console.log('position transition interrupted', evt)
            },
            getColor: 600
        }
    });
}
