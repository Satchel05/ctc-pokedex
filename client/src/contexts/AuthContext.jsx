import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { backend } from '../lib/backend';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sets up an observer on the auth object
    return onAuthStateChanged(auth, async (user) => {
      setUser(user);
      try {
        if (user) {
          const { data } = await backend.put('/users/me', {
            name: user.displayName ?? '',
            email: user.email,
          });
          setProfile(data[0]);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error(
          'Syncing user with backend failed:',
          err.response?.data ?? err,
        );
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  return (
    <AuthContext value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext>
  );
}

export const useAuth = () => useContext(AuthContext);
