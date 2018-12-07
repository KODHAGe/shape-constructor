import axios from 'axios'
import colorConvert from 'color-convert'

async function getPrediction(array) {
  let parameterArray = []
  if(Array.isArray(array)){
    for(let emo of array) {
      try {
        let data = await axios.post(process.env.REACT_APP_INTERPRETER_URL + '/makePrediction', {
          'array': emo,
          'jwt': process.env.REACT_APP_JWT
        })
        let prediction = data.data
        let color = '#' + colorConvert.hsl.hex([prediction.sliderValueHue, 95, prediction.sliderValueLightness])
        let primitive = 'a-' + Object.keys(prediction.shapes).reduce((a, b) => prediction.shapes[a] > prediction.shapes[b] ? a : b)
        let parameterObject = {
          'primitive': primitive,
          'color': color,
          'position': '0 1.5 -3',
          'radius': parseInt(prediction.sliderValueRadius)/100,
          'width': parseInt(prediction.sliderValueWidth)/100,
          'height': parseInt(prediction.sliderValueHeight)/100,
          'radiusTubular': parseInt(prediction.sliderValueHeight)/1000,
          'depth': parseInt(prediction.sliderValueLength)/100,
          'rotation': parseInt(prediction.sliderValueRotX) + ' ' + parseInt(prediction.sliderValueRotY) + ' ' + parseInt(prediction.sliderValueRotZ)
        }
        parameterArray.push(parameterObject)
      } catch(error) {
        return error
      }
    }
    return parameterArray
  }
}

export function shape(array) {
  return getPrediction(array)
}