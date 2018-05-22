import React, {PureComponent} from 'react';
import { MapMode, MapBase, OLD_COLORS } from '../constants/map_constants';
import PropTypes from 'prop-types';
import { BarLoader } from 'react-spinners';
import { ControlContainer} from './styledInfo';
import { connect } from 'react-redux';
import { Button, Badge, Grid, Glyphicon, Row, Col, ButtonGroup} from 'react-bootstrap';
import Waypoint from 'react-waypoint';
import MAP_STYLE from '../../data/mapStyles/philMapRaster'
import DEF_STYLE from '../../data/mapStyles/philMap'
import {fromJS} from "immutable";
import * as d3 from "d3-ease";
import {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Badge, 'white');
bootstrapUtils.addStyle(Badge, 'wh');
bootstrapUtils.addStyle(Badge, 'poc');
bootstrapUtils.addStyle(Badge, 'black');
bootstrapUtils.addStyle(Badge, 'asian');
bootstrapUtils.addStyle(Badge, 'latino');
bootstrapUtils.addStyle(Badge, 'a');
bootstrapUtils.addStyle(Badge, 'b');
bootstrapUtils.addStyle(Badge, 'c');
bootstrapUtils.addStyle(Badge, 'd');


const rasterMapStyle = fromJS(MAP_STYLE);
const defaultMapStyle = fromJS(DEF_STYLE);

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;


class ControlRoot extends PureComponent {
    constructor(props) {
        super(props);


        this.state = {
            width: '100%',
            opacity: '0',
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

    _handleWidthClick(){
        this.setState({width: '40%'});
    }

    _handleLeave0(c){

        if(c.currentPosition == 'above'){
            this.setState({visibility: 'hidden'});
            this.setState({width: '40%'});
            this.setState({opacity: '1'});
            this.props.rasterSetFunc(rasterMapStyle);
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
            this.setState({view1 : updatedView});
            this.flyCam(updatedView);
        }
    }
    _handleLeave1(c){
        if(c.currentPosition == 'below'){
            this.setState({width: '100%'});
            this.setState({opacity: '0'});
            this.setState({background: '-webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #ffa7a0 100%)'});
            this.props.selectModeFunc(MapMode.NONE);
            this.props.rasterSetFunc(defaultMapStyle);
            this.flyCam(this.state.defaultView);
            this.setState({visibility: 'visible'});
        }

    }

    _handleEnter1(c){
        if(c.previousPosition == 'below'){
            this.setState({width: '40%'});
            this.setState({opacity: '1'});
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
            this.setState({view1 : updatedView});
            this.flyCam(updatedView);
        }

    }


    _handleEnter2(c){
        if(c.previousPosition == 'below') {
            const updatedView = {
                zoom: 10.0533,
                latitude: 39.98689007777527,
                longitude: -74.9651369263826,
                pitch: 0,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            };
            this.setState({view2: updatedView})
            this.flyCam(updatedView);
        }
    }

    _handleLeave2(c){
        if(c.currentPosition == 'below') {
            this.flyCam(this.state.view1);
            this.props.selectModeFunc(MapMode.NONE);

        }
    }

    _handleEnter3(c){
        if(c.previousPosition == 'below') {
            const updatedView = {
                zoom: 11.44,
                latitude: 39.965896627468595,
                longitude: -75.17340877118637,
                pitch: 0,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            };
            this.setState({view3: updatedView});
            this.flyCam(updatedView);
        }
    }

    _handleLeave3(c){
        if(c.currentPosition == 'below') {
            this.flyCam(this.state.view2);
            this.props.selectModeFunc(MapMode.NONE);

        }
    }

    _handleEnter4(c){
        if(c.previousPosition == 'below') {
            const updatedView = {
                zoom: 11.017839842367197,
                latitude: 39.99470722709801,
                longitude: -75.04688589769877,
                pitch: 0,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            };
            this.setState({view4: updatedView});
            this.flyCam(updatedView);
            this.props.rasterSetFunc(defaultMapStyle);
            if(this.props.mapMode == MapMode.OLD){
                setTimeout(() => this.props.selectModeFunc(MapMode.DOTS), 3000);
            }

        }
    }

    _handleLeave4(c){
        if(c.currentPosition == 'below') {
            this.flyCam(this.state.view3);
            this.props.rasterSetFunc(rasterMapStyle);
            if(this.props.mapMode == MapMode.DOTS){
                // this.props.selectModeFunc(MapMode.OLD);
                setTimeout(() => this.props.selectModeFunc(MapMode.OLD), 3000);
            }

        }
    }

    _handleEnter5(c){
        if(c.previousPosition == 'below') {
            const updatedView = {
                zoom: 11.017839842367197,
                latitude:  40.01199215140806,
                longitude: -75.13280475734666,
                pitch: 55.44616742850198,
                bearing: -91.25,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator(),
                transitionEasing: d3.easeCubic
            };
            this.setState({view5: updatedView});
            this.props.selectModeFunc(MapMode.NONE);
            this.flyCam(updatedView);

        }
    }

    _handleLeave5(c){
        if(c.currentPosition == 'below') {
            this.flyCam(this.state.view4);
            this.props.selectModeFunc(MapMode.NONE);

        }
    }

    _handleBtClick(mode){
        const { mapMode } = this.props;
        if (mode === mapMode && mapMode != MapMode.DOTS) {
            this.props.selectModeFunc(MapMode.NONE);
            return;
        }
        this.props.selectModeFunc(mode);
    }


    _handleChangeMode(evt, mode) {
        const { mapMode } = this.props;
        console.log(mode === mapMode);
        if (mode === mapMode) {
            this.props.selectModeFunc(MapMode.NONE);
            return;
        }
        this.props.selectModeFunc(mode);
    }


    render() {
        const {mapMode} = this.props;
        const {width, background, visibility, opacity} = this.state;
        const leadOpacity = (opacity == 1 ? 0 : 1)
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
                                        <h3 className="text-center"
                                            style={{ marginBottom: '10%'}}>
                                            SHIFTING BORDERS AND DISPARITIES IN AMERICAN CITIES
                                        </h3>

                                        <BarLoader
                                            className="text-center"
                                            color={'#D0021B'}
                                            width={"100%"}
                                            loading={this.props.oldDots === null}
                                        />
                                        {this.props.oldDots === null && <p className="text-center">Loading Data...</p>}


                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ height: '30%'}}></Row>

                            <Row>
                                <Col xs={6} xsOffset={3}>
                                    <p style={{fontSize: '20px'}} >
                                        In 2017, a Pew Research poll showed, by a 66-23% margin, that Americans believe interpersonal prejudice plays a larger role in discrimination than institutional causes.
                                        But more than determining the import of one such contributing factor over the other, the way Pew phrased this question omitted any consideration of how they intertwine in structural,
                                        self-perpetuating ways. American institutions and beliefs feed into one another continuously and cyclically- something exemplified by a particular historical trend, dating back to the
                                        beginning of the country itself.
                                    </p>
                                </Col>
                            </Row>

                            <Row style={{ height: '80%'}}></Row>


                            <Row>
                                <Col xs={6} xsOffset={3}>
                                    <h1 className="text-center" style={{fontStyle: 'italic'}}> Travels in America, 1788</h1>
                                    <p style={{fontSize: '20px'}} >
                                        "Those free men who are shop keepers earn a moderate living but never expand their businesses beyond a certain point,
                                        The simple reason is that... the whites, who have the money, are not willing to lend to a Negro the capital
                                        necessary for a big commercial establishment."
                                    </p>
                                    <p style={{fontSize:'16px'}}> -Jacques Pierre Brissot</p>
                                </Col>
                            </Row>


                            <Row style={{ height: '80%'}}></Row>

                            <Row>
                                <Col xs={6} xsOffset={3}>
                                    <p style={{
                                        fontSize: '20px',
                                        opacity: leadOpacity,
                                        transition: "opacity 3s ease-in-out",
                                        visibility: visibility}} >
                                        In the 20th Century, this practice came to be known generally as "redlining" - the selective denial of credit and services to physically-defined spaces, on the basis of race.
                                        However, the term grew out of a reference to something more specific:
                                        the Home Owner's Loan Corporation. Part of the New Deal, the federal program was conceived to underwrite loans to in-need Americans.
                                        But by the late 1930's, with the program supposedly winding down, HOLC began drawing maps of "residential security" for American cities -
                                        maps which often divided areas according to racial desirability.
                                    </p>

                                </Col>
                            </Row>

                            <Row style={{ height: '80%'}}></Row>

                            <Row style={{ height: '70%'}}>
                                <Col xs={6} xsOffset={3}>
                                        <p style={{
                                            fontSize: '20px',
                                            opacity: leadOpacity,
                                            transition: "opacity 3s ease-in-out",
                                            visibility: visibility}} >
                                            In cities like Philadelphia, the HOLC borders
                                            made certain divisions more pronounced, across the lines of
                                            segregation, housing value, and income - disparities which are still physically-realised in the present day.
                                        </p>
                                    <Waypoint
                                        onLeave={(evt) => this._handleLeave0(evt)}
                                    />
                                </Col>
                                {/*<Col xs={1} xsOffset={1}>*/}
                                    {/*<Button bsSize="large"  onClick={() => this._handleWidthClick()}>*/}
                                        {/*<Glyphicon glyph="chevron-right" />*/}
                                    {/*</Button>*/}
                                {/*</Col>*/}
                            </Row>
                            <Row style={{ height: '20%'}}/>
                            <Row>
                                <Col xs={8} xsOffset={2} style={{opacity: opacity,
                                    transition: "opacity 5s ease-in-out",}}>
                                    <Waypoint
                                        onEnter={(evt) => this._handleEnter1(evt)} onLeave={(evt) => this._handleLeave1(evt)}
                                    />
                                    <h1 className="text-center">
                                        PHILADELPHIA <br/>
                                        HOLC MAP, 1936
                                    </h1>
                                    <p style={{fontSize: '20px',
                                           }} >
                                        The maps bracketed cities neighborhoods into 4 categories (A-D).
                                        Across the country, the lowest-ranked D neighbourhoods showed repeated differences in racial composition
                                        from the other, higher-rated areas- even when controlling for housing value.
                                    </p>
                                </Col>
                            </Row>
                            <Row style={{ height: '70%'}}></Row>
                            <Waypoint
                                onEnter={(evt) => this._handleEnter2(evt)} onLeave={(evt) => this._handleLeave2(evt)}
                            />
                            <Row>

                                <Col xs={8} xsOffset={2} style={{opacity: opacity,
                                    transition: "opacity 5s ease-in-out",}}>
                                    <style type="text/css">{`
                                    .badge-a {
                                        background-color: #3ead4d;
                                        line-height:2;
                                        margin-right: 5%;
                                        min-width:30px;
                                        border-radius:0px;
                                    }
                                    .badge-b {
                                        line-height:2;
                                         background-color: #3e56ad;
                                         min-width:30px;
                                         margin-right: 2.5%;
                                         border-radius:0px;
                                    }
                                    .badge-c {
                                        line-height:2;
                                         background-color: #a5ad3e;
                                         margin-left:2.5%;
                                         min-width:30px;
                                         border-radius:0px;
                                    }
                                    .badge-d {
                                        line-height:2;
                                        margin-left:5%;
                                         background-color: #ad3e3e;
                                         min-width:30px;
                                         border-radius:0px;
                                    }
                                    `}</style>
                                    <p style={{fontSize: '20px'}} >
                                        In this case, the most apparent instance of the trend is in West Philadelphia, on a border defined by Market Street-
                                        the area north of which was shaded entirely in red.
                                    </p>
                                    <div style={{marginTop:'10%', display: 'flex', justifyContent: 'center'}}>
                                        <Badge bsStyle="a">A</Badge> <Badge bsStyle="b">B</Badge><Badge bsStyle="c">C</Badge><Badge bsStyle="d">D</Badge>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ height: '70%'}}></Row>
                            <Waypoint
                                onEnter={(evt) => this._handleEnter3(evt)} onLeave={(evt) => this._handleLeave3(evt)}
                            />
                            <Row style={{ height: '100%'}}>
                                <Col xs={8} xsOffset={2}>
                                    <h1 className="text-center">
                                        PHILADELPHIA, <br/>
                                        1940
                                    </h1>
                                    <p style={{fontSize: '20px'}} >
                                        If we overlay demographic data from along this border, the racial divide becomes readily apparent; in general, virtually every
                                        minority-populated area in the city was also redlined.

                                    </p>
                                    <Button className="text-center" active={mapMode === MapMode.OLD} onClick={() => this._handleBtClick(MapMode.OLD)} block> 1940 Data</Button>
                                    <p style={{fontSize: '20px'}}>Each dot represents a single person, living in Philadelphia in 1940; the colour of the dot corresponds to whether that person was White or PoC.
                                    Hover over the map to inspect the underlying HOLC lines.</p>
                                    <style type="text/css">{`
                                    .badge-white {
                                        margin-right:5%;
                                        background-color: #0080ff;
                                        min-width:30px;
                                        line-height:2;
                                        border-radius: 15px;
                                    }
                                    .badge-wh {
                                        margin-right:2.5%;
                                        background-color: #0080ff;
                                        min-width:30px;
                                        line-height:2;
                                        border-radius: 15px;
                                    }
                                    .badge-poc {
                                        line-height:2;
                                        margin-left:2.5%
                                        min-width:30px;
                                         background-color: #f45006;
                                         border-radius: 15px;
                                    }
                                    .badge-black {
                                        margin-right:2.5%;
                                        line-height:2;
                                        min-width:30px;
                                        background-color: #ff0080;
                                        border-radius: 15px;
                                    }
                                    .badge-asian {
                                        line-height:2;
                                        margin-left:2.5%;
                                        min-width:30px;
                                         background-color: #89f442;
                                         border-radius: 15px;
                                    }
                                    .badge-latino {
                                        line-height:2;
                                        margin-left:5%;
                                        min-width:30px;
                                         background-color: #f49542;
                                         border-radius: 15px;
                                    }
                                    `}</style>
                                    <div style={{marginTop:'10%', display: 'flex', justifyContent: 'center'}}>
                                        <Badge bsStyle="wh">White</Badge> <Badge bsStyle="poc">PoC</Badge>
                                    </div>

                                </Col>
                            </Row>
                            <Row style={{ height: '30%'}}></Row>
                            <Row>

                                <Col xs={8} xsOffset={2}>
                                    <Waypoint
                                        onEnter={(evt) => this._handleEnter4(evt)} onLeave={(evt) => this._handleLeave4(evt)}
                                    />
                                    <h1 className="text-center">
                                        PHILADELPHIA, <br/>
                                        2010
                                    </h1>
                                    <p style={{fontSize: '20px'}} >
                                        These lines of segregation may have shifted over time, but they haven't dissolved.
                                        Although the segregating effects of the HOLC maps reached their worst point in the 1960's, before the passage of federal civil rights laws
                                        such as the Fair Housing and Community Reinvestment Acts, research efforts in 2017 showed still-lingering borders along the original C-D boundaries.
                                        With the more granular demographic information that is now available, we can distinguish an array of spatial disparities and divisions in Philadelphia from the current decade.
                                        Now when you hover over the map, you can inspect contemporary Philly neighbourhoods- and see how many are defined by the racial divides seen here.
                                    </p>
                                    <Button className="text-center" active={mapMode === MapMode.DOTS} onClick={() => this._handleBtClick(MapMode.DOTS)} block> 2010 Data</Button>
                                    <div style={{marginTop:'10%', display: 'flex', justifyContent: 'center'}}>
                                        <Badge bsStyle="white">White</Badge> <Badge bsStyle="black">Black</Badge><Badge bsStyle="asian">Asian</Badge><Badge bsStyle="latino">Latino</Badge>
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ height: '50%'}}></Row>
                            <Row>

                                <Col xs={8} xsOffset={2}>
                                    <Waypoint
                                        onEnter={(evt) => this._handleEnter5(evt)} onLeave={(evt) => this._handleLeave5(evt)}
                                    />
                                    <h1 className="text-center">
                                        DIVIDING <br/>
                                        LINES
                                    </h1>
                                    <p style={{fontSize: '20px'}} >
                                        The city borders don't just express purely racial divides;
                                        the disparities in socioeconomic which exist in general in America can be seen along these boundaries too.
                                        The average black family possesses 1/13th the wealth of the average white one;
                                    </p>
                                    <ButtonGroup vertical block>
                                        <Button className="text-center" active={mapMode === MapMode.POLYINC} onClick={() => this._handleBtClick(MapMode.POLYINC)}> Scale Tracts by Income</Button>
                                        <Button className="text-center" active={mapMode === MapMode.POLYHS} onClick={() => this._handleBtClick(MapMode.POLYHS)}> Scale Tracts by Housing Value</Button>

                                    </ButtonGroup>;

                                </Col>
                            </Row>
                            <Row style={{ height: '50%'}}></Row>



                        </Grid>;

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
        mapViewState: state.rootReducer.mapViewState,
        mapMode: state.rootReducer.mapMode,
        mapStyle: state.rootReducer.mapStyle,
        polygons: state.rootReducer.polygons,
        oldDots: state.rootReducer.oldDots,
        popDots: state.rootReducer.popDots,
    }
}
const ControlPanel = connect(mapStateToProps)(ControlRoot);

export default ControlPanel;