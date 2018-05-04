import { MapMode, MapBase, DOT_COLORS, OLD_COLORS} from '../constants/map_constants'
import {UPDATE_MAP, SELECT_MODE, LOAD_POP_POINTS, LOAD_HOLC,LOAD_HEXES, UPDATE_STYLE, UPDATE_OPACITY} from '../constants/action_types'
import MAP_STYLE from '../../data/mapStyles/philMap'
import {fromJS} from "immutable";

const defaultMapStyle = fromJS(MAP_STYLE);

//constants for initial state and flyto interpolators
const NY_LOCATION = {
    latitude: 40.70237278,
    longitude: -74.01143532,
};

const PH_LOCATION = {
    longitude: -75.1652,
    latitude: 39.9526,
};


const INITIAL_STATE = {
    mapViewState: {
        latitude: PH_LOCATION.latitude,
        longitude: PH_LOCATION.longitude,
        zoom: 11,
        maxZoom: 16,
        pitch: 60,
        useDevicePixels: false,
        bearing: 0
    },
    dotRadius: 1,
    pCol : DOT_COLORS,
    oCol : OLD_COLORS,
    layerOpacity: 1,
    popDots: null,
    holc: null,
    hexes: null,
    mapMode: MapMode.NONE,
    mapStyle : defaultMapStyle
};

const rootReducer = (state = INITIAL_STATE, action) => {switch (action.type) {
    case UPDATE_MAP:
        //spread notation: returns shallow copy of previous state, with new prop
        return {...state, mapViewState: action.mapViewState};
    case UPDATE_STYLE:
        console.log(action);
        return {...state, mapStyle: action.mapStyle};
    case UPDATE_OPACITY:
        return {...state, layerOpacity: action.layerOpacity};
    case SELECT_MODE:
        const mapViewState = state.mapViewState;
        return {...state, mapMode: action.mode};
    case LOAD_POP_POINTS:
        const popDots = action.points;
        return {...state, popDots: popDots};
    case LOAD_HOLC:
        return [];
    default:
        return state;
}};

export default rootReducer;