const _ = require('lodash')
const randomFloat = require('random-float')

function generatePointSquare(bbox, count) {
  const [s,w,n,e] = bbox
  const pointsPerRow = Math.floor(Math.sqrt(count))
  const latDelta = (e - w)/pointsPerRow
  const lngDelta = (n - s)/pointsPerRow
  let points = []
  _.times(pointsPerRow, (i) => {
    _.times(pointsPerRow, (j) => {
      const lng = s + (lngDelta * i)
      const lat = w + (latDelta * j)
      points.push([parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))])
    })
  })
  return points
}

function generateRandomPointSquare(bbox, count) {
  const [s,w,n,e] = bbox
  let points = []
  _.times(count, (i) => {
    const lat = randomFloat(e, w)
    const lng = randomFloat(n, s)
    points.push([parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))])
  })
  return points
}

function buildPointFeatureCollection(coordList) {
  return {
    type: 'FeatureCollection',
    features: coordList.map(coords => {
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
  }
}

module.exports = {
  generatePointSquare,
  buildPointFeatureCollection,
  generateRandomPointSquare
}
