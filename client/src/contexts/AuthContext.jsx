import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { backend } from '../lib/backend';

// TODO(1 line): create AuthContext here with an initial NULL state
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // TODO(1 line): create state for keeping track of postgres users
  // TODO(1 line): create state for keeping track of firebase users
  // TODO(1 line): create state for keeping track of the auth state loading

  useEffect(() => {
    // sets up an observer on the auth object
    return onAuthStateChanged(auth, async (user) => {
      // TODO (1 line): assign firebase user state to user
      try {
        if (user) {
          // TODO: upsert user in Postgres using the PUT verb on resource '/users/me'. Destructure the result into a variable called 'data'
          // TODO (1 line): set state for postgres user to data[0]
        } else {
          // TODO(1 line): no user exists so set firebase user to null
        }
      } catch (err) {
        console.error(
          'Syncing user with backend failed:',
          err.response?.data ?? err,
        );
        // TODO(1 line): error so set firebase user to null
      } finally {
        // TODO(1 line): set loading state to false since user is not either assigned or an error has been caught.
      }
    });
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  return (
    <></>
    // TODO: return the auth context, passing in 5 pieces of state, the three you authored and then the login and logout functions. Wrap the context around {children}
  );
}

// TODO: export a helper function called useAuth (use arrow syntax) that wraps AuthContext in a useContext call
