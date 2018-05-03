import React, {PureComponent} from 'react';
import { MapMode, MapBase } from '../constants/map_constants';
import PropTypes from 'prop-types';
import {Title, ControlContainer} from './styledInfo';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap';
import Waypoint from 'react-waypoint';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;


class ControlRoot extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            width: '100%'
        };
    }


    _handleWipeEnter(c, p){
        console.log(c)
        if(this.state.width == '100%'){
            this.setState({width: '33%'})
        } else{
            this.setState({width: '100%'})
        }

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
        const {width} = this.state;
        console.log(width);
        const Container = this.props.containerComponent || defaultContainer;
        return (
            <ControlContainer style={{
                width: width
            }}>
                        <Grid
                            fluid={true}
                            style={{
                                position: 'relative',
                                height: '100%',
                                width: '100%',
                                overflow: 'scroll',
                            }}>

                            {/*hacky v offset*/}
                            <Row style={{ height: '30%'}}></Row>
                            <Row style={{ height: '70%'}}>
                                <Col xs={8} xsOffset={2}>

                                    <div className='textContainer'>
                                        <h1 className="text-center">
                                            Moving the Line
                                        </h1>
                                        <h3 className="text-center">
                                            Dividing Borders in American Cities
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ height: '30%'}}></Row>
                            <Row style={{ height: '70%'}}>
                                <Col xs={8} xsOffset={2}>
                                    <p style={{fontSize: '2em'}} >
                                        1788 Quote Placeholder
                                    </p>
                                </Col>
                            </Row>
                            <Row style={{ height: '30%'}}></Row>
                            <Row style={{ height: '70%'}}>
                                <Col xs={8} xsOffset={2}>
                                    <p style={{fontSize: '2em'}} >
                                        HOLC Context PLaceholder
                                    </p>
                                </Col>
                            </Row>
                            <Row style={{ height: '30%'}}></Row>
                            <Row style={{ height: '70%'}}>
                                <Col xs={8} xsOffset={2}>
                                        <p style={{fontSize: '1.5em'}} >
                                            In particular, the cities of Philadelphia and New York have shown sustained effects from these maps -
                                            up until the present day
                                        </p>
                                </Col>
                            </Row>
                            <Row style={{ height: '100%'}}>
                            </Row>
                            <Row>
                                <Waypoint
                                    onEnter={(currentPosition, previousPosition) => this._handleWipeEnter(currentPosition, previousPosition)}
                                />
                            </Row>
                        </Grid>;


                {/*controls for redux */}

                {/*<div className='title-label'>Mode Selection</div>*/}
                {/*<div className='selection'>*/}
                    {/*<input type="checkbox" checked={mapMode === MapMode.DOTS} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.DOTS)}}/>*/}
                    {/*Population Dot Map*/}
                    {/*<input type="checkbox" checked={mapMode === MapMode.HOLC} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.HOLC)}}/>*/}
                    {/*HOLC Borders*/}
                    {/*<input type="checkbox" checked={mapMode === MapMode.HEXES} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.HEXES)}}/>*/}
                    {/*Income Hex Grid*/}
                {/*</div>*/}

                    {/*<div className='title-label'>Mouse Selection</div>*/}
                    {/*<ButtonGroup bsSize="large">*/}
                        {/*<Button active={true} onChange={(evt)=>{this._handleChangeBase(evt, MapMode.HOLC)}}>HOLC Borders</Button>*/}
                        {/*<Button>Census Borders</Button>*/}
                    {/*</ButtonGroup>*/}

                {/*<div className='title-label'>Cities</div>*/}
                {/*<ButtonGroup bsSize="large">*/}
                    {/*<Button>Philadelphia</Button>*/}
                    {/*<Button>New York</Button>*/}
                {/*</ButtonGroup>*/}

            </ControlContainer>
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