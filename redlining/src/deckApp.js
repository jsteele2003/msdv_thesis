import React from 'react';
import MapGL from 'react-map-gl';
import reducer from './reducers/index';
import LoadingBar from 'react-redux-loading-bar';

import {
    updateMap, selectMode, loadPopPoints, loadOldPoints, updateScale, updateStyle,
    loadPoly, loadHsPoly
} from './actions/action';
import {
    DARK_TOKEN, MAPBOX_TOKEN, MapMode, dots16_URL, dots40_URL, poly_URL, dots16_PROD, dots40_PROD, poly_PROD,
    hsPoly_URL
} from './constants/map_constants';

import { renderDotsOverlay } from './deckLayers/popDotsLayer';
import PolyOverlay from './deckLayers/polyGeoLayer';

import {fromJS} from 'immutable';
import MAP_STYLE from '../data/mapStyles/defaultMap';

const defaultMapStyle = fromJS(MAP_STYLE);

import ControlPanel from './hud/controlPanel';
import {connect} from "react-redux";

class DeckRoot extends React.PureComponent {
    constructor(props) {
        super(props);

        //window viewport state, not needed in redux tree, only for resize handling
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        };


    }

    componentDidMount() {
        this.loadData();
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
        this._loadDispatch(dots16_PROD, (data) => this.props.dispatch(loadPopPoints(data)));
        this._loadDispatch(dots40_PROD, (data) => this.props.dispatch(loadOldPoints(data)));
        this._loadDispatch(poly_PROD, (data) => this.props.dispatch(loadPoly(data)));
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

    _handleScaleChange(scaler) {
        this.props.dispatch(updateScale(scaler))
    }



    _renderVisualizationOverlay() {
        const { popDots} = this.props;
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
            //each will evaluate to expression to render when MODE passes
            <div>
                { renderDotsOverlay(layerParams) }
                <PolyOverlay {...layerParams} />
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
            scaleFunc: this._handleScaleChange.bind(this),
            rasterSetFunc: this._onStyleChange.bind(this),
            viewUpdateFunc: this._handleViewportChanged.bind(this)
        }

        return (
            <div>
                <header>
                    <LoadingBar />
                </header>
                <MapGL
                    mapboxApiAccessToken={DARK_TOKEN}
                    width={width}
                    height={height}
                    mapStyle={mapStyle}
                    perspectiveEnabled
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
        mapViewState: state.rootReducer.mapViewState,
        oldDots: state.rootReducer.oldDots,
        popDots: state.rootReducer.popDots,
        polygons: state.rootReducer.polygons,
        mapMode: state.rootReducer.mapMode,
        mapStyle: state.rootReducer.mapStyle,
        layerOpacity: state.rootReducer.layerOpacity,
        pCol: state.rootReducer.pCol,
        oCol: state.rootReducer.oCol,
    }
}
const DeckApp = connect(mapStateToProps)(DeckRoot);

export default DeckApp;