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
      <p>By signing in, you agree to our <a href="/terms">Terms of Use</a>
      &nbsp;and have read our <a href="/privacypolicy">Privacy Policy</a></p>
    </>
  );
};
export default SignIn;
