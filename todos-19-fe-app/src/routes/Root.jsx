import { useState } from 'react';

import { AuthContext } from '../context/AuthContext';
import { Outlet } from 'react-router';

function Root() {
  const [authDetails, setAuthDetails] = useState(null);
  return (
    <AuthContext value={[authDetails, setAuthDetails]}>
      <Outlet />
    </AuthContext>
  );
}

export default Root;
