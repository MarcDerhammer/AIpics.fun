import React, { useState } from 'react';
import PromptInput from '../atoms/PromptInput';
import Quote from '../atoms/Quote';
import Polaroid from '../molecules/Polaroid';
import './Home.css';

const Home = () => {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [base64Img, setBase64Img] = useState('');
  const [robotText, setRobotText] = useState('what would you like to see?');

  const generateImage = async (text: string) => {
    if (!text) {
      return;
    }
    if (generating) {
      return;
    }
    setRobotText(`i am generating "${text}" ... gimme a sec`);
    setGenerating(true);
    try {
      const response = await fetch('https://dalle.marcapi.com/dalle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          num_images: 1
        })
      });
      if (response.status !== 200) {
        throw new Error('Error');
      }
      const image: Blob = await response.blob();
      setBase64Img(URL.createObjectURL(image));
      setPrompt(text);
      setRobotText('what do you want to see next?');
    } catch (error) {
      setRobotText('there was a problem!  i have alerted the authorities');
      console.error(error);
      setBase64Img('');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Quote authorComponent={'🤖'}
        text={robotText} />
      <PromptInput style={{
        marginTop: '15px',
        marginBottom: '15px'
      }} generating={generating}
        placeholder='a happy robot' onSubmit={(val) => {
          generateImage(val.trim());
        }} />
      {
        base64Img && !generating &&
        (<Polaroid
          slideEffect={true}
          fadeInEffect={true}
          base64Img={base64Img}
          label={prompt} />
        )
      }
      {
        generating &&
        <h2 className="thinking">🤔</h2>
      }
      {
        !generating && base64Img && (<div className="flash" />)
      }

    </div>
  );
};

export default Home;
