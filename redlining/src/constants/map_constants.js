
export const COUNTIES_ARR = ['Philadelphia', 'Queens', 'New York', 'Richmond City', 'Baltimore City', 'Bronx', 'Kings', 'Fulton', 'DeKalb'];

export const MAPBOX_TOKEN = process.env.MAPBOX;

export const DARK_TOKEN = process.env.DARKBOX;

export const dots16_URL = '../data/2016/pennDots.json';

export const dots40_URL = '../data/1940/1940Dots.json';

export const holc_URL = '../data/holc/holc.geojson';

export const MapMode = {
    NONE: 'NONE',
    DOTS: 'DOTS',
    HEXES: 'HEXES',
    HOLC: 'HOLC',
    OLD: 'OLD'
}

export const MapBase = {
    NONE: 'NONE',
    TIFF: 'TIFF',
    TRACT: 'TRACT',
    HOLC: 'HOLC',
    BUILD: 'BUILD'
}


const W_COLOR = [0, 128, 255];
const B_COLOR = [255, 0, 128];
const A_COLOR = [137, 244, 66];
const L_COLOR = [244, 149, 66];
const C_COLOR = [244, 80, 6];


export const DOT_COLORS = [W_COLOR,B_COLOR,A_COLOR,L_COLOR];
export const OLD_COLORS = [W_COLOR, C_COLOR];



