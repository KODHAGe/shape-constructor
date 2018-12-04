import axios from 'axios'
import colorConvert from 'color-convert'

async function getPrediction(array) {
  try {
    let data = await axios.post(process.env.REACT_APP_INTERPRETER_URL + '/makePrediction', {
      'array': array,
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
    return parameterObject
  } catch(error) {
    return error
  }
}

export function shape(array) {
  return getPrediction(array)
}