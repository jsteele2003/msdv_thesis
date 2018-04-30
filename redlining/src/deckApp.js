import React from 'react';
import MapGL from 'react-map-gl';
import DeckOverlay from './deckLayers/overlayContainer.js';
import rootReducer from './reducers/index';
import { updateMap, selectMode } from './actions/action';
import { DARK_TOKEN, MapMode, dots16_URL, DOT_COLORS} from './constants/map_constants'

import ControlPanel from './hud/controlPanel';

import TWEEN from '@tweenjs/tween.js';
import {connect} from "react-redux";

class DeckRoot extends React.Component {
    constructor(props) {
        super(props);
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
        // Implement Timer here
        fetch(dots16_URL)
            .then(resp => resp.json())
            .then(data => this.setState({dots: data}));
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

    _renderMap() {
        const { mapViewState, mapMode } = this.props;
        const { width, height } = this.state;
        const isActiveOverlay = mapMode !== MapMode.NONE;

        return (
            <MapGL
                mapboxApiAccessToken={DARK_TOKEN}
                width={width}
                height={height}
                mapStyle="mapbox://styles/joesteele/cjgd6f57e00072ro6e2srgmbs"
                perspectiveEnabled
                { ...mapViewState }
                onViewportChange={this._handleViewportChanged.bind(this)}>
            </MapGL>
        );
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
                    perspectiveEnabled
                    onViewportChange={this._handleViewportChanged.bind(this)}>
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
        mapMode: state.mapMode,
    }
}
const DeckApp = connect(mapStateToProps)(DeckRoot);

export default DeckApp;