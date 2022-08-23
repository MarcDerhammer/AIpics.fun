import React from 'react';
import Google from '../../icons/Google.svg';
import './SignIn.css';

type SignInProps = {
  onClick: () => void;
  type: 'Google'; // | 'Facebook' | whatever...
}

const SignInButton = ({ onClick, type }: SignInProps) => {
  return (
    <button className="button google" onClick={onClick}>
      <img style={{
        padding: '5px',
        marginLeft: '0px',
        backgroundColor: 'white'
      }} alt={type} src={Google} />
      <span style={{
        margin: '5px'
      }}>
        Sign In with {type}
      </span>
    </button>
  );
};

export default SignInButton;
