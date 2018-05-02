import React from 'react';
import MapGL from 'react-map-gl';
import DeckOverlay from './deckLayers/overlayContainer.js';
import rootReducer from './reducers/index';
import { updateMap, selectMode, loadPopPoints, loadHolc } from './actions/action';
import { DARK_TOKEN, MAPBOX_TOKEN, MapMode, dots16_URL} from './constants/map_constants';
import { renderDotsOverlay } from './deckLayers/popDotsLayer';
import {fromJS} from 'immutable';
import TEST_STYLE from '../data/mapStyles/testStyle';
import MAP_STYLE from '../data/mapStyles/defaultMap';


const defaultMapStyle = fromJS(MAP_STYLE);

console.log(defaultMapStyle);

import ControlPanel from './hud/controlPanel';

import TWEEN from '@tweenjs/tween.js';
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

    loadData() {
        fetch(dots16_URL)
            .then(resp => resp.json())
            .then(data => this.props.dispatch(loadPopPoints(data)));
    }

    //dispatches fetch response to state tree
    _loadDispatcher(path, onLoad){
        fetch(path);
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

    _onMouseEnter() {
        this.setState({mouseEntered: true});
    }

    _onMouseLeave() {
        this.setState({mouseEntered: false});
    }

    _onStyleChange (mapStyle){
        this.setState({mapStyle})
    }


    //universal dispatchers for control panel
    _handleSelectMode(mode) {
        this.props.dispatch(selectMode(mode))
    }

    _handleSelectBase(base) {
        this.props.dispatch(selectBase(base))
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
        const {mapViewState, mapMode, mapBase, mapStyle} = this.props;
        const { width, height} = this.state;
        const isActiveOverlay = mapMode !== MapMode.NONE;

        const mapSelectionProps = {
            mapMode: this.props.mapMode,
            selectModeFunc: this._handleSelectMode.bind(this),
        }
        console.log(mapStyle)

        return (
            <div>
                <MapGL
                    mapboxApiAccessToken={DARK_TOKEN}
                    width={width}
                    height={height}
                    mapStyle={defaultMapStyle}
                    { ...mapViewState }
                    onViewportChange={this._handleViewportChanged.bind(this)}>
                    {isActiveOverlay && this._renderVisualizationOverlay()}
                </MapGL>

                <ControlPanel {...mapSelectionProps} onChange={this._onStyleChange}/>
            </div>


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
        mapBase: state.mapBase,
        mapStyle: state.mapStyle
    }
}
const DeckApp = connect(mapStateToProps)(DeckRoot);

export default DeckApp;