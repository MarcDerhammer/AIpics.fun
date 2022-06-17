import React from 'react';
import SignInButton from '../atoms/SignInButton';
import { signInWithGoogle } from '../../database/database';

const SignIn = () => {
  return (
    <>
      <SignInButton onClick={async () => {
        const signIn = await signInWithGoogle();
        console.log(signIn);
      }} type='google' />
      <p>by signing in, you agree to our <a href="/terms">terms of use</a>
      &nbsp;and have read our <a href="/privacypolicy">privacy policy</a></p>
      <p>note: it might look like &quot;scnmnqpqvbmlqsswoipy.supabase.co&quot;
        until i get google to verify this site.  if you see that, it is ok.</p>
      <p>your public information could be used to represent you when sharing
        images publicly</p>
    </>
  );
};
export default SignIn;
