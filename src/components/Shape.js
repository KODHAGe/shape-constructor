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
        value[i].position = "0 "+i+" -3" // test positioning
        entitylist.push(<Entity key={i} primitive={value[i].primitive} color={value[i].color} position={value[i].position} height={value[i].height} width={value[i].width} radius={value[i].radius} radius-tubular={value[i].radiusTubular} depth={value[i].depth} rotation={value[i].rotation}/>)
      }
      setEntities(entitylist)
    })
  }, [props.emotionsArray])

  return (
  <Scene>
    {entities}
  </Scene>
  );
}

export default Shape;
