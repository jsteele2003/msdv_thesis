import {UPDATE_MAP, UPDATE_OPACITY, SELECT_MODE, LOAD_HEXES, LOAD_HOLC, LOAD_POP_POINTS, UPDATE_STYLE} from '../constants/action_types';

export const updateMap = mapViewState =>
    ({type: UPDATE_MAP, mapViewState: mapViewState});

export const updateStyle = mapStyle =>
    ({type: UPDATE_STYLE, mapStyle: mapStyle});

export const updateOpacity = layerOpacity =>
    ({type: UPDATE_OPACITY, layerOpacity: layerOpacity});

export const selectMode = mode =>
    ({type: SELECT_MODE, mode: mode});

export const selectBase = base =>
    ({type: SELECT_BASE, base: base});

export const selectYear = year =>
    ({type: SELECT_YEAR, year: year});

export function loadPopPoints(points) {
    return {type: LOAD_POP_POINTS, points: points};
}

export function loadHolc(polygons) {
    return {type: LOAD_HOLC, polygons: polygons};
}

export function loadHex(data) {
    return {type: LOAD_HEXES, data: data}
}

