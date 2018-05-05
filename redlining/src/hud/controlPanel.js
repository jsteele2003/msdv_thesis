import React, {PureComponent} from 'react';
import { MapMode, MapBase } from '../constants/map_constants';
import PropTypes from 'prop-types';
import {Title, ControlContainer} from './styledInfo';
import { connect } from 'react-redux';
import { Button, Grid, Row, Col, ButtonGroup } from 'react-bootstrap';
import Waypoint from 'react-waypoint';
import MAP_STYLE from '../../data/mapStyles/philMapRaster'
import DEF_STYLE from '../../data/mapStyles/philMap'
import {fromJS} from "immutable";

const rasterMapStyle = fromJS(MAP_STYLE);
const defaultMapStyle = fromJS(DEF_STYLE);

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;


class ControlRoot extends PureComponent {
    constructor(props) {
        super(props);


        this.state = {
            width: '100%',
            background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #ffa7a0 100%)',
            visibility: 'visible'
        };
    }


    _handleWipeEnter(c){
        // console.log(c)
        if(c.previousPosition == 'below'){
            this.setState({width: '40%'});

            this.props.rasterSetFunc(rasterMapStyle);


            this.setState({visibility: 'hidden'});
            this.setState({background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%'});
        }

    }


    _handleWipeLeave(c){
        if(c.currentPosition == 'below'){
            this.setState({width: '100%'});
            this.setState({visibility: 'visible'});
            this.setState({background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #ffa7a0 100%)'});
            this.props.selectModeFunc(MapMode.NONE);
            this.props.rasterSetFunc(defaultMapStyle);



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
        const {width, background, visibility} = this.state;
        const Container = this.props.containerComponent || defaultContainer;
        return (
            <ControlContainer style={{
                width: width,
                background: background,
                overflow: 'auto',
            }}>
                        <Grid
                            fluid={true}
                            style={{
                                position: 'relative',
                                height: '100%',
                                width: '100%',
                                overflow: 'auto',
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
                                            Shifting Borders in American Cities
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
                                        HOLC Context Placeholder
                                    </p>
                                </Col>
                            </Row>
                            <Row style={{ height: '30%'}}></Row>
                            <Row style={{ height: '70%'}}>
                                <Col xs={6} xsOffset={3} xsHidden={true}>
                                        <p style={{
                                            fontSize: '1.5em',
                                            visibility: visibility}} >
                                            In particular, the borders drawn by these maps in the cities of Philadelphia and New York
                                            made certain divisions more pronounced, across the lines of
                                            segregation, housing value, and income - borders which still exist in the present day
                                        </p>
                                </Col>
                            </Row>
                            <Row style={{ height: '80%'}}>
                            </Row>
                            <Row style={{height:'30%'}}>
                                <Waypoint
                                    onEnter={(evt) => this._handleWipeEnter(evt)} onLeave={(evt) => this._handleWipeLeave(evt)}
                                />
                                <Col xs={12}>
                                <div className='title-label'>Mode Selection</div>
                                <div className='selection'>
                                    <input type="checkbox" checked={mapMode === MapMode.DOTS} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.DOTS)}}/>
                                    Population Dot Map
                                    <input type="checkbox" checked={mapMode === MapMode.OLD} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.OLD)}}/>
                                    HOLC Borders
                                    <input type="checkbox" checked={mapMode === MapMode.POLYINC} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.POLYINC)}}/>
                                    Census Divides
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
                                </Col>
                            </Row>
                        </Grid>;


                {/*controls for redux */}



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
        polygons: state.polygons,
        mapMode: state.mapMode,
        mapBase: state.mapBase,
        mapStyle: state.mapStyle
    }
}
const ControlPanel = connect(mapStateToProps)(ControlRoot);

export default ControlPanel;