import { useState } from 'react';

import { signup } from '../services/AuthAPI';

import './CreateAccount.scss';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const disableButton = username.length === 0 || password.length === 0;

  function doSignup() {
    console.log('sign up with', { username, password });
    signup({ username, password }, setStatus, setLoading, setError);
  }

  function navToLogin() {
    console.log('TODO: nav to login page');
  }

  return (
    <main className="create-account-page">
      <section className="create-account">
        <form action="#" method="post">
          <h4>Create Account</h4>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </p>
          <p>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="pass"
              name="pass"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </p>
          <nav>
            <button type="button" onClick={doSignup} disabled={disableButton}>
              Create Account
            </button>
            {loading && <p>Logging in...</p>}
            {status && <pre>STATUS: {JSON.stringify(status)}</pre>}
            {error && <pre>ERROR: {JSON.stringify(error.message)}</pre>}
            <p className="signup">
              Have an account?&nbsp;
              <a href="#" onClick={navToLogin}>
                Log in
              </a>
            </p>
          </nav>
        </form>
      </section>
    </main>
  );
}
