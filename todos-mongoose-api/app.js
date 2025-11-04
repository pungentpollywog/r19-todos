import express from 'express';
import cors from 'cors';

import listsRouter from './src/routes/lists.js';
import signupRouter from './src/routes/signup.js';
import loginRouter from './src/routes/login.js';
import secureRouter from './src/routes/secure-routes.js';
import passport from 'passport';

import './src/auth/auth.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('/{login}', (req, res, next) => {
  console.log('request', req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Mongoose TODOs API');
});

app.use('/lists', listsRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use(
  '/users',
  passport.authenticate('jwt', { session: false }),
  secureRouter
);
// TODO: use authentication for lists
// app.use('/lists', passport.authenticate('jwt', {session: false}), listsRouter);

// Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

export { app };
