import React, { useState } from 'react';
import { user } from '../../database/database';
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
    const token = localStorage.getItem('supabase.auth.token');
    if (!token) {
      setRobotText('you must log in!');
      return;
    }
    setRobotText(`i am generating "${text}" ... gimme a sec`);
    setGenerating(true);
    try {
      const response = await fetch('https://dalle.marcapi.com/dalle/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: JSON.parse(token).currentSession.access_token
        },
        body: JSON.stringify({
          text,
          num_images: 1
        })
      });
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
        imageId && !generating &&
        (<Polaroid
          slideEffect={true}
          fadeInEffect={true}
          imageId={imageId}
          label={prompt}
          mode='single'
          creator={user()?.id}
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
        !generating && imageId && (<div className="flash" />)
      }
      {
        !generating && !imageId && (
          <div>
            <span>need inspiration?  check out the
                <NavLink to="/gallery" text="public gallery" /></span>
          </div>
        )
      }
    </div>
  );
};

export default Home;
