import { useState } from 'react';

import './Login.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function doSignup() {
    console.log('sign up with', {username, password});
  }

  function login() {
        console.log('login with', {username, password});
  }

  return (
    <main className="login-page">
      <section className="login">
        <form action="#" method="post">
          <h4>Login</h4>
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
            <button type="button" onClick={doSignup}>
              Sign-up
            </button>
            <button type="button" className="primary" onClick={login}>
              Login
            </button>
          </nav>
        </form>
      </section>
    </main>
  );
}
