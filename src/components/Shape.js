import React from 'react'
import { useState, useEffect } from 'react';
import './Shape.css'

import 'aframe'
import { Entity, Scene } from 'aframe-react'

import { shape } from '../lib/totem.js'

let handleClick = (event) => {
  event.target.setAttribute('color', 'red')
  let data = event.target.getAttribute('data')
  let emotions = event.target.getAttribute('emotions')
  let text = event.target.getAttribute('content')
  console.log(JSON.parse(data))
  console.log(JSON.parse(emotions))
  console.log(text)
}

async function createShape(value, emotions, texts) {
  let entitylist = []
  let accruedHeight = 0;
  for (let i = 0; i < value.length; i++) {
    value[i].position = "0 " + accruedHeight * 0.7 /* magical multiplier to be determined */ + " -6" // test positioning
    accruedHeight += value[i].visualHeight
    entitylist.push(<Entity
      key={i}
      events={{mousedown: handleClick}}
      material={{"transparent": true, "opacity": value[i].opacity, "roughness": value[i].gloss}}
      primitive={value[i].primitive}
      color={value[i].color}
      position={value[i].position}
      height={value[i].height}
      width={value[i].width}
      radius={value[i].radius}
      radius-tubular={value[i].radiusTubular}
      depth={value[i].depth}
      rotation={value[i].rotation}
      radius-bottom={value[i].radiusBottom}
      scale={value[i].scale}
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
  <Scene>
    <Entity light="type: ambient; color: #CCC"></Entity>
    <Entity light="type: point; intensity: 0.75; distance: 50; decay: 2" position="0 10 10"></Entity>
    <Entity id="cameraRig" rotation="0 0 0">
      <Entity position="0 0.5 -5" camera look-controls wasd-controls={{"fly": "true"}}>
        <Entity cursor="fuseTimeout: 500"
              position="0 0 -0.5"
              geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.007"
              material="color: black; shader: flat">
        </Entity>
      </Entity>
    </Entity>
    {entities}
  </Scene>
  );
}

export default Shape;
