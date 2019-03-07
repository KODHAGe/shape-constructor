import React from 'react';
import { useState } from 'react';

import './App.css';

import Shape from './components/Shape.js'
import Input from './components/TextInput.js'

// TESTS, TUFF
// import { parsedResponses, allEmotions } from './test-material/responses.js'
// import { parsedText } from './test-material/texts.js'

function App() {
  const [emotionsArray, setEmotionsArray] = useState(''); // useState(parsedResponses);
  const [textsArray, setTextsArray] = useState(''); //useState(parsedText);
  
  function handleOutput(val, text) {
    setEmotionsArray(val)
    setTextsArray(text)
  }

  return (
    <div className="input-output">
      <h1>Beyond shape</h1>
      <Shape emotionsArray={emotionsArray} textsArray={textsArray}/>
      <Input values={handleOutput}/>
    </div>
  );
}

export default App;
