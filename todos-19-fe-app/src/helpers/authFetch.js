import { baseUrl } from '../constants/api';

let isRefreshing = false;
let queuedRequests = [];

function makeAuthHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function processQueuedRequests(error, newToken = null) {
  queuedRequests.forEach((prom) => (error ? prom.reject(error) : prom.resolve(newToken)));
  queuedRequests = [];
}

function refreshTokenAndRetry(originalRequest, setAuthDetails) {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      queuedRequests.push({ resolve, reject });
    })
      .then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return fetch(originalRequest.url, originalRequest);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  isRefreshing = true;

  fetch(`${baseUrl}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Unable to refresh token');
      }
    })
    .then((authDetails) => {
      setAuthDetails(authDetails);
      processQueuedRequests(null, authDetails.token);
    })
    .catch((err) => processQueuedRequests(err, null))
    .finally(() => (isRefreshing = false));
}

function authFetch(authDetails, setAuthDetails, url, options) {
  // TODO: test this to fix error on browser refresh
  if (!authDetails) {
    return refreshTokenAndRetry({ url, ...options }, setAuthDetails);
  }

  const additionalOptions = {
    ...options,
    headers: {
      ...makeAuthHeader(authDetails.token),
      ...(options?.headers ?? {}),
    },
    credentials: 'include'
  };

  return fetch(url, additionalOptions).then((res) => {
    if (res.ok) {
      return res.status === 204 ? Promise.resolve('success') : res.json();
    } else if (res.status === 401) {
      return refreshTokenAndRetry({ url, ...additionalOptions }, setAuthDetails);
    } else {
      throw new Error(res.statusText);
    }
  });
}

export { authFetch };
