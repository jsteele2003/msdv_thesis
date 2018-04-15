import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


class Map extends React.Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
        });
    }

    componentWillUnmount() {
        this.map.remove();
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

ReactDOM.render(<Map />, document.getElementById('map'));