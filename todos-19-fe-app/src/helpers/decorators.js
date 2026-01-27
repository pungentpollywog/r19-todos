import { use } from 'react';

import { AuthContext } from '../context/AuthContext';

function withAuth(fn, ...args) {
  const [authDetails] = use(AuthContext);

  console.log('withAuth', { authDetails });

  return fn(...args, authDetails?.token);
}


export { withAuth };
