import React, { useState } from 'react';
import './App.css';
import PromptInput from './components/atoms/PromptInput';
import SignInButton from './components/atoms/SignInButton';

function App() {
  const [base64Img, setBase64Img] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);

  const generateImage = async (text: string) => {
    if (!text) {
      return;
    }
    if (generating) {
      return;
    }
    setGenerating(true);
    try {
      const response = await fetch('https://dalle.marcapi.com/dalle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          num_images: 1,
        })
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      const image: Blob = await response.blob()
      setBase64Img(URL.createObjectURL(image));
      setPrompt(text);
    } catch (error) {
      alert('There was an error...');
      console.error(error);
      setBase64Img('');
      setPrompt('');
    }
    finally {
      setGenerating(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="pulsing">dalle.fun</h2>
        <label style={{
          marginBottom: '10px'
        }}>🤖: What would you like to see?</label>
        <PromptInput generating={generating} placeholder='a happy robot' onSubmit={(val) => {
          generateImage(val);
        }} />
        {
          base64Img && !generating &&
          (<div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}><img src={base64Img} alt={prompt} />
            <label style={{
              marginTop: '10px'
            }}>"{prompt}"</label>
          </div>
          )
        }
        {
          generating &&
          <h2 className="thinking">🤔</h2>
        }
        {/* <SignInButton onClick={() => {
          alert('this doesnt work yet');
        }} type='Google' /> */}
      </header>
    </div>
  );
}

export default App;
