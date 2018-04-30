import React, {PureComponent} from 'react';
import { MapMode } from '../constants/map_constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;


class ControlPanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    _handleChangeMode(evt, mode) {
        const { mapMode } = this.props;
        if (mode === mapMode) {
            this.props.selectModeFunc(MapMode.NONE);
            return;
        }
        this.props.selectModeFunc(mode)
    }

    render() {
        const mapMode = this.props;
        console.log(mapMode)
        const Container = this.props.containerComponent || defaultContainer;
        return (
            <Container>
                <div className='title-label'>Mode Selection</div>
                <div className='selection'>
                    <input type="checkbox" checked={mapMode === MapMode.DOTS} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.DOTS)}}/>
                    Population Dot Map
                    <input type="checkbox" checked={mapMode === MapMode.HOLC} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.HOLC)}}/>
                    HOLC Borders
                    <input type="checkbox" checked={mapMode === MapMode.HEXES} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.HEXES)}}/>
                    Income Hex Grid
                </div>
            </Container>
        )
    }

}

ControlPanel.propTypes = {
    mapMode: PropTypes.string,

    // Temporary solution
    selectModeFunc: PropTypes.func,
}

export default ControlPanel;