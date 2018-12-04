import React from 'react'
import { useState, useEffect } from 'react';
import './Shape.css'

import 'aframe'
import {Entity, Scene} from 'aframe-react'

import {shape} from '../lib/totem.js'


function Shape(props) {
  const [params, setParams] = useState({})

  useEffect(() => {
    let newparams = shape(props.emotionArray)
    newparams.then((value) => {
      setParams(value)
    })
  }, [props.emotionArray])

  return (
  <Scene>
    <Entity primitive={params.primitive} color={params.color} position={params.position} height={params.height} width={params.width} radius={params.radius} radius-tubular={params.radiusTubular} depth={params.depth} rotation={params.rotation}/>
  </Scene>
  );
}

export default Shape;
