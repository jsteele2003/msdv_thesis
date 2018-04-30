import React from 'react';
import MapGL from 'react-map-gl';
import DeckOverlay from './deckLayers/overlayContainer.js';
import rootReducer from './reducers/index';
import { updateMap, selectMode, loadPopPoints } from './actions/action';
import { DARK_TOKEN, MapMode, dots16_URL, DOT_COLORS} from './constants/map_constants';
import { _renderDotsOverlay } from './deckLayers/popDotsLayer'

import ControlPanel from './hud/controlPanel';

import TWEEN from '@tweenjs/tween.js';
import {connect} from "react-redux";

class DeckRoot extends React.Component {
    constructor(props) {
        super(props);

        //window viewport state, not needed in redux tree
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.loadData();
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize.bind(this));
        this._handleResize();
    }

    loadData() {
        fetch(dots16_URL)
            .then(resp => resp.json())
            .then(data => this.props.dispatch(loadPopPoints(data)));
    }

    _handleResize() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }


    _handleViewportChanged(mapViewState) {
        if (mapViewState.pitch > 60) {
            mapViewState.pitch = 60
        }
        this.props.dispatch(updateMap(mapViewState))
    }

    _loadCsvFile(path, onDataLoaded) {
        request.csv(path, function loadJson(error, data) {
            if (error) {
                console.error(error);
            }
            onDataLoaded(data);
        });
    }

    _handleSelectMode(mode) {
        this.props.dispatch(selectMode(mode))
    }
    //
    // _renderMap() {
    //     const { mapViewState, mapMode } = this.props;
    //     const { width, height } = this.state;
    //     const isActiveOverlay = mapMode !== MapMode.NONE;
    //
    //     return (
    //         <MapGL
    //             mapboxApiAccessToken={DARK_TOKEN}
    //             width={width}
    //             height={height}
    //             mapStyle="mapbox://styles/joesteele/cjgd6f57e00072ro6e2srgmbs"
    //             perspectiveEnabled
    //             { ...mapViewState }
    //             onViewportChange={this._handleViewportChanged.bind(this)}>
    //         </MapGL>
    //     );
    // }

    _onWebGL(gl) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
    }

    _renderVisualizationOverlay() {
        const { popDots, hexes, holc,  mapMode } = this.props;

        if (popDots === null) {
            return []
        }

        //props for overlays
        const layerParams = {
            props: this.props,
            //window info in state
            state: this.state,
            onWebGLInitialized: this._onWebGL,
            // effects: this._effects,
        }

        return (
            //each will evaluate to expression to render when true
            <div>
                { mapMode === MapMode.DOTS && _renderDotsOverlay(layerParams) }
                { mapMode === MapMode.HEXES && _renderHexesOverlay(layerParams) }
                { mapMode === MapMode.HOLC && _renderGeoOverlay(layerParams) }
            </div>
        )
    }

    render() {
        const {mapViewState, mapMode} = this.props;
        const { width, height} = this.state;
        const isActiveOverlay = mapMode !== MapMode.NONE;

        const mapSelectionProps = {
            mapMode: this.props.mapMode,
            selectModeFunc: this._handleSelectMode.bind(this),
        }

        return (
            <div>
                <MapGL
                    mapboxApiAccessToken={DARK_TOKEN}
                    width={width}
                    height={height}
                    mapStyle="mapbox://styles/joesteele/cjgd6f57e00072ro6e2srgmbs"
                    { ...mapViewState }
                    onViewportChange={this._handleViewportChanged.bind(this)}>
                    {isActiveOverlay && this._renderVisualizationOverlay()}
                </MapGL>

                <ControlPanel {...mapSelectionProps}/>
            </div>

                // <DeckOverlay
                //     viewport={mapViewState}
                //     data={dots}
                //     colors={DOT_COLORS}
                //     radius={10}
                // />

        );
    }
}

function mapStateToProps(state) {
    return {
        mapViewState: state.mapViewState,
        popDots: state.popDots,
        holc: state.holc,
        hexes: state.hexes,
        mapMode: state.mapMode,
    }
}
const DeckApp = connect(mapStateToProps)(DeckRoot);

export default DeckApp;