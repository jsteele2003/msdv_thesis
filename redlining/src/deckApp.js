import React from 'react';
import MapGL from 'react-map-gl';
import DeckOverlay from './deckLayers/overlayContainer.js';
import rootReducer from './reducers/index';
import { updateMap, selectMode, loadPopPoints, loadOldPoints, updateOpacity, updateStyle } from './actions/action';
import { DARK_TOKEN, MAPBOX_TOKEN, MapMode, dots16_URL, dots40_URL} from './constants/map_constants';
import { renderDotsOverlay } from './deckLayers/popDotsLayer';
import {fromJS} from 'immutable';
import MAP_STYLE from '../data/mapStyles/defaultMap';

const defaultMapStyle = fromJS(MAP_STYLE);

import ControlPanel from './hud/controlPanel';
import {connect} from "react-redux";

class DeckRoot extends React.Component {
    constructor(props) {
        super(props);

        //window viewport state, not needed in redux tree, only for resize handling
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            mousePosition: [0, 0]
        };

        this.loadData();
    }

    componentDidMount() {
        window.addEventListener('resize', this._handleResize.bind(this));
        this._handleResize();
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize);
    }


    //fetches data at path, passes to dispatch callback
    _loadDispatch(path, onLoad){
        fetch(path)
            .then(resp => resp.json())
            .then(data => onLoad(data));
    }

    loadData() {
        this._loadDispatch(dots16_URL, (data) => this.props.dispatch(loadPopPoints(data)));
        this._loadDispatch(dots40_URL, (data) => this.props.dispatch(loadOldPoints(data)));

    }

    _handleResize() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    //
    _handleViewportChanged(mapViewState) {
        if (mapViewState.pitch > 60) {
            mapViewState.pitch = 60
        }
        this.props.dispatch(updateMap(mapViewState))
    }


    _onMouseMove(evt) {
        if (evt.nativeEvent) {
            this.setState({mousePosition: [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY]});
        }
    }


    //for HOLC raster opacity setting
    _onStyleChange (mapStyle){
        this.props.dispatch(updateStyle(mapStyle));
    }


    //universal dispatchers for control panel
    _handleSelectMode(mode) {
        this.props.dispatch(selectMode(mode))
    }

    //for layer opacity setting
    _handleOpacityChange(opacity) {
        this.props.dispatch(updateOpacity(opacity))
    }


    _renderVisualizationOverlay() {
        const { popDots, oldDots, hexes, holc, mapMode } = this.props;
        if (popDots === null) {
            return []
        }

        console.log(this.props);

        //props for overlays
        const layerParams = {
            props: this.props,
            //window info in state
            state: this.state,
        }

        return (
            //each will evaluate to expression to render when true
            <div>
                { renderDotsOverlay(layerParams) }
                { mapMode === MapMode.HEXES && _renderHexesOverlay(layerParams) }
                { mapMode === MapMode.HOLC && _renderGeoOverlay(layerParams) }
            </div>
        )
    }

    render() {
        const {mapViewState, mapMode, mapStyle} = this.props;
        console.log(this.props);
        const { width, height} = this.state;
        const isActiveOverlay = mapMode !== MapMode.NONE;

        const mapSelectionProps = {
            mapMode: this.props.mapMode,
            selectModeFunc: this._handleSelectMode.bind(this),
            opacityFunc: this._handleOpacityChange.bind(this),
            rasterSetFunc: this._onStyleChange.bind(this)
        }

        return (
            <div>
                <MapGL
                    mapboxApiAccessToken={DARK_TOKEN}
                    width={width}
                    height={height}
                    mapStyle={mapStyle}
                    { ...mapViewState }
                    onViewportChange={this._handleViewportChanged.bind(this)}>
                    {isActiveOverlay && this._renderVisualizationOverlay()}
                </MapGL>

                <ControlPanel {...mapSelectionProps}/>
            </div>


        );
    }
}

//binds state tree to component props
function mapStateToProps(state) {
    return {
        mapViewState: state.mapViewState,
        popDots: state.popDots,
        oldDots: state.oldDots,
        holc: state.holc,
        hexes: state.hexes,
        mapMode: state.mapMode,
        mapStyle: state.mapStyle,
        layerOpacity: state.layerOpacity,
        pCol: state.pCol,
        oCol: state.oCol
    }
}
const DeckApp = connect(mapStateToProps)(DeckRoot);

export default DeckApp;