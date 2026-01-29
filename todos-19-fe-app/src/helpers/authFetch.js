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

function queueRequest(originalRequest) {
  return new Promise((resolve, reject) => {
    queuedRequests.push({ resolve, reject });
  })
    .then((newToken) => {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return fetch(originalRequest.url, originalRequest).then(parseResponse);
    })
    .catch((err) => {
      throw new Error(err);
    });
}

function refreshTokenAndRetry(originalRequest, setAuthDetails) {
  if (isRefreshing) {
    return queueRequest(originalRequest);
  }

  isRefreshing = true;

  return fetch(`${baseUrl}/refresh`, {
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
      isRefreshing = false;
      originalRequest.headers.Authorization = `Bearer ${authDetails.token}`;
      return fetch(originalRequest.url, originalRequest).then(parseResponse);
    })
    .catch((err) => processQueuedRequests(err, null))
    .finally(() => (isRefreshing = false));
}

function authFetch(authDetails, setAuthDetails, url, options = {}) {
  if (!options.headers) {
    options.headers = {};
  }

  if (!authDetails) {
    return refreshTokenAndRetry({ url, ...options }, setAuthDetails);
  }

  const additionalOptions = {
    ...options,
    headers: {
      ...makeAuthHeader(authDetails.token),
      ...options?.headers,
    },
    credentials: 'include',
  };

  // @ts-ignore
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

function parseResponse(res) {
  if (res.ok) {
    return res.status === 204 ? Promise.resolve('success') : res.json();
  } else {
    throw new Error(res.statusText);
  }
}

export { authFetch };
