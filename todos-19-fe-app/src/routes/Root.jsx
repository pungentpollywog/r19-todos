import { useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Outlet } from 'react-router';
import { logout } from '../services/AuthAPI';

import './Root.scss';

export default function Root() {
  const [authDetails, setAuthDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function doLogout() {
    logout(setLoading, setError).then(() => setAuthDetails(null));
  }

  return (
    <AuthContext value={[authDetails, setAuthDetails]}>
      <nav>
        <button onClick={doLogout}>Logout</button>
      </nav>
      <Outlet />
    </AuthContext>
  );
}
