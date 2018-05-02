import { MapMode, MapBase, MapYear} from '../constants/map_constants'
import {UPDATE_MAP, SELECT_MODE, LOAD_POP_POINTS, LOAD_HOLC,LOAD_HEXES} from '../constants/action_types'
import MAP_STYLE from '../../data/mapStyles/defaultMap'
import TEST_STYLE from '../../data/mapStyles/testStyle'



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
        pitch: 0,
        useDevicePixels: false,
        bearing: 0
    },
    popDots: null,
    holc: null,
    hexes: null,
    mapMode: MapMode.NONE,
    mapBase: MapBase.NONE,
    mapYear: 2016,
    mapStyle : process.env.MAP_DARK_STYLE
};

const rootReducer = (state = INITIAL_STATE, action) => {switch (action.type) {
    case UPDATE_MAP:
        //spread notation: returns shallow copy of previous state, with new prop
        return {...state, mapViewState: action.mapViewState};
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