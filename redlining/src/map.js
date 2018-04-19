import React from 'react'
// import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import data from '../data/HOLC_Philadelphia.json';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


const options = [{
    name: 'HOLC',
    property: 'holc_grade',
    type: 'categorical',
    stops: [
        ['A', '#f8d5cc'],
        ['B', '#f4bfb6'],
        ['C', '#f1a8a5'],
        ['D', '#ee8f9a']
    ]
}]


export default class Map extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {
            active: options[0]
        };
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
        });

        this.map.on('load', () => {
            this.map.addSource('philly_holc', {
                type: 'geojson',
                data: data
            });

            this.map.addLayer({
                id: 'philly_holc',
                type: 'fill',
                source: 'philly_holc'
            });

            this.setFill();
    })

    }

    componentWillUnmount() {
        this.map.remove();
    }

    setFill() {
        const { property, stops } = this.state.active;
        console.log(property + " " + stops);
        this.map.setPaintProperty('philly_holc', 'fill-color', {
            property,
            stops,
            type: 'categorical'
        });
    }

    render() {
        const style = {
            position: 'absolute',
                top: 0,
                bottom: 0,
                width: '100%'
        };

        return <div style={style} ref={el => this.mapContainer = el} />;
    }
}
// ReactDOM.render(<Map />, document.getElementById('map'));