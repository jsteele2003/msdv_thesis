const DEV_ARR = ['Philadelphia'];
const COUNTIES_ARR = ['Philadelphia', 'Queens', 'New York', 'Richmond City', 'Bronx', 'Kings', 'Fulton', 'DeKalb'];
const fs = require('fs');
const csvjs=require('csvtojson');
const reproject = require('reproject');
const proj4 = require('proj4')
const weightedRandom = require('weighted-random');
const fromProj = '+proj=aea +lat_1=29.5 +lat_2=45.5 +lat_0=37.5 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m no_defs';

let randomPointsOnPolygon = require('random-points-on-polygon');
let turf = require('@turf/turf');

const censusFilePath_2016='../../data/2016/pa_census16_obj.csv';
const censusFilePath_1940='../../data/1940/1940_pop.csv';

const geoFilePath= '/Users/joesteele/WebstormProjects/msdv_thesis/redlining/data/2016/pa_16_final.json';
const geoFilePath_1940='../../data/1940/1940_combinedGeo.json';


/**
 *
 * @param filePath: path to csv file to be transformed
 * @param year: data source year
 * @returns write to .json, for ndjson
 */
function genJson(filePath, year) {
    let rJson = [];

    csvjs()
        .fromFile(filePath)
        .on('json', (jsonObj) => {
            if (year == 2016) {
                let displayInfo = (jsonObj.GEO.display).split(',');
                let rObj = {
                    display: (displayInfo[0] + "," + displayInfo[1]),
                    median_income: jsonObj.Properties["Total; Estimate; Median income (dollars)"],
                    id: jsonObj.GEO.id2,
                    totalPop: jsonObj.Properties["Total; Estimate; Total population"],
                    numWhite: jsonObj.Properties['Total; Estimate; White alone, not Hispanic or Latino'],
                    numBlack: jsonObj.Properties['Total; Estimate; RACE AND HISPANIC OR LATINO ORIGIN - One race - Black or African American'],
                    numAsian: jsonObj.Properties['Total; Estimate; RACE AND HISPANIC OR LATINO ORIGIN - One race - Asian'],
                    numLatino: jsonObj.Properties['Total; Estimate; Hispanic or Latino origin (of any race)'],

                };
                rJson.push(rObj)
            } else if (year == 1940){
                rJson.push(jsonObj)

            }

            // combine csv header row and csv line to a json object
            // jsonObj.a ==> 1 or 4
        })
        .on('done', (error) => {
            // console.log(error);
            console.log(rJson);
            fs.writeFile("./" + year + '_stats.json', JSON.stringify(rJson));
        })
}

/**
 *
 * @param filePath
 * @param year
 * @return 'totalPop' bilinear interpolations of census tract polygons,
 */

function genPoints(filePath, year){
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data));
        let rArr = [];
        let geoData = JSON.parse(data);
        geoData.features.forEach(function(elem, index){
            let pop = parseInt((elem.properties['totalPop'])) / 10;
            if(year ==2016) {
                let county = elem.properties['display'].split(',')[1].split(" ")[1];
                if (pop > 10 && county == 'Philadelphia') {
                    let ptArr = [];
                    let weights = [];
                    let income = elem.properties['medianIncome'];
                    weights.push(parseInt(pop * (.01 * elem.properties['numWhite'])));
                    weights.push(parseInt(pop * (.01 * elem.properties['numBlack'])));
                    weights.push(parseInt(pop * (.01 * elem.properties['numAsian'])));
                    weights.push(parseInt(pop * (.01 * elem.properties['numLatino'])));


                    let points = randomPointsOnPolygon(pop, elem);
                    console.log(pop)
                    points.forEach(function (elem) {
                        ptArr = elem.geometry.coordinates;
                        ptArr.push(weightedRandom(weights));
                        ptArr.push(income);
                        rArr.push(ptArr);
                    })
                }
            } else if(year == 1940){
                let county = elem.properties['county'];
                    if(pop > 10 && DEV_ARR.includes(county)){
                        let ptArr = [];
                        let weights = [];
                        weights.push(parseInt(elem.properties['numwhite']));
                        weights.push(parseInt(elem.properties['numPOC']));

                        let  points = randomPointsOnPolygon(pop, elem);
                        // console.log(pop)
                        points.forEach(function (point) {
                            // console.log(reproject.reverse(reproject.reproject(point, fromProj, proj4.WGS84)));
                            ptArr = reproject.reproject(point, fromProj, proj4.WGS84).geometry.coordinates;
                            ptArr.push(weightedRandom(weights));
                            rArr.push(ptArr);
                            // console.log(ptArr);
                        })
                    }
            }
        })
        // console.log(rArr);
        fs.writeFile("../data/" + year + "/" + year + "Dots.json", JSON.stringify(rArr))
    });
}

function genHexPoints(filePath){

}

//helper rng
let rand = function(min, max) {
    return Math.random() * (max - min) + min;
};
// genJson(censusFilePath_1940, 1940);
console.log(process.cwd())
genPoints(geoFilePath, 2016);
