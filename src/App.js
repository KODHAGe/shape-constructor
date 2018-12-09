import React from 'react';
import { useState } from 'react';

import './App.css';

import Shape from './components/Shape.js'
import Input from './components/TextInput.js'

// TESTS, TUFF
// import { parsedResponses, parsedResponses3 } from './test-material/responses.js'


function App() {
  const [emotionsArray, setEmotionsArray] = useState([]);
  
  function handleOutput(val) {
    setEmotionsArray(val)
  }

  return (
    <div className="input-output">
      <Input values={handleOutput}/>
      <Shape emotionsArray={emotionsArray}/>
    </div>
  );
}

export default App;
