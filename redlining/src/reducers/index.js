import { MapMode } from '../constants/map_constants'

const NY_LOCATION = {
    latitude: 40.70237278,
    longitude: -74.01143532,
}

const PH_LOCATION = {
    longitude: -75.1652,
    latitude: 39.9526,
}


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
};

const rootReducer = (state = INITIAL_STATE, action) => {switch (action.type) {
    case 'UPDATE_MAP':
        //spread notation: returns previous state, with new prop
        console.log(action);
        return {...state, mapViewState: action.mapViewState};
    case 'SELECT_MODE':
        const mapViewState = state.mapViewState;
        console.log(action.mode)
        return {...state, mapViewState, mapMode: action.mode}
    default:
        return state;
}};

export default rootReducer;