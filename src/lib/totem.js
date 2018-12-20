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
        let lightness = ((prediction.sliderValueLightness > 100) ? 100 : prediction.sliderValueLightness)
        let color = '#' + colorConvert.hsv.hex([prediction.sliderValueHue, 65, lightness])
        let primitive = 'a-' + Object.keys(prediction.shapes).reduce((a, b) => prediction.shapes[a] > prediction.shapes[b] ? a : b)
        if(primitive === 'a-ellipsoid') {
          primitive = 'a-sphere'
        }
        let parameterObject = {
          'scaleValue': prediction.sliderValueScale/100,
          'primitive': primitive,
          'color': color,
          'opacity': prediction.sliderValueOpacity / 100,
          'position': '0 1.5 -3',
          'gloss': 1 - prediction.sliderValueMatte,
          'scale': prediction.sliderValueScale/100 + ' ' + prediction.sliderValueScale/100 + ' ' + prediction.sliderValueScale/100,
          'radius': parseInt(prediction.sliderValueRadius)/100,
          'width': parseInt(prediction.sliderValueWidth)/100,
          'height': parseInt(prediction.sliderValueHeight)/100,
          'radiusBottom': parseInt(prediction.sliderValueRadius)/100,
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

export async function shape(array) {
  return getPrediction(array)
}