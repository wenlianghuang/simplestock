import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Chart = () => {
  const [open, setOpen] = useState('');
  const [highest,setHighest] = useState('')
  const [lowest,setLowest] = useState('')
  const [final,setFinal] = useState('')
  const [updown,setUpDown] = useState('')
  const handleClick = () => {
    axios.post('/api/savecontent', { message: 'Start to save files' })
      .then(response => {
        setOpen(response.data.open);
        setHighest(response.data.highest);
        setLowest(response.data.lowest);
        setFinal(response.data.final);
        setUpDown(response.data.updown);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Modify Message</button>
      <h1>Open: {open}</h1>
      <h1>Highest: {highest}</h1>
      <h1>Lowest: {lowest}</h1>
      <h1>Final: {final}</h1>
      <h1>UpDown: {updown}</h1>      
    </div>
  );
}

export default Chart;
