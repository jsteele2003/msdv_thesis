import React, {PureComponent} from 'react';
import DeckGL, {GeoJsonLayer, ScatterplotLayer, PolygonLayer} from 'deck.gl';
import {MapMode, DOT_COLORS, incMax, incMin, houseMin, OLD_COLORS, HOLC_COLORS} from '../constants/map_constants';
import * as d3 from "d3-ease";


const LIGHT_SETTINGS = {
    lightsPosition: [ -70.1652, -30.739968, 800, -3.807751, 54.104682, 800],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 3
};

const elevationScale = {min: 0.01, max: 1};
const radiusScale = {min : 1, max: 10};



export default class PolyOverlay extends PureComponent{
    constructor(props) {
        super(props);
        console.log(props);

        this.startAnimationTimer = null;
        this.intervalTimer = null;
        this.reverse = false;

        this.state = {
            elevationScale: elevationScale.min,
            radiusScale: radiusScale.min,
            holcColor: HOLC_COLORS.A,
            hoveredObject: null
        };

        //bind here for convenience
        this._startAnimate = this._startAnimate.bind(this);
        this._animateHeight = this._animateHeight.bind(this);
        this._animateRadius = this._animateRadius.bind(this);

    }

    componentDidMount() {
        this._animate();
    }

    getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.props.mapMode != prevState.props.props.mapMode){
            this.setState({hoveredObject: null});
        }
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
        if(this.props.props.mapMode == MapMode.POLYINC || this.props.props.mapMode == MapMode.POLYHS){
            this.startAnimationTimer = window.setTimeout(this._startAnimate, 3000);
        } else {
            this.startAnimationTimer = window.setTimeout(this._startAnimate, 500);

        }
    }

    _startAnimate() {
        this.intervalTimer = window.setInterval(this._animateHeight, 20);
        this.intervalTimer = window.setInterval(this._animateRadius, 5);
    }

    _stopAnimate() {
        window.clearTimeout(this.startAnimationTimer);
        window.clearTimeout(this.intervalTimer);
    }

    _animateHeight() {
        if (this.state.elevationScale > elevationScale.max) {
            this._stopAnimate();
        } else {
            this.setState({elevationScale: this.state.elevationScale + 0.0025});
        }
    }

    _animateRadius() {
        if (this.state.radiusScale > radiusScale.max) {
            this._stopAnimate();
        } else {
            this.setState({radiusScale: this.state.radiusScale + 0.025});
        }
    }

    _onNeighborHover({x, y, object}) {
        this.setState({x, y, hoveredObject: object});
    }

    _onHolcHover({object}) {
        this.setState({holcColor: HOLC_COLORS[object.properties.holc_grade]});
        // this.setState({x, y, hoveredObject: object});
    }

    _renderNeighborTooltip() {
        const {x, y, hoveredObject} = this.state;

        if (!hoveredObject || this.props.props.mapMode != MapMode.DOTS) {
            return null;
        }

        const neighborhood = hoveredObject.properties.Name;

        return (
            <div className="tooltip"
                 style={{left: x, top: y}}>
                <div>{neighborhood}</div>
            </div>
        );
    }

    _renderHolcTooltip() {
        const {x, y, hoveredObject} = this.state;

        if (!hoveredObject || this.props.props.mapMode != MapMode.OLD) {
            return null;
        }

        const grade = hoveredObject.properties.holc_id;

        return (
            <div className="tooltip"
                 style={{left: x, top: y}}>
                <div>{`HOLC ID: ${grade}`}</div>
            </div>
        );
    }


    render(){
        const {mapViewState, popDots, oldDots, mapMode, polygons, holc, phPolygons} = this.props.props;
        let colors = (mapMode == MapMode.DOTS ? DOT_COLORS : OLD_COLORS);
        const holcColor = this.state.holcColor;
        const { width, height } = this.props.state;

        const scatterLayer = new ScatterplotLayer({
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
                    duration: 4000,
                    easing: d3.easeCubicInOut
                },
                getColor: 600
            }
        });

        const phillyLayer = new GeoJsonLayer({
            id: 'philly-map',
            data: phPolygons,
            visible: mapMode == MapMode.DOTS,
            opacity: 0,
            stroked: true,
            filled: true,
            pickable: true,
            wireframe: true,
            onHover: this._onNeighborHover.bind(this),
            autoHighlight: true,
            fp64: false,
        });

        const holcLayer = new GeoJsonLayer({
            id: 'holc-map',
            data: holc,
            visible: mapMode == MapMode.OLD,
            opacity: 0,
            stroked: true,
            filled: true,
            pickable: true,
            onHover: this._onHolcHover.bind(this),
            highlightColor: holcColor,
            autoHighlight: true,
            fp64: false,
        });


        const censusLayer = new GeoJsonLayer({
            id: 'poly-map',
            data: polygons,
            visible: (mapMode == MapMode.POLYHS || mapMode == MapMode.POLYINC),
            opacity: 0.25,
            stroked: false,
            filled: true,
            elevationScale : this.state.elevationScale,
            extruded: true,
            wireframe: true,
            pickable: true,
            onHover: info => console.log(info.object),
            autoHighlight: true,
            fp64: false,
            getElevation: f => (mapMode == MapMode.POLYINC ? ((f.properties.median_income - incMin) / 10): ((f.properties.housingValue - houseMin) / 100)),
            getFillColor: f => DOT_COLORS[f.properties.majorityDemo],
            getLineColor: f => [255, 255, 255],
            updateTriggers:{
                getElevation: mapMode
            },
            transitions:{
                getElevation: {
                    duration: 4000,
                    easing: d3.easeCubicInOut,
                    onStart: evt => console.log('position transition started', evt)}
            },
            lightSettings: LIGHT_SETTINGS
        });

        return (
            <div>
                {this._renderNeighborTooltip()}
                    <DeckGL
                    id="overlays"
                    width={width}
                    height={height}
                    {...mapViewState}
                    layers={[ censusLayer, scatterLayer, holcLayer, phillyLayer]}
                />
            </div>

        )
    }


}
