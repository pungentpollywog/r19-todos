import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from './useFetch';

export function useAuthFetch(url, options = null) {
  const [token] = useContext(AuthContext);

  const additionalOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...options,
  };

  return useFetch(url, additionalOptions);
}
