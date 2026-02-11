import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { AuthContext } from '../context/AuthContext';
import { login } from '../services/AuthAPI';
import './Login.scss';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authDetails, setAuthDetails] = useContext(AuthContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (authDetails) {
      navigate('/');
    }
  }, [authDetails]);

  function doLogin() {
    login({ username, password }, setAuthDetails, setLoading, setError);
  }

  function navToSignUp() {
    navigate('/signup');
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

            <button type="button" onClick={doLogin}>
              Login
            </button>
            {loading && <p>Logging in...</p>}
            {authDetails && <pre>TOKEN: {JSON.stringify(authDetails)}</pre>}
            {error && <pre>ERROR: {JSON.stringify(error.message)}</pre>}
            <p className="signup">No Account?&nbsp;<a href="#" onClick={navToSignUp}>Sign up</a></p>
          </nav>
        </form>
      </section>
    </main>
  );
}
