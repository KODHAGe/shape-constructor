import React from 'react';
import { useState } from 'react';

import './App.css';

import Shape from './components/Shape.js'
import Input from './components/TextInput.js'



function App() {
  const [emotionArray, setEmotionArray] = useState([0,0,0,0,0,0,0,0,0]);
  
  function handleOutput(val) {
    console.log('handleoutput')
    setEmotionArray(val)
  }

  return (
    <div className="input-output">
      <Input values={handleOutput}/>
      <Shape emotionArray={emotionArray}/>
    </div>
  );
}

export default App;
