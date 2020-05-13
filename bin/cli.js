#!/usr/bin/env node

const { program } = require('commander')
const _ = require('lodash')
const randomFloat = require('random-float')
const {
  generatePointSquare,
  buildPointFeatureCollection,
  generateRandomPointSquare
} = require('./../src/points')

program
  .version('0.0.1')
  .requiredOption('-b, --bbox <[s,w,n,e]>', 'bbox in which to limit points', JSON.parse)
  .option('-c, --count <number>', 'number of points to create')
  .option('-r, --random', 'place points randomly')
  .parse(process.argv)

const count = program.count || 1000
const coordList = program.random ?
  generateRandomPointSquare(program.bbox, count) : generatePointSquare(program.bbox, count)
const geojson = buildPointFeatureCollection(coordList)

console.log(JSON.stringify(geojson, null, 2))
