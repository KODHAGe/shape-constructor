import React from 'react'
import { useState, useEffect } from 'react';

import './TextInput.css'

import axios from 'axios'

import {emotionArray} from '../lib/emo.js'

async function parseText(text) {
  let result = await axios.post(process.env.REACT_APP_DECODER_URL + '/analyse-text', {
    'jwt': process.env.REACT_APP_JWT,
    'text': text
  })
  return result.data
}

function TextInput(props) {
  const [text, setText] = useState('');

  useEffect(() => {
    if(text){
      parseText(text).then((data) => {
        console.log(text)
        console.log(data)
        props.values(emotionArray(data))
      })
    }
  }, [text]);

  return (
    <textarea className="text-input" type="text" placeholder="Put some text 'ere" onChange={(event) => {setText(event.target.value)}}></textarea>
  );
}

export default TextInput;
