import React from 'react';
import { useState } from 'react';

import './App.css';

import Shape from './components/Shape.js'
import Input from './components/TextInput.js'



function App() {
  const [emotionsArray, setEmotionsArray] = useState([]);
  
  function handleOutput(val) {
    let newEmotionsArray = JSON.parse(JSON.stringify(emotionsArray))
    newEmotionsArray.push(val)
    setEmotionsArray(newEmotionsArray)
  }

  return (
    <div className="input-output">
      <Input values={handleOutput}/>
      <Shape emotionsArray={emotionsArray}/>
    </div>
  );
}

export default App;
