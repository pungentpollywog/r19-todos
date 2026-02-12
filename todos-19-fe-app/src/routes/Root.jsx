import { useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Outlet, useNavigate } from 'react-router';
import { logout } from '../services/AuthAPI';

import './Root.scss';

export default function Root() {
  const [authDetails, setAuthDetails] = useState(null);
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  function doLogout() {
    logout(setLoading, setError).then(() => {
      setAuthDetails(null);
      navigate('/login');
    });
  }

  return (
    <AuthContext value={[authDetails, setAuthDetails]}>
      <nav aria-label="main">
        {authDetails && <button onClick={doLogout}>Logout</button>}
      </nav>
      <Outlet />
    </AuthContext>
  );
}
