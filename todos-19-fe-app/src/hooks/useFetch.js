import { useEffect, useState } from 'react';

export function useFetch(url, options = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setData(null);
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal, ...options })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(`Response status: ${resp.status}`);
        }
      })
      .then((json) => setData(json))
      .catch((err) => {
        err.name === 'AbortError'
          ? console.log('Intentional abort.')
          : setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
