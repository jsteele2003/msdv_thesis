import {UPDATE_MAP} from '../constants/action_types';

export const updateMap = mapViewState =>
    ({type: UPDATE_MAP, mapViewState: mapViewState});

