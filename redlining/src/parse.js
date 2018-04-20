const fs = require('fs');
const csvjs=require('csvtojson');
const weightedRandom = require('weighted-random');

let randomPointsOnPolygon = require('random-points-on-polygon');
let turf = require('@turf/turf');

let numPoints = 1;
let polygon = turf.randomPolygon(1);
// console.log(polygon.features);

// let points = randomPointsOnPolygon(numPoints, polygon.features[0]);
// console.log(points);

const censusFilePath='../data/pa_census16_obj.csv';
const geoFilePath='../data/pa_16_final.json';



function genJson(filePath) {
    let rJson = [];

    csvjs()
        .fromFile(censusFilePath)
        .on('json', (jsonObj) => {
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


            // combine csv header row and csv line to a json object
            // jsonObj.a ==> 1 or 4
        })
        .on('done', (error) => {
            // console.log(error);
            console.log(rJson);
            fs.writeFile("./pa_16_stats.json", JSON.stringify(rJson))
        })
}

function genPoints(filePath){
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        // console.log(JSON.parse(data));
        let rArr = [];
        let geoData = JSON.parse(data);
        geoData.features.forEach(function(elem, index){
            let pop = parseInt((elem.properties['totalPop'] / 10));
            if(pop > 10){
                let ptArr = [];
                let weights = [];
                let income = elem.properties['medianIncome'];
                weights.push(parseInt(pop  * (.01 * elem.properties['numWhite'])));
                weights.push(parseInt(pop  * (.01 * elem.properties['numBlack'])));
                weights.push(parseInt(pop  * (.01 * elem.properties['numAsian'])));
                weights.push(parseInt(pop  * (.01 * elem.properties['numLatino'])));

                // console.log(totPts);

                let points = randomPointsOnPolygon(pop, elem);
                // console.log(pop)
                points.forEach(function(elem) {
                    ptArr = elem.geometry.coordinates;
                    ptArr.push(weightedRandom(weights));
                    // console.log(ptArr);
                    // console.log(weights);
                    rArr.push(ptArr);
                })
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

genPoints(geoFilePath);
