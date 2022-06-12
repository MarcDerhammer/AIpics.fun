import { supabase } from './supabaseClient';

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google'
  });
  return { user, session, error };
};
