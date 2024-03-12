import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Chart = () => {
  const [message, setMessage] = useState('');
  

  const handleClick = () => {
    axios.post('/api/savecontent', { message: 'Start to save files' })
      .then(response => {
        setMessage("successfuly");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Modify Message</button>
      <h1>Matt Save: {message}</h1>
    </div>
  );
}

export default Chart;
