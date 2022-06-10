import React from "react";

type PromptInputProps = {
    onSubmit: (value: string) => void;
    placeholder: string;
    generating: boolean;
};

const PromptInput = ({ onSubmit, placeholder, generating }: PromptInputProps) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '15px'

        }}>
            <textarea id="prompt" disabled={generating} style={{
                borderRadius: '5px',
                padding: '5px',
                maxWidth: '300px',
            }} onKeyDown={(event) => {
                if (event.key === "Enter") {
                    const element = event.currentTarget as HTMLTextAreaElement;
                    onSubmit(element.value);
                }
            }} placeholder={placeholder} />
            <button onClick={() => {
                const element = document.getElementById("prompt") as HTMLTextAreaElement;
                onSubmit(element.value);
            }} disabled={generating} style={{
                borderRadius: '5px',
                padding: '5px',
                marginLeft: '5px',
            }}>Show me</button>
        </div >
    )
}

export default PromptInput;
