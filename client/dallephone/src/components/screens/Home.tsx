import React, { useState } from 'react';
import PromptInput from '../atoms/PromptInput';
import SignInButton from '../atoms/SignInButton';
import Quote from '../atoms/Quote';
import './Home.css';

const Home = () => {
    const [generating, setGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [base64Img, setBase64Img] = useState('');

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Quote authorComponent={'🤖'} text={(generating ? '...' : "what would you like to see?")} />
            <PromptInput style={{
                marginTop: '15px',
                marginBottom: '15px',
            }} generating={generating} placeholder='a happy robot' onSubmit={(val) => {
                generateImage(val.trim());
            }} />
            {
                base64Img && !generating &&
                (<div className='imageContainer' >
                    <img className="image" src={base64Img} alt={prompt} />
                    <label className="label">{prompt}</label>
                </div>
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
}

export default Home;


