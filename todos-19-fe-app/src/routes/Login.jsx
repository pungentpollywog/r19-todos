import './Login.scss';

export default function Login() {
  return <main className="login-page">
      <section className="login">
        <form action="#" method="post">
          <h4>Login</h4>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email"/>
          </p>
          <p>
            <label htmlFor="pass">Password</label>
            <input type="password" id="pass" name="pass"/>
          </p>
          <p>
            <button type="button">Login</button>
          </p>
          {/* <div className="forgot">
            <a href="#">Forgot Password</a>
          </div> */}

        </form>
      </section>
    </main>
}