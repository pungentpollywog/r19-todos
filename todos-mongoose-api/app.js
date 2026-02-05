import express from 'express';
import cors from 'cors';

import signupRouter from './src/routes/signup.js';
import loginRouter from './src/routes/login.js';
import usersRouter from './src/routes/users.js';
import refreshRouter from './src/routes/refresh.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';

// adds passport middleware
import './src/auth/auth.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/api/{login}', (req, res, next) => {
  console.log('request', req.body);
  next();
});

/* NOTE: using /api instead of / for all endpoints
   because frontend is prefixing endpoints with /api 
   when proxying to http://localhost:3000 to make the 
   browser think the frontend and backend are on the 
   same origin. This bypasses CORS and SameSite issues. */
app.get('/api', (req, res) => {
  res.send('Mongoose TODOs API');
});

app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/refresh', refreshRouter);

// Only verified users can access this route.
app.use('/api/users', passport.authenticate('jwt', { session: false }), usersRouter);

// Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

export { app };
