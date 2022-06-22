import React, { useState } from 'react';
import { user, session } from '../../database/database';
import PromptInput from '../atoms/PromptInput';
import Quote from '../atoms/Quote';
import Polaroid from '../molecules/Polaroid';
import './Home.css';
import NavLink from '../atoms/NavLink';

const Home = () => {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [imageId, setImageId] = useState('');
  const [robotText, setRobotText] = useState('what would you like to see?');

  const generateImage = async (text: string) => {
    if (!text) {
      return;
    }
    if (generating) {
      return;
    }
    const token = session()?.access_token;
    setRobotText(`i am generating "${text}" ... just a moment`);
    setGenerating(true);
    try {
      setImageId('');
      const response = await fetch('https://dalle.marcapi.com/dalle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token || ''
        },
        body: JSON.stringify({
          text,
          num_images: 1
        })
      });
      if (response.status === 429) {
        setRobotText('you have reached the the anonymous limit! ' +
          'log in or come back later');
        setImageId('');
        setGenerating(false);
        return;
      }
      if (response.status !== 200) {
        throw new Error('Error');
      }
      const data = await response.json();
      setImageId(data.id);
      setPrompt(data.text);
      setRobotText('what do you want to see next?');
    } catch (error) {
      setRobotText('there was a problem!  i have alerted the authorities');
      console.error(error);
      setImageId('');
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
        imageId &&
        (<Polaroid
          fadeInEffect={true}
          imageId={imageId}
          label={prompt}
          mode='single'
          creator={{
            id: user()?.id || '',
            name: 'you'
          }}
          onDelete={() => {
            setImageId('');
          }} />
        )
      }
      {
        generating &&
        <h2 className="thinking">🤔</h2>
      }
      {
        imageId && (<div className="flash" />)
      }
      {
        !generating && !imageId && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span>need inspiration?  check out the
              <NavLink to="/gallery" text="public gallery" /></span>
            <hr style={{
              marginTop: '30px',
              width: '100%'
            }} />
            <h3 style={{
              marginTop: '30px'
            }}>what is this?</h3>
            <span>this site uses&nbsp;
              <a rel="noreferrer"
                target="_blank"
                href="https://github.com/borisdayma/dalle-mini">
                DALL·E Mini</a>
              &nbsp;to convert text prompts into images</span>
            <span><br />by default, all images are private to you, but if
              you click the eyeball icon, they will be added to the public
              gallery</span>
          </div>
        )
      }
    </div>
  );
};

export default Home;
