import { supabase } from './supabaseClient';

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google'
  });
  return { user, session, error };
};

export const user = () => {
  return supabase.auth.user();
};

export const onAuthChange = (callback: (ev:string) => void) => {
  supabase.auth.onAuthStateChange((ev, session) => {
    if (ev === 'SIGNED_IN') {
      callback(ev);
    }
    if (ev === 'SIGNED_OUT') {
      callback(ev);
    }
  });
};
