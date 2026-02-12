import { useContext, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { refreshAccess } from '../helpers/authFetch';

export default function ProtectedRoute({ children }) {
  const [, setAuthDetails] = useContext(AuthContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    refreshAccess(setAuthDetails).catch(() => navigate('/login'));
  }, []);

  return children;
}
