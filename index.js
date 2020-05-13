#!/usr/bin/env node

const { program } = require('commander')
const _ = require('lodash')
const randomFloat = require('random-float')
const { generatePointSquare, buildPointFeatureCollection } = require('./src/points')

function parseArray(value, _previous) {
    return JSON.parse(value)
}

program
  .version('0.0.1')
  .option('-b, --bbox <[Number]>', 'bbox in which to limit points', parseArray)
  .option('-c, --count <number>', 'number of points to create')
  // .option('-r, --random', 'place points randomly')
  .option('-f, --file <string>', 'file to output to')
  .parse(process.argv)

const count = program.count || 1000
let coordList = generatePointSquare(program.bbox, count)

let pointFeatures = coordList.map(coords => {
  return {
    type: 'Feature',
    properties: {
      value: parseFloat(randomFloat(0, 100).toFixed(2))
    },
    geometry: {
      type: 'Point',
      coordinates: coords
    }
  }
})

const featureCollection = {
  type: 'FeatureCollection',
  features: pointFeatures
}

console.log(JSON.stringify(featureCollection, null, 2))
// TODO: output to file
