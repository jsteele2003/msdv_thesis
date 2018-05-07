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
import * as d3 from "d3-ease";
import {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';


const rasterMapStyle = fromJS(MAP_STYLE);
const defaultMapStyle = fromJS(DEF_STYLE);

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;


class ControlRoot extends PureComponent {
    constructor(props) {
        super(props);


        this.state = {
            width: '100%',
            background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #ffa7a0 100%)',
            visibility: 'visible',
            defaultView : {
                longitude: -75.07386546961281,
                latitude: 39.94791260958592,
                zoom: 11,
                minZoom: 5,
                maxZoom: 16,
                pitch: 60,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic

            }
        };
    }

    flyCam(updatedState){
        this.props.viewUpdateFunc(updatedState);
    };


    _handleEnter1(c){
        // console.log(c)
        if(c.previousPosition == 'below'){
            this.setState({width: '40%'});

            this.props.rasterSetFunc(rasterMapStyle);
            this.setState({visibility: 'hidden'});
            this.setState({background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%'});

            const updatedView = {
                zoom: 10,
                latitude: this.props.mapViewState.latitude,
                longitude: this.props.mapViewState.longitude,
                pitch: this.props.mapViewState.pitch,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            };
            this.flyCam(updatedView);
        }

    }

    _handleLeave1(c){
        if(c.currentPosition == 'below'){
            this.setState({width: '100%'});
            this.setState({visibility: 'visible'});
            this.setState({background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #ffa7a0 100%)'});
            this.props.selectModeFunc(MapMode.NONE);
            this.props.rasterSetFunc(defaultMapStyle);
            this.flyCam(this.state.defaultView);


        }
    }

    _handleEnter2(c){
        if(c.previousPosition == 'below') {
            const updatedView = {
                zoom: 10,
                latitude: this.props.mapViewState.latitude,
                longitude: this.props.mapViewState.longitude,
                pitch: this.props.mapViewState.pitch,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            };
            this.flyCam(updatedView);
        }
    }

    _handleLeave2(c){
        if(c.currentPosition == 'below') {

        }
    }


    _handleChangeMode(evt, mode) {
        const { mapMode } = this.props;
        if (mode === mapMode) {
            this.props.selectModeFunc(MapMode.NONE);
            return;
        }
        this.props.selectModeFunc(mode);
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
        const {mapMode} = this.props;
        const {width, background, visibility} = this.state;
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
                                            MOVING THE LINE
                                        </h1>
                                        <h3 className="text-center">
                                            SHIFTING BORDERS IN AMERICAN CITIES
                                        </h3>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ height: '30%'}}></Row>

                            <Row style={{ height: '70%'}}>
                                <Col xs={8} xsOffset={2}>
                                    <p style={{fontSize: '2em'}} >
                                        "Those free men who are shop keepers earn a moderate living but never expand their businesses beyond a certain point,
                                        The simple reason is that... the whites, who have the money, are not willing to lend to a Negro the capital
                                        necessary for a big commercial establishment."
                                    </p>
                                    <p> Jacques Pierre Brissot, 1788</p>
                                </Col>
                            </Row>

                            <Row style={{ height: '30%'}}></Row>

                            <Row style={{ height: '70%'}}>
                                <Col xs={8} xsOffset={2}>
                                    <p style={{fontSize: '2em'}} >
                                        Redlining Context
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
                                <Col xs={12} md={6} mdOffset={3}>
                                        <p style={{
                                            fontSize: '1.5em',
                                            textAlign: 'center',
                                            visibility: visibility}} >
                                            In particular, the borders drawn by these maps in Philadelphia, among other cities,
                                            made certain divisions more pronounced, across the lines of
                                            segregation, housing value, and income - borders which still exist in the present day
                                        </p>
                                </Col>
                            </Row>

                            <Row style={{ height: '30%'}}/>
                            <Waypoint
                                onEnter={(evt) => this._handleEnter1(evt)} onLeave={(evt) => this._handleLeave1(evt)}
                            />
                            <Row style={{ height: '100%'}}>

                                <Col xs={8} xsOffset={2}>
                                    <h1 className="text-center">
                                        PHILADELPHIA <br/>
                                        HOLC MAP, 1936
                                    </h1>
                                    <p style={{fontSize: '1.5em'}} >
                                        The maps bracketed cities into 4 categories (A-D) - measures of residential "security".
                                        Across the country, the lowest-ranked D neighbourhoods showed repeated difference in racial composition
                                        from the other, higher-rated areas.
                                    </p>
                                </Col>
                            </Row>
                            {/*<Waypoint*/}
                                {/*onEnter={(evt) => this._handleEnter2(evt)} onLeave={(evt) => this._handleLeave2(evt)}*/}
                            {/*/>*/}
                            <Row style={{ height: '80%'}}>

                            </Row>
                            <Row style={{ height: '30%'}}>
                                <Col xs={8} xsOffset={2}>
                                    <h1 className='text-center' >
                                        THOSE WHOSE WALLS ALREADY RISE - VIRGIL
                                    </h1>
                                </Col>
                            </Row>

                            <Row style={{height:'80%'}}>

                                <Col xs={12}>
                                <div className='title-label'>Mode Selection</div>
                                <div className='selection'>
                                    <input type="checkbox" checked={mapMode === MapMode.DOTS} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.DOTS)}}/>
                                    Population Dot Map
                                    <input type="checkbox" checked={mapMode === MapMode.OLD} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.OLD)}}/>
                                    HOLC Borders
                                    <input type="checkbox" checked={mapMode === MapMode.POLYINC} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.POLYINC)}}/>
                                    Census Divides
                                    <input type="checkbox" checked={mapMode === MapMode.POLYHS} onChange={(evt)=>{this._handleChangeMode(evt, MapMode.POLYHS)}}/>
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