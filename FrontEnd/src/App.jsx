import React from 'react'
import './App.css';
import { useEffect,useState } from 'react';
import prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import 'prismjs/themes/prism.css';
import axios from 'axios';  
import Markdown from 'react-markdown'

function App() {

  const [review, setReview] = useState('');

  useEffect(() => {
    prism.highlightAll();
  });

  const [code, setCode] = useState(`function sum(){
                  return 1+1;
              }`);

  async function reviewCode(){
    const response = await axios.post('http://localhost:3000/ai/get-review',{code})
    setReview(response.data)
  }

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 18,
              border: "1px solid #ddd",
              borderRadius: "12px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div 
        onClick={reviewCode}
        className="review">Review</div>
      </div>
      <div className="right">
        <Markdown>{review}</Markdown>
      </div>
    </main>
    </>
  )



}

export default App;

