const fs = require('fs');
const csvjs=require('csvtojson');
const weightedRandom = require('weighted-random');

let randomPointsOnPolygon = require('random-points-on-polygon');
let turf = require('@turf/turf');

const censusFilePath_2016='../data/2016/pa_census16_obj.csv';
const censusFilePath_1940='../data/1940/1940_pop.csv';

const geoFilePath='../data/2016/pa_16_final.json';
const geoFilePath_1940='../data/1940/1940_combinedGeo.json';



/**
 *
 * @param filePath: path to csv file to be transformed
 * @returns write to .json, for ndjson-cli
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
};

/**
 *
 * @param filePath
 * @return 'totalPop' bilinear interpolations of census tract polygons,
 */

function genPoints(filePath, year, scope){
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data));
        let rArr = [];
        let geoData = JSON.parse(data);
        geoData.features.forEach(function(elem, index){
            let pop = parseInt((elem.properties['totalPop']));
            if(year ==2016) {
                let county = elem.properties['display'].split(',')[1];
                if (pop > 10 && county == ' Philadelphia County') {
                    let ptArr = [];
                    let weights = [];
                    let income = elem.properties['medianIncome'];
                    weights.push(parseInt(pop * (.01 * elem.properties['numWhite'])));
                    weights.push(parseInt(pop * (.01 * elem.properties['numBlack'])));
                    weights.push(parseInt(pop * (.01 * elem.properties['numAsian'])));
                    weights.push(parseInt(pop * (.01 * elem.properties['numLatino'])));

                    // console.log(totPts);

                    let points = randomPointsOnPolygon(pop, elem);
                    // console.log(pop)
                    points.forEach(function (elem) {
                        ptArr = elem.geometry.coordinates;
                        ptArr.push(weightedRandom(weights));
                        ptArr.push(elem.properties['"median_income"']);
                        rArr.push(ptArr);
                    })
                }
            } else if(year == 1940){
                let county = elem.properties['county'];
                    console.log(county);

            }
        })
        console.log(rArr);
        fs.writeFile("./pennDots.json", JSON.stringify(rArr))
    });
}

//helper rng
let rand = function(min, max) {
    return Math.random() * (max - min) + min;
};
// genJson(censusFilePath_1940, 1940);

genPoints(geoFilePath_1940, 1940);
