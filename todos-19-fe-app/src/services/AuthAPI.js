import { baseUrl } from '../constants/api';

export function signup(creds, setData, setLoading, setError) {
  return submitCreds('/signup', creds, setData, setLoading, setError);
}

export function login(creds, setData, setLoading, setError) {
  return submitCreds('/login', creds, setData, setLoading, setError);
}

function submitCreds(path, creds, setData, setLoading, setError) {
  const { username, password } = creds;

  setLoading(true);
  setError(null);
  setData(null);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${baseUrl}${path}`, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        handleError(resp.status);
      }
    })
    .then((json) => setData(json))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}

export function logout(setLoading, setError) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  setLoading(true);
  setError(null);

  return fetch(`${baseUrl}/logout`, options)
    .then((resp) => {
      if (!resp.ok) {
        handleError(resp.status);
      }
    })
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}

function handleError(status) {
  if (status === 403) {
    throw new Error('Unauthenticated');
  } else {
    throw new Error('Login failed');
  }
}
