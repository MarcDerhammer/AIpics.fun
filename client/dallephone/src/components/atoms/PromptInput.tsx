import React from "react";
import './Prompt.css';

type PromptInputProps = {
    onSubmit: (value: string) => void;
    placeholder: string;
    generating: boolean;
    style?: React.CSSProperties;
};

const PromptInput = ({ style, onSubmit, placeholder, generating }: PromptInputProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            ...style
        }}>
            <textarea className="input" id="prompt" disabled={generating} style={{
                borderRadius: '5px',
                padding: '5px',
                maxWidth: '300px',
            }} onKeyDown={(event) => {
                if (event.key === "Enter") {
                    const element = event.currentTarget as HTMLTextAreaElement;
                    onSubmit(element.value);
                }
            }} placeholder={placeholder} />
            <button className="button" onClick={() => {
                const element = document.getElementById("prompt") as HTMLTextAreaElement;
                onSubmit(element.value);
            }} disabled={generating} style={{
                borderRadius: '5px',
                padding: '5px',
                marginLeft: '5px',
            }}>show me</button>
        </div >
    )
}

export default PromptInput;
