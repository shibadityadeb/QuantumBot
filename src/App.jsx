import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';
import './index.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generate_answer() {
    setAnswer("Loading...");
    try {
      const API_KEY = "AIzaSyDER14pM8-z4e3WYsLoFuFVi67_uA39y90"; // API Key directly in the code 
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          "contents": [{ "parts": [{ "text": question }] }]
        }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) { //error handling
      console.error("Error fetching AI response:", error); 
      setAnswer("Error: Unable to generate a response. Please try again.");
    }
  }

  return (
    <div className="chat-container">
      <h1>QuantumBot</h1>
      <textarea 
        className="input-box"
        placeholder='How can I help you today?'
        value={question} 
        onChange={(event) => setQuestion(event.target.value)} 
        cols="30" 
        rows="5"
      />
      <button className="button" onClick={generate_answer}>Generate Answer</button>
      
      <div className="output-box">
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
