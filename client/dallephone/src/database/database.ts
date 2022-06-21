import { supabase } from './supabaseClient';

export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google'
  }, {
    redirectTo: window.location.origin
  });
  return { user, session, error };
};

export const user = () => {
  return supabase.auth.user();
};

export const logout = () => {
  return supabase.auth.signOut();
};

type ShowPhotosOptions = {
  limit: number;
  offset: number;
  orderBy: string;
  ascending: boolean;
  filterByUser?: string | null;
  publicOnly?: boolean;
};

export const showPhotos = async (options: ShowPhotosOptions = {
  limit: 10,
  offset: 0,
  orderBy: 'created_at',
  ascending: false,
  filterByUser: null,
  publicOnly: true
}) => {
  let query = supabase.from('image')
    .select('id, created_at, input, public, creator')

    .eq('deleted', false)
    .range(options.offset, options.offset + options.limit)
    .order(options.orderBy, {
      ascending: options.ascending
    });

  if (options.publicOnly) {
    query = query.eq('public', options.publicOnly);
  }
  if (options.filterByUser) {
    query = query.eq('creator', options.filterByUser);
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
  }

  return data;
};

export const getPublicUrl = async (id: string) => {
  const { data, error } =
    await supabase.storage.from('images').getPublicUrl(id);
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  }
  return data;
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

export const setPublic = async (uuid: string, publicState: boolean) => {
  const { data, error } = await supabase
    .rpc('set_public', {
      _uuid: uuid,
      _public: publicState
    });
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  }
  return data;
};

export const deleteImage = async (uuid: string) => {
  const { data, error } = await supabase
    .rpc('delete_image', {
      _uuid: uuid
    });
  if (error) {
    console.error(error);
    throw new Error(error.toString());
  }
  return data;
};
