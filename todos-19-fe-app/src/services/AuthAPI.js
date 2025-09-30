import { baseUrl } from '../constants/api';

export function signup(creds, setData, setLoading, setError) {
  submitCreds('/signup', creds, setData, setLoading, setError);
}

export function login(creds, setData, setLoading, setError) {
  submitCreds('/login', creds, setData, setLoading, setError);
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

  fetch(`${baseUrl}${path}`, options)
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

function handleError(status) {
  switch (status) {
    case 403:
      throw new Error('Unauthenticated');
    default:
      throw new Error('Login failed');
  }
}
