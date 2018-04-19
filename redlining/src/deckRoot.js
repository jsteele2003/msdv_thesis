/* global document, fetch, window */
import React from 'react';
import MapGL from 'react-map-gl';
import DeckOverlay from './deckOverlay.js';

// Set your mapbox token here
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'; // eslint-disable-line
const MALE_COLOR = [0, 128, 255];
const FEMALE_COLOR = [255, 0, 128];

// Source data CSV
const DATA_URL =
    'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/scatterplot/manhattan.json'; // eslint-disable-line

export default class DeckRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...DeckOverlay.defaultViewport,
                width: 0,
                height: 0,
                style: 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
            },
            data: null
        };

        fetch(DATA_URL)
            .then(resp => resp.json())
            .then(data => this.setState({data}));
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport}
        });
    }

    render() {
        const {viewport, data} = this.state;

        return (
            <MapGL
                {...viewport}
                onViewportChange={this._onViewportChange.bind(this)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <DeckOverlay
                    viewport={viewport}
                    data={data}
                    maleColor={MALE_COLOR}
                    femaleColor={FEMALE_COLOR}
                    radius={15}
                />
            </MapGL>
        );
    }
}