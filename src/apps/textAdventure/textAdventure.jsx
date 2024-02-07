import React, { useState } from 'react';
import axios from 'axios';

function TextAdventure() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4005/generate-text', { message: inputText });
      setResponseText(response.data.response);
    } catch (error) {
      console.error(error);
      setResponseText('Error fetching data from server');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Enter your message here"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <strong>Response from server:</strong>
        <p>{responseText}</p>
      </div>
    </div>
  );
}

export default TextAdventure;
