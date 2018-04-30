import {UPDATE_MAP, SELECT_MODE, LOAD_HEXES, LOAD_HOLC, LOAD_POP_POINTS} from '../constants/action_types';

export const updateMap = mapViewState =>
    ({type: UPDATE_MAP, mapViewState: mapViewState});

export const selectMode = mode =>
    ({type: SELECT_MODE, mode: mode});

export function loadPopPoints(points) {
    return {type: LOAD_POP_POINTS, points: points};
}

export function loadHolc(polygons) {
    return {type: LOAD_HOLC, polygons: polygons};
}

export function loadHex(data) {
    return {type: LOAD_HEXES, data: data}
}

