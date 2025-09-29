import { baseUrl } from '../constants/api';
import { useFetch } from '../hooks/useFetch';

export function signup(creds) {
  const { username, password } = creds;
  const options = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  };
  // TODO: use fetch directly like in the login function below.
  const { data, loading, error } = useFetch(`${baseUrl}/signup`, options);
  console.log('signup', { data }, { loading }, { error });
}

export function login(creds, setData, setLoading, setError) {
  const { username, password } = creds;

  setLoading(true);
  setError(null);
  setData(null);

  const url = `${baseUrl}/login`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };

  fetch(url, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        switch (resp.status) {
          case 403:
            throw new Error('Unauthenticated');
          default:
            throw new Error('Login failed');
        }
      }
    })
    .then((json) => setData(json))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}
