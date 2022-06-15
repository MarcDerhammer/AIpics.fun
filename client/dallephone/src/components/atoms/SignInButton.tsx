import React from 'react';
import Google from '../../icons/Google.svg';
import './SignIn.css';

type SignInProps = {
  onClick: () => void;
  type: 'google'; // | 'Facebook' | whatever...
}

const SignInButton = ({ onClick, type }: SignInProps) => {
  return (
    <button className="button" onClick={onClick}>
      <img style={{
        margin: '5px'
      }} alt={type} src={Google} />
      <span style={{
        margin: '5px'
      }}>
        sign in with {type}
      </span>
    </button>
  );
};

export default SignInButton;
