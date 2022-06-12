import React from 'react';
import { User } from '@supabase/supabase-js';

const userContext = React.createContext<User | null>(null);

export { userContext };
