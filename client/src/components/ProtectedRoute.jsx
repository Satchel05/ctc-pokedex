import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PokeballLoader } from './PokeballLoader';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <PokeballLoader fullPage />;
  if (!user)
    return (
      <Navigate
        to='/'
        replace
      />
    );

  return children;
};
