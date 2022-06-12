import React from 'react';
import SignInButton from '../atoms/SignInButton';
import { signInWithGoogle } from '../../database/database';

const SignIn = () => {
  return (
        <>
            <SignInButton onClick={async () => {
              const signIn = await signInWithGoogle();
              console.log(signIn);
            }} type='Google' />
        </>
  );
};
export default SignIn;
