import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { AuthContext } from '../context/AuthContext';
import { login } from '../services/AuthAPI';
import './Login.scss';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [, setAuthDetails] = useContext(AuthContext);
  const navigate = useNavigate();

  function doLogin() {
    login({ username, password }, setAuthDetails, setLoading, setError).then(() => navigate('/'));
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
          <nav aria-label="modal actions">
            <button type="button" onClick={doLogin}>
              Login
            </button>
            {loading && <p>Logging in...</p>}
            {error && <pre>ERROR: {JSON.stringify(error.message)}</pre>}
            <p className="signup">
              No Account?&nbsp;
              <Link to="/signup">Sign up</Link>
            </p>
          </nav>
        </form>
      </section>
    </main>
  );
}
