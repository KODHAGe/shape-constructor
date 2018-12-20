import React from 'react'
import { useState, useEffect } from 'react';
import './Shape.css'

import 'aframe'
import 'aframe-effects'
import { Entity, Scene } from 'aframe-react' // I guess this is rather deprecated, refactor to https://www.npmjs.com/package/aframe-state-component at some point

import { shape } from '../lib/totem.js'

let handleClick = (event) => {
  let data = event.target.getAttribute('data')
  let emotions = event.target.getAttribute('emotions')
  let text = event.target.getAttribute('content')
  console.log(JSON.parse(data))
  console.log(JSON.parse(emotions))
  console.log(text)
}

async function createShape(value, emotions, texts) {
  let entitylist = []
  let accruedHeight = 0
  let average = texts.join('').length / texts.length
  for (let i = 0; i < value.length; i++) {

    // Determine size multiplier & apply
    let lengthMultiplier = texts[i].length/average
    let scale = value[i].scale.split(' ')
    scale = scale.map((x) => x * lengthMultiplier)
    scale = scale.join(' ')

    // Determine position
    let avgDifference = 0
    if(emotions[i - 1]) { // If previous object exists
      let diff = emotions[i - 1].map((item, index) => {
        return item - emotions[i][index]
      })
      avgDifference = diff.reduce((a, b) => a + b) / diff.length
    }
    let objectHeight = value[i].height * value[i].scaleValue * lengthMultiplier
    let visualHeight = objectHeight/2
    value[i].position = "0 " + (accruedHeight + visualHeight) * (1 - avgDifference) + " -6" // test positioning
    accruedHeight += objectHeight

    // Combine shape
    entitylist.push(<Entity
      key={i}
      events={{click: handleClick}}
      material={{"transparent": true, "opacity": value[i].opacity, "roughness": value[i].gloss}}
      primitive={value[i].primitive}
      color={value[i].color}
      position={value[i].position}
      height={value[i].height * lengthMultiplier}
      width={value[i].width}
      radius={value[i].radius}
      radius-tubular={value[i].radiusTubular}
      depth={value[i].depth}
      rotation={value[i].rotation}
      radius-bottom={value[i].radiusBottom}
      scale={scale}
      radius-top="0"
      data={JSON.stringify(value[i])}
      emotions={JSON.stringify(emotions[i])}
      segments-height="128"
      segments-width="128"
      content={JSON.stringify(texts[i])}
      />)
  }
  return entitylist
}

function Shape(props) {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    if(!props.emotionsArray.length == 0) {
      shape(props.emotionsArray).then(function(params) {
        createShape(params, props.emotionsArray, props.textsArray).then(function(entities) {
          setEntities(entities)
        })
      })
    }
  }, [props.emotionsArray, props.textsArray])

  return (
  <Scene inspector="https://cdn.jsdelivr.net/npm/aframe-inspector@0.8.5/dist/aframe-inspector.min.js">
  <Entity light="type: ambient; color: #CCC"></Entity>
    <Entity light="type: point; intensity: 0.75; distance: 50; decay: 2" position="0 10 10"></Entity>
    <Entity id="cameraRig" rotation="0 0 0" position="0 0 -5">
      <Entity camera look-controls mouse-cursor wasd-controls={{"fly": "true"}}>
        <Entity cursor="fuseTimeout: 500;rayOrigin: mouse;">
        </Entity>
      </Entity>
    </Entity>
    {entities}
  </Scene>
  );
}

export default Shape;
