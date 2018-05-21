import {UPDATE_MAP, SELECT_MODE, LOAD_POLY, LOAD_HSPOLY, LOAD_HOLC, LOAD_OLD_POINTS, LOAD_POP_POINTS, UPDATE_SCALE, UPDATE_STYLE} from '../constants/action_types';

export const updateMap = mapViewState =>
    ({type: UPDATE_MAP, mapViewState: mapViewState});

export const updateStyle = mapStyle =>
    ({type: UPDATE_STYLE, mapStyle: mapStyle});

export const updateScale = polyScaler =>
    ({type: UPDATE_SCALE, polyScaler: polyScaler});

export const updateOpacity = layerOpacity =>
    ({type: UPDATE_OPACITY, layerOpacity: layerOpacity});

export const selectMode = mode =>
    ({type: SELECT_MODE, mode: mode});

export function loadPopPoints(points) {
    return {type: LOAD_POP_POINTS, points: points};
}

export function loadOldPoints(points) {
    return {type: LOAD_OLD_POINTS, points: points};
}

export function loadPoly(polygons) {
    return {type: LOAD_POLY, polygons: polygons};
}

export function loadHolc(holc) {
    return {type: LOAD_HOLC, holc: holc};
}

export function loadHsPoly(hsPolygons) {
    return {type: LOAD_HSPOLY, hsPolygons: hsPolygons};
}


