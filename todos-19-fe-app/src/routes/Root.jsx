import { useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Outlet } from 'react-router';

function Root() {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <AuthContext value={[accessToken, setAccessToken]}>
      <Outlet />
    </AuthContext>
  );
}

export default Root;
