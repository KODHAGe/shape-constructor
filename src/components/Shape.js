import React from 'react'
import { useState, useEffect } from 'react';
import './Shape.css'

import 'aframe'
import 'aframe-effects'

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
  let average = texts ? texts.join('').length / texts.length : ''
  let row = 0
  for (let i = 0; i < value.length; i++) {
    let lengthMultiplier = 1
    let scale = value[i].scale
    // Determine size multiplier & apply
    if(texts[i]) {
      lengthMultiplier = texts[i].length/average
      scale = value[i].scale.split(' ')
      scale = scale.map((x) => x /* lengthMultiplier*/)
      scale = scale.join(' ')
    }

    // Determine position
    let avgDifference = 0
    if(emotions[i - 1]) { // If previous object exists
      let diff = emotions[i - 1].map((item, index) => {
        return item - emotions[i][index] // Calculate difference in all emotions to previous object
      })
      avgDifference = diff.reduce((a, b) => a + b) / diff.length
    }
    let objectHeight = value[i].height * value[i].scaleValue * lengthMultiplier
    let yposition = ((((objectHeight) + accruedHeight) / 2 ) * (1 - Math.abs(avgDifference))) + 1.6
    value[i].position = "0 " + yposition + " -6"
    accruedHeight += objectHeight
    
    /* matrix
    if(i % 10 === 0) {
      row++
      accruedHeight = 0
    }*/

    // Combine shape
    let geometry = "primitive: " + value[i].primitive
    let material = "color: " + value[i].color + "; opacity: " + value[i].opacity + "; roughness: " + value[i].gloss
    let rotation = parseInt(value[i].rotationX) + ' ' + parseInt(value[i].rotationY) + ' ' + parseInt(value[i].rotationZ)
    let animation = "property: rotation; to: " + parseInt(value[i].rotationX) + " " + (360 + parseInt(value[i].rotationY)) + " " + parseInt(value[i].rotationZ) + "; loop: true; dur: 120000; easing: linear"
    entitylist.push(<a-entity 
      key={i} 
      geometry={geometry} 
      material={material}
      position={value[i].position}
      height={value[i].height * lengthMultiplier}
      width={value[i].width}
      radius={value[i].radius}
      radius-tubular={value[i].radiusTubular}
      depth={value[i].depth}
      rotation={rotation}
      radius-bottom={value[i].radiusBottom}
      scale={scale}
      radius-top="0"
      data={JSON.stringify(value[i])}
      emotions={JSON.stringify(emotions[i])}
      segments-height="128"
      segments-width="128"
      content={JSON.stringify(texts[i])}
      shadow="cast: true; receive: true"
      animation={animation}
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
  <a-scene shadow="type: pcfsoft" inspector="https://cdn.jsdelivr.net/npm/aframe-inspector@0.9.0/dist/aframe-inspector.min.js">
    <a-entity light="type: ambient; color: #CCC"></a-entity>
    <a-entity light="type: point; intensity: 0.75; distance: 5; decay: 2; castShadow: true; shadowCameraVisible: false; shadowCameraTop: 2; shadowCameraRight:2" position="0 2 -4" rotation="90 0 0"></a-entity>
    <a-sky color="#F6F6FF"></a-sky>
    {entities}
  </a-scene>
  );
}

export default Shape;
