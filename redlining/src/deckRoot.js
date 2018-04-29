import React from 'react';
import MapGL from 'react-map-gl';
import DeckOverlay from './deckLayers/dotOverlay.js';

const MAPBOX_TOKEN = process.env.MAPBOX;
const W_COLOR = [0, 128, 255];
const B_COLOR = [255, 0, 128];
const A_COLOR = [137, 244, 66];
const L_COLOR = [244, 149, 66];
const COLORS = [W_COLOR,B_COLOR,A_COLOR,L_COLOR];
const DATA_URL = '../data/2016/pennDots.json';


export default class DeckRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...DeckOverlay.defaultViewport,
                width: 0,
                height: 0,
                // style: 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
            },
            data: null,
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
        const {viewport, data, style} = this.state;
        // console.log(this);

        return (
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/joesteele/cjgd6f57e00072ro6e2srgmbs"
                onViewportChange={this._onViewportChange.bind(this)}
                mapboxApiAccessToken={'pk.eyJ1Ijoiam9lc3RlZWxlIiwiYSI6ImNqOXp5bjlyZzJqdXUzMnBjNXppbGV2Nm4ifQ.p_Pk2DU8shEp1UNTauqf2Q'}
            >
                <DeckOverlay
                    viewport={viewport}
                    data={data}
                    colors={COLORS}
                    wColor={W_COLOR}
                    bColor={B_COLOR}
                    aColor={A_COLOR}
                    radius={10}
                />
            </MapGL>
        );
    }
}