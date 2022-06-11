import React from 'react';
import './Quote.css';

type QuoteProps = {
    text?: string;
    type?: 'topRight' | 'topLeft' | 'bottomLeft' | 'bottomRight';
    authorComponent?: React.ReactNode;
}

const Quote = ({ text, type = 'topLeft', authorComponent }: QuoteProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div className="author">
                {authorComponent}
            </div>
            <div className={"box " + type}>{text}</div>
        </div>
    );
}

export default Quote;