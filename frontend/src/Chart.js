import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Chart = () => {
  const [message, setMessage] = useState('');
  const [modifiedMessage, setModifiedMessage] = useState('');

  const handleClick = () => {
    axios.post('/api/modify', { message: 'Hello from frontend!' })
      .then(response => {
        setModifiedMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Plot
        data={[{
          values: [20, 30, 50],
          labels: ['Apple', 'Banana', 'Orange'],
          type: 'pie'
        }]}
        layout={{
          width: 400,
          height: 400,
          title: 'Fruit Distribution'
        }}
      />
      <button onClick={handleClick}>Modify Message</button>
      <p>Modified Message: {modifiedMessage}</p>
    </div>
  );
}

export default Chart;
