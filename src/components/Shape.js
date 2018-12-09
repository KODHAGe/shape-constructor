import React from 'react'
import { useState, useEffect } from 'react';
import './Shape.css'

import 'aframe'
import { Entity, Scene } from 'aframe-react'

import { shape } from '../lib/totem.js'


function Shape(props) {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    let newparams = shape(props.emotionsArray)
    newparams.then((value) => {
      let entitylist = []
      for (let i = 0; i < value.length; i++) {
        value[i].position = "0 " + value[i].visualHeight * 2 + " -6" // test positioning
        entitylist.push(<Entity 
          key={i}
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
          />)
      }
      setEntities(entitylist)
    })
  }, [props.emotionsArray])

  return (
  <Scene>
    <Entity light="type: ambient; color: #CCC"></Entity>
    <Entity light="type: point; intensity: 0.75; distance: 50; decay: 2" position="0 10 10"></Entity>
    <Entity id="cameraRig" rotation="0 0 0">
      <Entity position="0 0 -5" camera look-controls wasd-controls={{"fly": "true"}}></Entity>
    </Entity>
    {entities}
  </Scene>
  );
}

export default Shape;
