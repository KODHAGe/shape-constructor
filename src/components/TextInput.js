import React from 'react'
import { useState, useEffect } from 'react';

import './TextInput.css'

import axios from 'axios'
import tokenizer from 'sbd'

import { texts } from '../test-material/texts.js'
import { emotionArray } from '../lib/emo.js'

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
      let sentences = tokenizer.sentences(text)
      let emotionArrays = []
      for(let i = 0; i < sentences.length; i++) {
        parseText(sentences[i]).then((data) => {
          emotionArrays.push(emotionArray(data))
        })
      }
      props.values(emotionArrays)
    }
  }, [text]);

  return (
    <textarea className="text-input" type="text" placeholder="Put some text 'ere" onChange={(event) => {setText(event.target.value)}}></textarea>
  );
}

export default TextInput;
