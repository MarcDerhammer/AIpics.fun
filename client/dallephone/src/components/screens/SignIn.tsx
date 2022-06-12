import React from 'react';
import SignInButton from '../atoms/SignInButton';

const SignIn = () => {
  return (
        <>
            <SignInButton onClick={() => {
              alert('hey');
            }} type='Google' />
        </>
  );
};
export default SignIn;
