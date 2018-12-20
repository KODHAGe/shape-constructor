import React from 'react';
import { useState } from 'react';

import './App.css';

import Shape from './components/Shape.js'
import Input from './components/TextInput.js'

// TESTS, TUFF
// import { parsedResponses, allEmotions } from './test-material/responses.js'
// import { parsedText } from './test-material/texts.js'

function App() {
  const [emotionsArray, setEmotionsArray] = useState();
  const [textsArray, setTextsArray] = useState();
  
  function handleOutput(val, text) {
    setEmotionsArray(val)
    setTextsArray(text)
  }

  return (
    <div className="input-output">
      <Input values={handleOutput}/>
      <Shape emotionsArray={emotionsArray} textsArray={textsArray}/>
    </div>
  );
}

export default App;
