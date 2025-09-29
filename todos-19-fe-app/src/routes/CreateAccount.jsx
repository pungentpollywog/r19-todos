import { useState } from 'react';

import { signup } from '../services/AuthAPI';

import './CreateAccount.scss';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function doSignup() {
    console.log('sign up with', { username, password });
    signup({ username, password });
  }

  // TODO: 

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
            <button type="button" onClick={doSignup}>
              Create Account
            </button>
            {/* TODO: link to login page */}
          </nav>
        </form>
      </section>
    </main>
  );
}
