import React, {PureComponent} from 'react';
import { MapMode, MapBase } from '../constants/map_constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;


class ControlRoot extends PureComponent {
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount(){

        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function(to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollToBottom() {
        scroll.scrollToBottom();
    }

    scrollTo() {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    scrollMore() {
        scroll.scrollMore(100);
    }

    handleSetActive(to) {
        console.log(to);
    }

    _handleChangeMode(evt, mode) {
        const { mapMode } = this.props;
        if (mode === mapMode) {
            this.props.selectModeFunc(MapMode.NONE);
            return;
        }
        this.props.selectModeFunc(mode)
    }

    _handleChangeBase(evt, mode) {
        const { mapMode } = this.props;
        if (mode === mapMode) {
            this.props.selectModeFunc(MapMode.NONE);
            return;
        }
        this.props.selectModeFunc(mode)
    }


    render() {
        const {mapMode, mapBase} = this.props;
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

                    <div className='title-label'>Mouse Selection</div>
                    <ButtonGroup bsSize="large">
                        <Button active={true} onChange={(evt)=>{this._handleChangeBase(evt, MapMode.HOLC)}}>HOLC Borders</Button>
                        <Button>Census Borders</Button>
                    </ButtonGroup>

                <div className='title-label'>Cities</div>
                <ButtonGroup bsSize="large">
                    <Button>Philadelphia</Button>
                    <Button>New York</Button>
                </ButtonGroup>

            </Container>
        )
    }

}

ControlRoot.propTypes = {
    mapMode: PropTypes.string,

    // Temporary solution
    selectModeFunc: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        mapViewState: state.mapViewState,
        popDots: state.popDots,
        holc: state.holc,
        hexes: state.hexes,
        mapMode: state.mapMode,
        mapBase: state.mapBase,
        mapStyle: state.mapStyle
    }
}
const ControlPanel = connect(mapStateToProps)(ControlRoot);

export default ControlPanel;