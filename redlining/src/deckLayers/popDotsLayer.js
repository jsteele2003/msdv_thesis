import React, {PureComponent} from 'react';
import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {MapMode, DOT_COLORS, OLD_COLORS} from '../constants/map_constants';
import * as d3 from 'd3-ease';

const radiusScale = {min : 1, max: 10};
export default class DotOverlay extends PureComponent{
    constructor(props) {
        super(props);
        console.log(props);

        this.startAnimationTimer = null;
        this.intervalTimer = null;

        this.state = {
            radiusScale: radiusScale.min
        };

        //bind here for convenience
        this._startAnimate = this._startAnimate.bind(this);
        this._animateHeight = this._animateHeight.bind(this);

    }

    componentDidMount() {
        this._animate();
    }


    //unsafe, should look for alternative
    componentWillReceiveProps(nextProps) {
        if (nextProps.props.mapMode != this.props.props.mapMode) {
            this.setState({elevationScale: elevationScale.min});
            this._animate();
        }
    }

    componentWillUnmount() {
        this._stopAnimate();
    }

    _animate() {
        this._stopAnimate();

        this.startAnimationTimer = window.setTimeout(this._startAnimate, 1000);
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateRadius, 20);
    }

    _stopAnimate() {
        window.clearTimeout(this.startAnimationTimer);
        window.clearTimeout(this.intervalTimer);
    }

    _animateRadius() {
        if (this.state.radiusScale > radiusScale.max) {
            this._stopAnimate();
        } else {
            this.setState({radiusScale: this.state.radiusScale + 0.005});
        }
    }
}

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
    let colors = (mapMode == MapMode.DOTS ? DOT_COLORS : OLD_COLORS);
    return new ScatterplotLayer({
        id: 'dot-plot',
        data: (mapMode == MapMode.DOTS ? popDots : oldDots),
        opacity : layerOpacity,
        visible: (mapMode == MapMode.DOTS || mapMode == MapMode.OLD),
        radiusScale: 10,
        getPosition: d => [d[0], d[1], 0],
        getColor: d => colors[d[2]],
        getRadius: d => 1,
        updateTriggers: {
            getColor: colors,
        },
        transitions: {
            getPosition: {
                duration: 4000,
                easing: d3.easeCubicInOut
            },
            getColor: 600
        }
    });
}
