import React, {PureComponent} from 'react';
import DeckGL, {GeoJsonLayer, ScatterplotLayer} from 'deck.gl';
import {MapMode, DOT_COLORS, OLD_COLORS, houseMin, incMin} from '../constants/map_constants';
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
        this._animateRadius = this._animateRadius.bind(this);

    }

    componentDidMount() {
        this._animate();
    }


    componentWillUnmount() {
        this._stopAnimate();
    }

    _animate() {
        this._stopAnimate();

        this.startAnimationTimer = window.setTimeout(this._startAnimate, 100);
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateRadius, 10);
    }

    _stopAnimate() {
        window.clearTimeout(this.startAnimationTimer);
        window.clearTimeout(this.intervalTimer);
    }

    _animateRadius() {
        if (this.state.radiusScale > radiusScale.max) {
            this._stopAnimate();
        } else {
            this.setState({radiusScale: this.state.radiusScale + 0.05});
        }
    }

    render(){
        const {mapViewState, popDots, oldDots, mapMode} = this.props.props;
        let colors = (mapMode == MapMode.DOTS ? DOT_COLORS : OLD_COLORS);
        const { width, height } = this.props.state;
        const layer = new ScatterplotLayer({
            id: 'dot-plot',
            data: (mapMode == MapMode.DOTS ? popDots : oldDots),
            visible: (mapMode == MapMode.DOTS || mapMode == MapMode.OLD),
            radiusScale: this.state.radiusScale,
            getPosition: d => [d[0], d[1], -1],
            getColor: d => colors[d[2]],
            getRadius: d => 1,
            updateTriggers: {
                getColor: colors,
            },
            transitions: {
                getPosition: {
                    duration: 2000,
                    easing: d3.easeCubicInOut
                },
                getColor: 600
            }
        });

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

